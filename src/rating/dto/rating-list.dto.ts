import { Rating } from '../rating.entity';

export class ListRatingDto {
  constructor(rating: Rating) {
    this.id = rating.id;
    this.score = rating.score;
    this.comment = rating.comment;
    this.createdAt = rating.createdAt;
    this.updatedAt = rating.updatedAt;
    this.tmdbMovieId = rating.tmdbMovieId;
  }

  id!: string;

  score!: number;

  comment!: string;

  createdAt!: Date;

  updatedAt!: Date;

  tmdbMovieId!: number;
}
