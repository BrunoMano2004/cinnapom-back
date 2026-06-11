import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FriendshipStatus } from '../friendship.status.enum';

export class UpdateFriendshipStatusDto {
  @IsString({ message: 'The friendshipId field must be a string' })
  @IsNotEmpty({ message: 'The friendshipId field must no be empty' })
  friendshipId!: string;

  @IsEnum(FriendshipStatus)
  status!: FriendshipStatus;
}
