import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(user: any): Promise<{ access_token: string }> {
    try {
      await this.userService.create(
        new User(user.email, user.name, user.avatar),
      );
    } catch (error) {
      if (!(error instanceof ConflictException)) throw error;
    }

    const payload = { email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
