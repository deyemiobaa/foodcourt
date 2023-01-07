import { Injectable } from '@nestjs/common';
import { LoginDTO } from 'src/auth/auto.dto';
import User from 'src/db/models/user';

@Injectable()
export class UsersService {
  async findUserByEmail(email: string): Promise<User | undefined> {
    return User.query().findOne({ email });
  }

  async findOne(user: LoginDTO) {
    return User.query().findOne({email: user.email, password: user.password});
  }
}
