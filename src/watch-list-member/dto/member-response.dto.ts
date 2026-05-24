export class MemberResponseDto {
  id!: string;
  createdAt!: Date;
  user!: {
    id: string;
    name: string;
    email: string;
  };
}
