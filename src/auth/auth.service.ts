import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { LoginDto } from './dto/loginDto';
import { UserModel } from '../users/models/User';

export default abstract class AuthService {
  static verifyUser = async (loginDto: LoginDto) => {
    const user = await UserModel.findOne(
      { email: loginDto.email },
      '+password',
    ).exec();

    if (!user) return { user: null, verified: false };

    // check password
    const comparison = await bcrypt.compare(loginDto.password, user.password);

    if (comparison === false) return { user: null, verified: false };

    return { user: user, verified: true };
  };

  static generateToken = async (userId: string) => {
    const privateKey = AuthService.getPrivateKey();
    if (privateKey === undefined)
      throw new Error('no private key supplied in the env');

    const token = jwt.sign({ sub: userId }, privateKey, { expiresIn: '1d' });

    return token;
  };

  static verifyToken = async (token: string) => {
    const privateKey = AuthService.getPrivateKey();

    const decode = jwt.verify(token, privateKey);

    return { decode, verified: true };
  };

  static getAuthenticatedUser = async (id: string) => {
    return await UserModel.findById(id);
  };

  private static getPrivateKey() {
    const privateKey = process.env.PRIVATE_KEY;
    if (privateKey === undefined)
      throw new Error('no private key supplied in the env');
    return privateKey;
  }
}
