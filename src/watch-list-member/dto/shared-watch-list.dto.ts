export class SharedWatchListDto {
  id!: string;
  name!: string;
  imageCoverUrl!: string | null;
  createdAt!: Date;
  owner!: {
    id: string;
    name: string;
    email: string;
  };
}
