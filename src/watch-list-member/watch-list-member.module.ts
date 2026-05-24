import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchListMember } from './watch-list-member.entity';
import { WatchListMemberRepository } from './watch-list-member.repository';
import { WatchListMemberService } from './watch-list-member.service';
import { WatchListMemberController } from './watch-list-member.controller';
import { WatchListRepository } from '../watch-list/watch-list.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WatchListMember])],
  providers: [
    WatchListMemberRepository,
    WatchListMemberService,
    WatchListRepository,
    UserRepository,
  ],
  controllers: [WatchListMemberController],
  exports: [WatchListMemberRepository],
})
export class WatchListMemberModule {}
