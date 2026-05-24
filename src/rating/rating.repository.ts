import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { DataSource } from 'typeorm';
import { CreateRatingDto } from './dto/rating-create.dto';
import { User } from '../user/user.entity';
import { UpdateRatingDto } from './dto/rating-update.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RatingRepository extends Repository<Rating> {
  constructor(dataSource: DataSource) {
    super(Rating, dataSource.createEntityManager());
  }

  async createRating(dto: CreateRatingDto, user: User): Promise<void> {
    const rating = this.create({
      comment: dto.comment,
      score: dto.score,
      tmdbMovieId: dto.tmdbMovieId,
      user,
    });

    await this.save(rating);
  }

  async updateRating(
    ratingId: string,
    dto: UpdateRatingDto,
    user: User,
  ): Promise<void> {
    await this.update(
      { id: ratingId, user: { id: user.id } },
      { comment: dto.comment ?? undefined, score: dto.score ?? undefined },
    );
  }

  async removeRating(ratingId: string, user: User): Promise<void> {
    await this.delete({ id: ratingId, user: { id: user.id } });
  }

  async listAllRatings(user: User): Promise<Rating[]> {
    return await this.find({ where: { user: { id: user.id } } });
  }

  async findOneByUserAndMovieId(
    user: User,
    tmdbMovieId: number,
  ): Promise<Rating | null> {
    return await this.findOne({
      where: { tmdbMovieId, user: { id: user.id } },
    });
  }
}
