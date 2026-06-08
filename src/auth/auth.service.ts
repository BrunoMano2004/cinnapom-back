import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserInterface } from './user.interface';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(user: UserInterface): Promise<{ access_token: string }> {
    let userBd: User;

    try {
      userBd = await this.userService.findByEmail(user.email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const newUser = new User();
        newUser.email = user.email;
        newUser.name = user.name;
        newUser.avatar = user.avatar;
        await this.userService.create(newUser);

        userBd = await this.userService.findByEmail(user.email);
      } else {
        throw new InternalServerErrorException();
      }
    }

    const payload = { email: userBd.email, id: userBd.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
