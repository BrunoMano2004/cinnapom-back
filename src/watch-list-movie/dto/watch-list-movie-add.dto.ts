import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddWatchListMovieDto {
  @IsString()
  @IsNotEmpty()
  watchListId!: string;

  @IsNumber()
  @IsNotEmpty()
  tmdbMovieId!: number;
}
