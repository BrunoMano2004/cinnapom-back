import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import type { UserTokenInterface } from '../auth/user.token.interface';
import { CreateFriendshipDto } from './dto/friendship-create.dto';
import { ListFriendshipArrayDto } from './dto/friendship-list-array.dto';
import { ListFriendshipRequestDto } from './dto/friendship-request-list.dto';
import { UpdateFriendshipStatusDto } from './dto/friendship-update-status.dto';

@ApiTags('Friendship')
@ApiBearerAuth()
@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @HttpCode(201)
  @Post()
  async requestFriendship(
    @Body() dto: CreateFriendshipDto,
    @CurrentUser() user: UserTokenInterface,
  ): Promise<void> {
    await this.friendshipService.createFriendshipRequest(user.id, dto);
  }

  @Get()
  async getAllFriends(
    @CurrentUser() user: UserTokenInterface,
  ): Promise<ListFriendshipArrayDto> {
    return await this.friendshipService.listFriends(user.id);
  }

  @Get('requests')
  async listAllFriendshipRequests(
    @CurrentUser() user: UserTokenInterface,
  ): Promise<ListFriendshipRequestDto> {
    return await this.friendshipService.listFriendshipRequests(user.id);
  }

  @Patch(':friendshipId/status')
  async updateFriendshipStatus(
    @CurrentUser() user: UserTokenInterface,
    @Body() updateDto: UpdateFriendshipStatusDto,
    @Param('friendshipId') friendshipId: string,
  ): Promise<void> {
    await this.friendshipService.updateStatus(user.id, updateDto, friendshipId);
  }

  @Delete(':friendshipId')
  async deleteFriendship(
    @Param('friendshipId') friendshipId: string,
    @CurrentUser() user: UserTokenInterface,
  ): Promise<void> {
    await this.friendshipService.deleteFriendship(user.id, friendshipId);
  }
}
