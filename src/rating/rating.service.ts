import { Injectable, NotFoundException } from '@nestjs/common';
import { RatingRepository } from './rating.repository';
import { CreateRatingDto } from './dto/rating-create.dto';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UpdateRatingDto } from './dto/rating-update.dto';
import { ListRatingDto } from './dto/rating-list.dto';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly userRepository: UserRepository,
  ) {}

  private async getUserBd(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }

  async createRating(dto: CreateRatingDto, email: string): Promise<void> {
    const user = await this.getUserBd(email);

    await this.ratingRepository.createRating(dto, user);
  }

  async updateRating(
    ratingId: string,
    dto: UpdateRatingDto,
    email: string,
  ): Promise<void> {
    const user = await this.getUserBd(email);

    await this.ratingRepository.updateRating(ratingId, dto, user);
  }

  async deleteRating(email: string, ratingId: string): Promise<void> {
    const user = await this.getUserBd(email);

    await this.ratingRepository.removeRating(ratingId, user);
  }

  async listAllRatings(email: string): Promise<ListRatingDto[]> {
    const user = await this.getUserBd(email);

    return await this.ratingRepository.listAllRatings(user);
  }

  async getRatingByUserAndMovie(
    email: string,
    tmdbMovieId: number,
  ): Promise<ListRatingDto> {
    const user = await this.getUserBd(email);

    const rating = await this.ratingRepository.findOneByUserAndMovieId(
      user,
      tmdbMovieId,
    );

    if (rating) {
      return rating;
    } else {
      throw new NotFoundException('Rating not found');
    }
  }
}
