import { ConflictException, Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { Friendship } from './friendship.entity';
import { DataSource } from 'typeorm';
import { FriendshipStatus } from './friendship.status.enum';

@Injectable()
export class FriendshipRepository extends Repository<Friendship> {
  constructor(dataSource: DataSource) {
    super(Friendship, dataSource.createEntityManager());
  }

  async getFriends(userId: string): Promise<Friendship[]> {
    return await this.find({
      where: [
        { requester: { id: userId }, status: FriendshipStatus.ACCEPTED },
        { addressee: { id: userId }, status: FriendshipStatus.ACCEPTED },
      ],
      relations: ['requester', 'addressee'],
    });
  }

  async listFriendRequests(userId: string): Promise<Friendship[]> {
    return await this.find({
      where: [
        { requester: { id: userId }, status: FriendshipStatus.PENDING },
        { addressee: { id: userId }, status: FriendshipStatus.PENDING },
      ],
      relations: ['requester', 'addressee'],
    });
  }

  async createFriendRequest(friendship: Friendship): Promise<void> {
    try {
      await this.save(friendship);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('Friendship request already sent');
      }
      throw error;
    }
  }

  async updateStatus(
    friendshipId: string,
    status: FriendshipStatus,
  ): Promise<void> {
    await this.update({ id: friendshipId }, { status });
  }

  async deleteFriendRequest(friendshipId: string): Promise<void> {
    await this.delete({ id: friendshipId });
  }

  async findById(friendshipId: string): Promise<Friendship | null> {
    return await this.findOne({
      where: { id: friendshipId },
      relations: ['requester', 'addressee'],
    });
  }

  async friendshipExists(userAId: string, userBId: string): Promise<boolean> {
    const existing = await this.findOne({
      where: [
        { requester: { id: userAId }, addressee: { id: userBId } },
        { requester: { id: userBId }, addressee: { id: userAId } },
      ],
    });
    return !!existing;
  }

  async friendshipExistsWithStatusAccepted(
    userAId: string,
    userBId: string,
  ): Promise<boolean> {
    const existing = await this.findOne({
      where: [
        {
          requester: { id: userAId },
          addressee: { id: userBId },
          status: FriendshipStatus.ACCEPTED,
        },
        {
          requester: { id: userBId },
          addressee: { id: userAId },
          status: FriendshipStatus.ACCEPTED,
        },
      ],
    });
    return !!existing;
  }
}
