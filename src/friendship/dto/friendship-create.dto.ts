import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateFriendshipDto {

    @IsNotEmpty({ message: 'The addresseeId mus not be empty' })
    @IsString({ message: 'The addresseeId must be a string' })
    @IsEmail()
    addresseeEmail!: string
}