import { Expose } from 'class-transformer';

export class DiscoverMovieDto {
  @Expose() id!: number;
  @Expose() title!: string;

  @Expose({ name: 'original_title' })
  originalTitle!: string;

  @Expose({ name: 'original_language' })
  originalLanguage!: string;

  @Expose() overview!: string;

  @Expose({ name: 'release_date' })
  releaseDate!: string;

  @Expose() popularity!: number;

  @Expose({ name: 'vote_average' })
  voteAverage!: number;

  @Expose({ name: 'vote_count' })
  voteCount!: number;

  @Expose({ name: 'genre_ids' })
  genreIds!: any[];

  @Expose({ name: 'poster_path' })
  posterPath!: string | null;

  @Expose({ name: 'backdrop_path' })
  backdropPath!: string | null;

  @Expose() adult!: boolean;
  @Expose() video!: boolean;
}
