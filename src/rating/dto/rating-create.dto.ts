import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsNumber({ allowNaN: false })
  tmdbMovieId!: number;

  @IsNumber()
  score!: number;

  @IsString({ message: 'Field must be string' })
  @IsNotEmpty({ message: 'Fild must not be empty' })
  comment!: string;
}
