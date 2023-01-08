import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDTO } from 'src/auth/auth.dto';
import Brand from 'src/db/models/brand';
import User from 'src/db/models/user';

@Injectable()
export class UsersService {
  async findUserByEmail(email: string): Promise<User | undefined> {
    return User.query().findOne({ email });
  }

  async findOne(user: LoginDTO) {
    return User.query().findOne({ email: user.email, password: user.password });
  }

  async checkUserAndBrand(id: string, brandId: string): Promise<Boolean> {
    const user = await User.query().findById(id)

    if (!user) {
      return false
    }

    if (user.role !== 'admin') {
      return false
    }
    
    const brands = await User.relatedQuery('brands').for(id).where('id', brandId)

    return brands ? true : false
  }
}
