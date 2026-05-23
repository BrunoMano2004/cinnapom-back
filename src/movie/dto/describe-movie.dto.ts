import { Expose, Type } from 'class-transformer';

export class BelongsToCollectionDto {
  @Expose() id: number;
  @Expose() name: string;

  @Expose({ name: 'poster_path' })
  posterPath: string;

  @Expose({ name: 'backdrop_path' })
  backdropPath: string;
}

export class GenreDto {
  @Expose() id: number;
  @Expose() name: string;
}

export class ProductionCompanyDto {
  @Expose() id: number;
  @Expose() name: string;

  @Expose({ name: 'logo_path' })
  logoPath: string;

  @Expose({ name: 'origin_country' })
  originCountry: string;
}

export class ProductionCountryDto {
  @Expose({ name: 'iso_3166_1' })
  iso31661: string;

  @Expose() name: string;
}

export class SpokenLanguageDto {
  @Expose({ name: 'english_name' })
  englishName: string;

  @Expose({ name: 'iso_639_1' })
  iso6391: string;

  @Expose() name: string;
}

export class MovieDetailDto {
  @Expose() adult: boolean;
  @Expose() budget: number;
  @Expose() homepage: string;
  @Expose() id: number;
  @Expose() overview: string;
  @Expose() popularity: number;
  @Expose() revenue: number;
  @Expose() runtime: number;
  @Expose() status: string;
  @Expose() tagline: string;
  @Expose() title: string;
  @Expose() video: boolean;

  @Expose({ name: 'backdrop_path' })
  backdropPath: string;

  @Expose({ name: 'imdb_id' })
  imdbId: string;

  @Expose({ name: 'origin_country' })
  originCountry: string[];

  @Expose({ name: 'original_language' })
  originalLanguage: string;

  @Expose({ name: 'original_title' })
  originalTitle: string;

  @Expose({ name: 'poster_path' })
  posterPath: string;

  @Expose({ name: 'release_date' })
  releaseDate: string;

  @Expose({ name: 'vote_average' })
  voteAverage: number;

  @Expose({ name: 'vote_count' })
  voteCount: number;

  @Expose({ name: 'belongs_to_collection' })
  @Type(() => BelongsToCollectionDto)
  belongsToCollection: BelongsToCollectionDto;

  @Expose({ name: 'genres' })
  @Type(() => GenreDto)
  genres: GenreDto[];

  @Expose({ name: 'production_companies' })
  @Type(() => ProductionCompanyDto)
  productionCompanies: ProductionCompanyDto[];

  @Expose({ name: 'production_countries' })
  @Type(() => ProductionCountryDto)
  productionCountries: ProductionCountryDto[];

  @Expose({ name: 'spoken_languages' })
  @Type(() => SpokenLanguageDto)
  spokenLanguages: SpokenLanguageDto[];
}
