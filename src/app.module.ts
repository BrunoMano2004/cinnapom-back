import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchListModule } from './watch-list/watch-list.module';
import { MovieModule } from './movie/movie.module';
import { WatchListMovieModule } from './watch-list-movie/watch-list-movie.module';
import { RatingModule } from './rating/rating.module';
import { WatchListMemberModule } from './watch-list-member/watch-list-member.module';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.getOrThrow<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: false,
      }),
    }),
    AuthModule,
    UserModule,
    WatchListModule,
    MovieModule,
    WatchListMovieModule,
    RatingModule,
    WatchListMemberModule,
    FriendshipModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
