import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { PaginatedMoviesDto } from './dto/discover-paginated-movie.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MovieDetailDto } from './dto/describe-movie.dto';

@ApiTags('Movie')
@ApiBearerAuth()
@Controller('movie')
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
  ): Promise<MovieDetailDto> {
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
