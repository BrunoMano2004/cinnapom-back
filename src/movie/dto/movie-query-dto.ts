import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { IsEnum } from 'class-validator';

export enum MovieSortBy {
  POPULARITY_DESC = 'popularity.desc',
  POPULARITY_ASC = 'popularity.asc',
  VOTE_AVERAGE_DESC = 'vote_average.desc',
  VOTE_AVERAGE_ASC = 'vote_average.asc',
  VOTE_COUNT_DESC = 'vote_count.desc',
  VOTE_COUNT_ASC = 'vote_count.asc',
  RELEASE_DATE_DESC = 'primary_release_date.desc',
  RELEASE_DATE_ASC = 'primary_release_date.asc',
  REVENUE_DESC = 'revenue.desc',
  REVENUE_ASC = 'revenue.asc',
  TITLE_DESC = 'title.desc',
  TITLE_ASC = 'title.asc',
}

export enum MovieLengthFilter {
  SHORT = 'short',
  FEATURE = 'feature',
}

export enum MovieReleaseFilter {
  UPCOMING = 'upcoming',
  RELEASED = 'released',
}

export class QueryMovieDto {
  @Transform(({ value }) => (value !== undefined ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  includeAdult?: boolean;

  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber()
  @IsOptional()
  genreId?: number;

  @IsEnum(MovieReleaseFilter)
  @IsOptional()
  release?: MovieReleaseFilter;

  @IsEnum(MovieSortBy)
  @IsOptional()
  sortBy?: MovieSortBy = MovieSortBy.POPULARITY_DESC;

  @IsEnum(MovieLengthFilter)
  @IsOptional()
  length?: MovieLengthFilter;
}
