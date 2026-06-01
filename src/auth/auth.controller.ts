import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { env } from 'process';

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
  async googleCallback(@Req() req: any, @Res() res: any): Promise<any> {
    const { access_token } = await this.authService.login(req.user);
    res.redirect(`${env.FRONT_END_URL}/?token=${access_token}`);
  }
}
