import { Injectable } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/friendship-create.dto';
import { UserService } from '../user/user.service';
import { Friendship } from './friendship.entity';
import { FriendshipRepository } from './friendship.repository';
import { ListFriendshipArrayDto } from './dto/friendship-list-array.dto';
import { ListFriendshipDto } from './dto/friendship-list.dto';

@Injectable()
export class FriendshipService {
  constructor(
    private readonly friendshipRepository: FriendshipRepository,
    private readonly userService: UserService,
  ) {}

  async createFriendshipRequest(
    requesterId: string,
    dto: CreateFriendshipDto,
  ): Promise<void> {
    const addresseeUser = await this.userService.findByEmail(
      dto.addresseeEmail,
    );
    const requesterUser = await this.userService.getById(requesterId);

    const friendship = new Friendship();
    friendship.addressee = addresseeUser;
    friendship.requester = requesterUser;

    await this.friendshipRepository.createFriendRequest(friendship);
  }

  async listFriends(userId: string): Promise<ListFriendshipArrayDto> {
    const friendships = await this.friendshipRepository.getFriends(userId);

    const response = new ListFriendshipArrayDto();

    response.friends = friendships.map((friendship) => {
      const friend =
        friendship.requester.id === userId
          ? friendship.addressee
          : friendship.requester;

      const dto = new ListFriendshipDto();

      dto.friendshipId = friendship.id;
      dto.friendId = friend.id;
      dto.userEmail = friend.email;
      dto.username = friend.name;
      dto.avatar = friend.avatar;

      return dto;
    });

    return response;
  }
}
