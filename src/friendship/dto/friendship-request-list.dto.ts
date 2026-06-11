import { ListFriendshipDto } from './friendship-list.dto';

export class ListFriendshipRequestDto {
  received!: ListFriendshipDto[];
  sent!: ListFriendshipDto[];
}
