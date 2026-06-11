import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFriendshipDto } from './dto/friendship-create.dto';
import { UserService } from '../user/user.service';
import { Friendship } from './friendship.entity';
import { FriendshipRepository } from './friendship.repository';
import { ListFriendshipArrayDto } from './dto/friendship-list-array.dto';
import { ListFriendshipDto } from './dto/friendship-list.dto';
import { ListFriendshipRequestDto } from './dto/friendship-request-list.dto';
import { UpdateFriendshipStatusDto } from './dto/friendship-update-status.dto';
import { FriendshipStatus } from './friendship.status.enum';

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
      dto.status = friendship.status;

      return dto;
    });

    return response;
  }

  async listFriendshipRequests(
    userId: string,
  ): Promise<ListFriendshipRequestDto> {
    const friendshipRequests =
      await this.friendshipRepository.listFriendRequests(userId);

    const received: ListFriendshipDto[] = [];
    const sent: ListFriendshipDto[] = [];

    for (const fr of friendshipRequests) {
      const dto = new ListFriendshipDto();

      const isSentRequest = fr.requester.id === userId;

      const otherUser = isSentRequest ? fr.addressee : fr.requester;

      dto.friendshipId = fr.id;
      dto.friendId = otherUser.id;
      dto.avatar = otherUser.avatar;
      dto.status = fr.status;
      dto.userEmail = otherUser.email;
      dto.username = otherUser.name;

      if (isSentRequest) {
        sent.push(dto);
      } else {
        received.push(dto);
      }
    }

    const friendshipRequestsDto = new ListFriendshipRequestDto();
    friendshipRequestsDto.received = received;
    friendshipRequestsDto.sent = sent;

    return friendshipRequestsDto;
  }

  async updateStatus(
    userId: string,
    updateDto: UpdateFriendshipStatusDto,
  ): Promise<void> {
    if (updateDto.status === FriendshipStatus.PENDING) {
      throw new BadRequestException('Invalid status');
    }

    const friendship = await this.friendshipRepository.findById(
      updateDto.friendshipId,
    );

    if (!friendship) {
      throw new NotFoundException('Friendship not found');
    }

    const isRequester = friendship.requester.id === userId;
    const isAddressee = friendship.addressee.id === userId;

    if (!isRequester && !isAddressee) {
      throw new NotFoundException(
        'Friendship not found with this id or for this user',
      );
    }

    if (
      isRequester &&
      (updateDto.status === FriendshipStatus.ACCEPTED ||
        updateDto.status === FriendshipStatus.BLOCKED)
    ) {
      throw new ForbiddenException(
        'Only the addressee can accept or reject the friendship request',
      );
    }

    if (friendship.status !== FriendshipStatus.PENDING) {
      throw new BadRequestException('Status update not allowed');
    }

    await this.friendshipRepository.updateStatus(
      updateDto.friendshipId,
      updateDto.status,
    );
  }
}
