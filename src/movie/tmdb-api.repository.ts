import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { env } from 'process';
import { PaginatedMoviesDto } from './dto/discover-paginated-movie.dto';
import { plainToInstance } from 'class-transformer';
import { GenresListDto } from './dto/genres-list.dt';
import { MovieDetailDto } from './dto/describe-movie.dto';

@Injectable()
export class TmdbApiRepository {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: env.TMDB_BASE_URL,
      headers: {
        Authorization: `Bearer ${env.TMDB_API_TOKEN}`,
      },
    });
  }

  private async get<T>(
    path: string,
    params?: Record<string, unknown>,
  ): Promise<T> {
    const response = await this.http.get<T>(path, { params });
    return response.data;
  }

  async discoverMovies(page: number): Promise<PaginatedMoviesDto> {
    const raw = await this.get('/discover/movie', {
      page,
      include_adult: false,
      include_video: false,
      language: 'pt-BR',
      sort_by: 'popularity.desc',
    });
    return plainToInstance(PaginatedMoviesDto, raw, {
      excludeExtraneousValues: true,
    });
  }

  async getListOfGenre(): Promise<GenresListDto> {
    return this.get('/genre/movie/list', { language: 'pt' });
  }

  async getMovieById(id: number): Promise<MovieDetailDto> {
    const raw = await this.get('/movie/movie_id', {
      language: 'pt-BR',
      movie_id: id,
    });
    return plainToInstance(MovieDetailDto, raw, {
      excludeExtraneousValues: true,
    });
  }
}
