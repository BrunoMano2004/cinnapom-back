import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  googleLogin(): void {}

  @Get('google/callback')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req): Promise<{ access_token: string }> {
    return await this.authService.login(req.user);
  }
}
