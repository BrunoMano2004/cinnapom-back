import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne({ where: { email } });
  }

  async createOne(user: User): Promise<void> {
    await this.save(user);
  }

  async updateNickname(email: string, nickname: string) {
    await this.update({ email }, { nickname });
  }
}
