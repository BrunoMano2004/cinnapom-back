import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WatchListMemberService } from './watch-list-member.service';
import { AddMemberDto } from './dto/add-member.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WatchListMember } from './watch-list-member.entity';
import type { UserTokenInterface } from '../auth/user.token.interface';

@ApiTags('WatchListMember')
@ApiBearerAuth()
@Controller('watch-list-member')
export class WatchListMemberController {
  constructor(
    private readonly watchListMemberService: WatchListMemberService,
  ) {}

  @Post(':watchListId/add')
  async addMember(
    @Param('watchListId') watchListId: string,
    @Body() dto: AddMemberDto,
    @CurrentUser() user: UserTokenInterface,
  ): Promise<void> {
    await this.watchListMemberService.addMember(
      watchListId,
      dto.email,
      user.email,
    );
  }

  @Delete(':watchListId/remove/:memberUserId')
  async removeMember(
    @Param('watchListId') watchListId: string,
    @Param('memberUserId') memberUserId: string,
    @CurrentUser() user: UserTokenInterface,
  ): Promise<void> {
    await this.watchListMemberService.removeMember(
      watchListId,
      memberUserId,
      user.email,
    );
  }

  @Get(':watchListId/members')
  async listMembers(
    @Param('watchListId') watchListId: string,
    @CurrentUser() user: UserTokenInterface,
  ): Promise<WatchListMember[]> {
    return await this.watchListMemberService.listMembers(
      watchListId,
      user.email,
    );
  }

  @Get('shared-with-me')
  async sharedWithMe(
    @CurrentUser() user: UserTokenInterface,
  ): Promise<WatchListMember[]> {
    return await this.watchListMemberService.listSharedWithMe(user.email);
  }
}
