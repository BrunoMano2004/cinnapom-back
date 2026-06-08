import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from './user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { UserTokenInterface } from '../auth/user.token.interface';
import { UpdateNameDto } from './dto/user-update-name.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(@CurrentUser() user: UserTokenInterface): Promise<User> {
    return await this.userService.findByEmail(user.email);
  }

  @Patch('update/name')
  async updateProfileName(
    @CurrentUser() user: UserTokenInterface,
    @Body() dto: UpdateNameDto,
  ) {
    await this.userService.updateName(user.id, dto);
  }
}
