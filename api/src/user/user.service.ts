import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      password: '$2b$05$IyFpbbC/T1T1Ap7qu1PVn.3qyJcNACmIAcOMAE/V5wxlXsIhyOxfS', // mypassword
      name: 'John Doe',
      email: 'user@example.com',
    },
  ];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: User = {
      id: this.users.length + 1,
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 5),
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
