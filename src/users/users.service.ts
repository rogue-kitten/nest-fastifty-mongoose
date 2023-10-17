import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from './dto/createUser.dto';
import { Users } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private UsersModel: Model<Users>) {}

  async createUsers(createUserDto: createUserDto): Promise<Users> {
    try {
      const user = new this.UsersModel(createUserDto);

      const saved_user = await user.save();

      return saved_user;
    } catch (error) {
      return error;
    }
  }
}
