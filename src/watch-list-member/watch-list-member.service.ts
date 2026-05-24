import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { WatchListMemberRepository } from './watch-list-member.repository';
import { WatchListRepository } from '../watch-list/watch-list.repository';
import { UserRepository } from '../user/user.repository';
import { WatchListMember } from './watch-list-member.entity';

@Injectable()
export class WatchListMemberService {
  constructor(
    private readonly watchListMemberRepository: WatchListMemberRepository,
    private readonly watchListRepository: WatchListRepository,
    private readonly userRepository: UserRepository,
  ) {}

  private async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async addMember(
    watchListId: string,
    memberEmail: string,
    requesterEmail: string,
  ): Promise<void> {
    const requester = await this.getUserByEmail(requesterEmail);

    const watchList = await this.watchListRepository.findOne({
      where: { id: watchListId },
      relations: ['user'],
    });
    if (!watchList) throw new NotFoundException('Watchlist not found');
    if (watchList.user.id !== requester.id)
      throw new ForbiddenException('Only the owner can add members');

    const targetUser = await this.userRepository.findByEmail(memberEmail);
    if (!targetUser) throw new NotFoundException('User not found');
    if (targetUser.id === requester.id)
      throw new ConflictException('You are already the owner');

    const existing = await this.watchListMemberRepository.findMember(
      watchListId,
      targetUser.id,
    );
    if (existing) throw new ConflictException('User is already a member');

    await this.watchListMemberRepository.addMember(watchList, targetUser);
  }

  async removeMember(
    watchListId: string,
    memberUserId: string,
    requesterEmail: string,
  ): Promise<void> {
    const requester = await this.getUserByEmail(requesterEmail);

    const watchList = await this.watchListRepository.findOne({
      where: { id: watchListId },
      relations: ['user'],
    });
    if (!watchList) throw new NotFoundException('Watchlist not found');

    const isOwner = watchList.user.id === requester.id;
    const isRemovingSelf = memberUserId === requester.id;
    if (!isOwner && !isRemovingSelf)
      throw new ForbiddenException('Not allowed to remove this member');

    const member = await this.watchListMemberRepository.findMember(
      watchListId,
      memberUserId,
    );
    if (!member) throw new NotFoundException('Member not found');

    await this.watchListMemberRepository.removeMember(
      watchListId,
      memberUserId,
    );
  }

  async listMembers(
    watchListId: string,
    requesterEmail: string,
  ): Promise<WatchListMember[]> {
    const requester = await this.getUserByEmail(requesterEmail);

    const watchList = await this.watchListRepository.findOne({
      where: { id: watchListId },
      relations: ['user'],
    });
    if (!watchList) throw new NotFoundException('Watchlist not found');

    const isOwner = watchList.user.id === requester.id;
    const isMember = await this.watchListMemberRepository.findMember(
      watchListId,
      requester.id,
    );
    if (!isOwner && !isMember)
      throw new ForbiddenException('No access to this watchlist');

    return await this.watchListMemberRepository.findByWatchList(watchListId);
  }

  async listSharedWithMe(email: string): Promise<WatchListMember[]> {
    const user = await this.getUserByEmail(email);
    return await this.watchListMemberRepository.findByUser(user.id);
  }
}
