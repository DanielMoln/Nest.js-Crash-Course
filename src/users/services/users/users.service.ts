import { Injectable } from '@nestjs/common';
import { CreateUserType } from "../../../utils/types";

@Injectable() // every single provider must have this decorator (Nest able to use dependency injection with this decorator)
export class UsersService
{
  private fakeUsers = [
    { id: 1, username: 'Anson', email: 'anson@gmail.com', },
    { id: 2, username: 'David', email: 'David@gmail.com', }
  ];

  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userDetails: CreateUserType) {
      this.fakeUsers.push(userDetails);
      return;
  }

  fetchUserById(id: number) {
    return this.fakeUsers.find((usr: any) => usr.id == id)
  }
}