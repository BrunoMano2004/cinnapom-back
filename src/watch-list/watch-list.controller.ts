import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { CreateWatchListDto } from './dto/watch-list-create.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { UpdateNameWacthListDto } from './dto/watch-list-update-name.dto';
import { ListAllWatchListDto } from './dto/watch-list-list-all.dto';
import { FindOneWatchListDto } from './dto/watch-list-find-one.dto';
import type { UserTokenInterface } from '../auth/user.token.interface';

@ApiTags('Watch List')
@ApiBearerAuth()
@Controller('watch-list')
export class WatchListController {
  constructor(private readonly watchListService: WatchListService) {}

  @Post('create')
  async createWatchList(
    @CurrentUser() user: UserTokenInterface,
    @Body() dto: CreateWatchListDto,
  ): Promise<void> {
    await this.watchListService.create(dto, user.email);
  }

  @Get('listAll')
  async listAll(
    @CurrentUser() user: UserTokenInterface,
  ): Promise<ListAllWatchListDto[]> {
    return await this.watchListService.listAll(user.email);
  }

  @Get('getById/:id')
  async getById(
    @CurrentUser() user: UserTokenInterface,
    @Param('id') id: string,
  ): Promise<FindOneWatchListDto> {
    return await this.watchListService.getById(id, user.email);
  }

  @Patch('updateName/:id')
  async updateName(
    @CurrentUser() user: UserTokenInterface,
    @Param('id') id: string,
    @Body() dto: UpdateNameWacthListDto,
  ): Promise<void> {
    await this.watchListService.updateName(dto, id, user.email);
  }
}
