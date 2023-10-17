import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import MongooseClassSerializerInterceptor from 'src/utils/interceptor/mongooseSerialiser.interceptor';
import { createUserDto } from './dto/createUser.dto';
import { Users } from './schema/users.schema';
import { UsersService } from './users.service';

@UseInterceptors(MongooseClassSerializerInterceptor(Users))
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createNewUser(@Body() createUser: createUserDto) {
    try {
      const user = await this.userService.createUsers(createUser);

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
