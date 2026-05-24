import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRatingDto {
  @IsOptional()
  @IsString({ message: 'Field must be a string' })
  @IsNotEmpty({ message: 'Field must not be empty' })
  comment?: string;

  @IsOptional()
  @IsNumber()
  score?: number;
}
