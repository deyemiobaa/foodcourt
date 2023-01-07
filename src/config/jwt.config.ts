import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  options: {
    expiresIn: '30d',
    algorithm: 'HS512',
  },
  secret: process.env.JWT_SECRET,
}));
