import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/rating-create.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { UpdateRatingDto } from './dto/rating-update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListRatingDto } from './dto/rating-list.dto';

@ApiTags('Rating')
@ApiBearerAuth()
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post('crate')
  async createNewRating(
    @Body() dto: CreateRatingDto,
    @CurrentUser() user,
  ): Promise<void> {
    await this.ratingService.createRating(dto, user.email);
  }

  @Patch('update/:ratingId')
  async updateRating(
    @Body() dto: UpdateRatingDto,
    @Param('ratingId') ratingId: string,
    @CurrentUser() user,
  ): Promise<void> {
    await this.ratingService.updateRating(ratingId, dto, user.email);
  }

  @Delete('remove/:ratingId')
  async deleteRating(
    @Param('ratingId') ratingId: string,
    @CurrentUser() user,
  ): Promise<void> {
    await this.ratingService.deleteRating(user.email, ratingId);
  }

  @Get('getByMovie/:movieId')
  async getRatingByMovieAndUser(
    @Param('movieId', ParseIntPipe) movieId: number,
    @CurrentUser() user,
  ): Promise<ListRatingDto> {
    return await this.ratingService.getRatingByUserAndMovie(
      user.email,
      movieId,
    );
  }

  @Get('listAll')
  async listAllRatings(@CurrentUser() user): Promise<ListRatingDto[]> {
    return await this.ratingService.listAllRatings(user.email);
  }
}
