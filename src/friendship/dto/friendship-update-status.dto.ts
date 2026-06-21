import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FriendshipStatus } from '../friendship.status.enum';

export class UpdateFriendshipStatusDto {
  @IsEnum(FriendshipStatus)
  status!: FriendshipStatus;
}
