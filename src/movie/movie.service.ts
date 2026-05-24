import { Injectable } from '@nestjs/common';
import { TmdbApiRepository } from './tmdb-api.repository';
import { PaginatedMoviesDto } from './dto/discover-paginated-movie.dto';
import { MovieDetailDto } from './dto/describe-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly tmdbApiRepository: TmdbApiRepository) {}

  async getDiscoverMovies(page: number): Promise<PaginatedMoviesDto> {
    const [movies, { genres }] = await Promise.all([
      this.tmdbApiRepository.discoverMovies(page),
      this.tmdbApiRepository.getListOfGenre(),
    ]);

    const genreMap = new Map(genres.map((g) => [g.id, g.name]));

    return {
      ...movies,
      results: movies.results.map((movie) => ({
        ...movie,
        genreIds: movie.genreIds.map((id) => genreMap.get(id) ?? 'Unknown'),
      })),
    };
  }

  async getMovieDetails(movieId: number): Promise<MovieDetailDto> {
    return await this.tmdbApiRepository.getMovieById(movieId);
  }

  async searchMovieByTitle(
    title: string,
    page: number,
  ): Promise<PaginatedMoviesDto> {
    return await this.tmdbApiRepository.searchMovieByTtitle(title, page);
  }
}
