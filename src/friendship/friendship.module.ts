import { Module } from '@nestjs/common';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { FriendshipRepository } from './friendship.repository';
import { UserService } from '../user/user.service';

@Module({
  providers: [FriendshipService, FriendshipRepository, UserService],
  controllers: [FriendshipController],
  exports: [],
})
export class UserModule {}
