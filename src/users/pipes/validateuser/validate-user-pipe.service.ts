import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { CreateUserDto } from "../../dtos/CreateUser.dto";

@Injectable()
export class ValidateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    const parseAgeToInt = parseInt(value.age.toString());

    if (isNaN(parseAgeToInt))
    {
      console.log(value.age + " is not a number!");
      throw new HttpException('Invalid Data Type for a property age. Expected Number.',
        HttpStatus.BAD_REQUEST);
    }
    else
    {
      console.log(`${value.age} is a number.`);
      return { ...value, age: parseAgeToInt }
    }

    return value;
  }
}
