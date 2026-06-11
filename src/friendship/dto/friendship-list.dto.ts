import { FriendshipStatus } from '../friendship.status.enum';

export class ListFriendshipDto {
  friendshipId!: string;
  userEmail!: string;
  avatar!: string;
  username!: string;
  friendId!: string;
  status!: FriendshipStatus;
}
