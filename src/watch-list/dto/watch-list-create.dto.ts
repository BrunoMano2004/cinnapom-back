import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWatchListDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Image cover URL must be a string' })
  @IsNotEmpty({ message: 'Image cover URL must not be empty' })
  imageCoverUrl?: string;
}
