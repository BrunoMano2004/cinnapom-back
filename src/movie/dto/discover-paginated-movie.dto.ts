import { Expose, Type } from 'class-transformer';
import { DiscoverMovieDto } from './discover-movie.dto';

export class PaginatedMoviesDto {
  @Expose() page!: number;

  @Expose({ name: 'total_pages' })
  totalPages!: number;

  @Expose({ name: 'total_results' })
  totalResults!: number;

  @Type(() => DiscoverMovieDto)
  @Expose()
  results!: DiscoverMovieDto[];
}
