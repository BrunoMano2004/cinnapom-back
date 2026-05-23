import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { PaginatedMoviesDto } from './dto/discover-paginated-movie.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
}
