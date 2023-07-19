import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUserByEmailWithPassword(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  getUserByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async createUser(user: UserDto) {
    const userExists = await this.getUserByEmail(user.email);

    if (userExists) {
      throw new ConflictException(`Email ${user.email} already exists`);
    }

    const newUser = this.usersRepository.create(user);

    await this.usersRepository.save(newUser);

    const createdUser = await this.getUserByEmail(newUser.email);

    return createdUser;
  }
}
