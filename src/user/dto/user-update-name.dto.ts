import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNameDto {
  @IsString({ message: 'The field name must be a string' })
  @IsNotEmpty({ message: 'The field must no be empty' })
  name!: string;
}
