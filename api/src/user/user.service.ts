import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      password: '$2a$10$zBV359M8lUY.lZncolGJQ.NOgsu0UtB4FZJJsLxfyXEtjc4.jOOTi', // mypassword
      name: 'John Doe',
      email: 'user@example.com',
    },
  ];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: User = {
      id: this.users.length + 1,
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    this.users.push(data);

    return {
      ...data,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
