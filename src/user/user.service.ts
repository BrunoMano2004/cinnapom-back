import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UpdateNameDto } from './dto/user-update-name.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (user == null) {
      throw new NotFoundException(`User not found with email: ${email}`);
    }

    return user;
  }

  async create(user: User): Promise<void> {
    const userDb = await this.userRepository.findByEmail(user.email);

    if (userDb)
      throw new ConflictException('User already exists with this email');

    await this.userRepository.createOne(user);
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new NotFoundException('User nor found with this id');
    }

    return user;
  }

  async updateName(userId: string, dto: UpdateNameDto): Promise<void> {
    await this.userRepository.updateName(userId, dto.name);
  }
}
