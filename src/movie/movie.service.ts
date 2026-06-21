import { Injectable } from '@nestjs/common';
import { TmdbApiRepository } from './tmdb-api.repository';
import { PaginatedMoviesDto } from './dto/discover-paginated-movie.dto';
import { ListCompleteMovie } from './dto/movie-complete-list.dto';
import { GenresListDto } from './dto/genres-list.dt';
import { QueryMovieDto } from './dto/movie-query-dto';

@Injectable()
export class MovieService {
  constructor(private readonly tmdbApiRepository: TmdbApiRepository) {}

  async getDiscoverMovies(dto: QueryMovieDto): Promise<PaginatedMoviesDto> {
    const [movies, { genres }] = await Promise.all([
      this.tmdbApiRepository.discoverMovies(dto),
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

  async getMovieDetails(movieId: number): Promise<ListCompleteMovie> {
    const movie = await this.tmdbApiRepository.getMovieById(movieId);
    const providers = await this.tmdbApiRepository.getMovieProviders(movieId);

    const completeMovie = new ListCompleteMovie();
    completeMovie.movie = movie;
    if (providers.results.BR) {
      completeMovie.providers = providers.results.BR;
    }

    return completeMovie;
  }

  async searchMovieByTitle(
    title: string,
    page: number,
  ): Promise<PaginatedMoviesDto> {
    return await this.tmdbApiRepository.searchMovieByTtitle(title, page);
  }

  async listGenres(): Promise<GenresListDto> {
    return await this.tmdbApiRepository.getListOfGenre();
  }
}
