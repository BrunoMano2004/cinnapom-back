import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchListMember } from './watch-list-member.entity';
import { WatchListMemberRepository } from './watch-list-member.repository';
import { WatchListMemberService } from './watch-list-member.service';
import { WatchListMemberController } from './watch-list-member.controller';
import { WatchListRepository } from '../watch-list/watch-list.repository';
import { UserRepository } from '../user/user.repository';
import { FriendshipRepository } from '../friendship/friendship.repository';
import { FriendshipModule } from '../friendship/friendship.module';

@Module({
  imports: [TypeOrmModule.forFeature([WatchListMember]), FriendshipModule],
  providers: [
    WatchListMemberRepository,
    WatchListMemberService,
    WatchListRepository,
    UserRepository,
    FriendshipRepository,
  ],
  controllers: [WatchListMemberController],
  exports: [WatchListMemberRepository],
})
export class WatchListMemberModule {}
