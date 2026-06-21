import { Module } from '@nestjs/common';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { FriendshipRepository } from './friendship.repository';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [FriendshipService, FriendshipRepository, UserService],
  controllers: [FriendshipController],
  exports: [FriendshipRepository],
})
export class FriendshipModule {}
