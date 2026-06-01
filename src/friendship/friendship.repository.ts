import { Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { Friendship } from './friendship.entity';
import { DataSource } from 'typeorm/browser';
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
        { requester: { id: userId }, status: Not(FriendshipStatus.ACCEPTED) },
        { addressee: { id: userId }, status: Not(FriendshipStatus.ACCEPTED) },
      ],
      relations: ['requester', 'addressee'],
    });
  }

  async createFriendRequest(friendship: Friendship): Promise<void> {
    await this.save(friendship);
  }

  async updateStatus(
    friendshipId: string,
    status: FriendshipStatus,
  ): Promise<void> {
    await this.update({ id: friendshipId }, { status });
  }

  async deleteFriendRequest(
    friendshipId: string,
    userId: string,
  ): Promise<void> {
    await this.delete({ id: friendshipId, requester: { id: userId } });
  }
}
