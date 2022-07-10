import bcrypt from 'bcrypt';

import { UserModel } from './models/User';
import { CreateUserDto } from './dto/create-user.dto';

export default abstract class UserService {
  static findAll = async () => {
    const allUsers = await UserModel.find();
    return allUsers;
  };

  static findOne = async (id: string) => {
    return UserModel.findById(id);
  };

  static create = async (createUserDto: CreateUserDto) => {
    const hashedPass = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new UserModel({ ...createUserDto, password: hashedPass });
    const user = await newUser.save();
    return user;
  };

  static update = async (id: string, updateUserDto: any) => {
    return 'update one';
  };

  static remove = (id: string) => {
    return `this will remove ${id} user`;
  };
}
