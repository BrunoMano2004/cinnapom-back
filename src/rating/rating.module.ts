import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { RatingRepository } from './rating.repository';
import { UserRepository } from '../user/user.repository';
import { UserModule } from '../user/user.module';
import { FriendshipModule } from '../friendship/friendship.module';
import { FriendshipRepository } from '../friendship/friendship.repository';

@Module({
  imports: [UserModule, FriendshipModule],
  controllers: [RatingController],
  providers: [RatingService, RatingRepository, UserRepository],
})
export class RatingModule {}
