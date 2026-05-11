import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Movie } from '../movie/movie.entity';

@Entity('rating')
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  score!: number;

  @Column({ type: 'varchar', nullable: true })
  comment!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.ratings)
  user!: User;

  @ManyToOne(() => Movie, (movie) => movie.ratings)
  movie!: Movie;
}
