import {
  Body,
  Controller,
  Get, HttpException, HttpStatus,
  Param, ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CreateUserDto } from "../../dtos/CreateUser.dto";
import { UsersService } from "../../services/users/users.service";
import { parse } from "ts-jest";
import { ValidateUserPipe } from "../../pipes/validateuser/validate-user-pipe.service";
import { AuthGuard } from "../../guards/auth/auth.guard";

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController
{
  constructor(private userService: UsersService) {}

  @Get()
  // for one route: @UseGuards(AuthGuard)
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Get('posts')
  getUserPosts() {
    return [
      {
        title: "Hello world",
        body: "I am body",
      }
    ];
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateUserPipe) userData: CreateUserDto)
  {
    console.log(userData)
    let id = parseInt(`${Math.random() * 20000}`);
    return this.userService.createUser({ id: id,  ...userData });
  }

  @Get('/find/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id);
    if (!user) throw new HttpException("User not found", HttpStatus.BAD_REQUEST);

    return user;
  }
}
