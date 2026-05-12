import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { DiscoverMovieDto } from './dto/discover-movie.dto';
import { PaginatedMoviesDto } from './dto/discover-paginated-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('discover')
  async getDiscoverMovies(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<PaginatedMoviesDto> {
    return this.movieService.getDiscoverMovies(page);
  }
}
