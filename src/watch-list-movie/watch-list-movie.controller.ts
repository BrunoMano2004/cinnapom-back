import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { WatchListMovieService } from './watch-list-movie.service';
import { AddWatchListMovieDto } from './dto/watch-list-movie-add.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import type { UserTokenInterface } from '../auth/user.token.interface';

@Controller('watch-list-movie')
export class WatchListMovieController {
  constructor(private readonly watchListMovieService: WatchListMovieService) {}

  @Post('add')
  async addMovieToList(
    @Body() dto: AddWatchListMovieDto,
    @CurrentUser() user: UserTokenInterface,
  ): Promise<void> {
    await this.watchListMovieService.addMovieToWatchList(dto, user.email);
  }

  @Delete('watchListId/:wlId/movieId/:movieId')
  async removeMovieFromList(
    @Param('wlId') wlId: string,
    @Param('movieId', ParseIntPipe) movieId: number,
    @CurrentUser() user: UserTokenInterface,
  ): Promise<void> {
    await this.watchListMovieService.removeMovieFromWatchList(
      wlId,
      movieId,
      user.email,
    );
  }
}
