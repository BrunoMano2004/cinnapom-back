import { Module } from '@nestjs/common';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { FriendshipRepository } from './friendship.repository';

@Module({
  providers: [FriendshipService, FriendshipRepository],
  controllers: [FriendshipController],
  exports: [],
})
export class UserModule {}
