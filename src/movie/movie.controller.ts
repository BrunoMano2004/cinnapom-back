import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { PaginatedMoviesDto } from './dto/discover-paginated-movie.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ListCompleteMovie } from './dto/movie-complete-list.dto';

@ApiTags('Movie')
@ApiBearerAuth()
@Controller('movie')
@UseInterceptors(CacheInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('discover')
  async getDiscoverMovies(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<PaginatedMoviesDto> {
    return this.movieService.getDiscoverMovies(page);
  }

  @Get('details/:movieId')
  async getMovieDetails(
    @Param('movieId', ParseIntPipe) id: number,
  ): Promise<ListCompleteMovie> {
    return await this.movieService.getMovieDetails(id);
  }

  @Get('search/:movieTitle')
  async searchMovieByTitle(
    @Param('movieTitle') title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<PaginatedMoviesDto> {
    return await this.movieService.searchMovieByTitle(title, page);
  }
}
