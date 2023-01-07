import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginDTO } from 'src/auth/auth.dto';
import User from 'src/db/models/user';

@Injectable()
export class UsersService {
  async findUserByEmail(email: string): Promise<User | undefined> {
    return User.query().findOne({ email });
  }

  async findOne(user: LoginDTO) {
    return User.query().findOne({ email: user.email, password: user.password });
  }

  async checkUserAndBrand(id: string, brandId: string): Promise<boolean> {
    const user = await User.query()
      .findById(id)
      .withGraphFetched('brands');

    if (!user) {
      throw new NotFoundException();
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException();
    }

    if (!user.brand) {
      throw new NotFoundException();
    }

    return user.brand.id === brandId;
  }
}
