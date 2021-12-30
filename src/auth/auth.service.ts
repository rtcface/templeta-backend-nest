import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterdto } from 'src/users/dto';
import { UserRegisterInput } from 'src/users/inputs';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { MESSAGES } from './auth.constants';

@Injectable()
export class AuthService {

    constructor( private readonly userService: UsersService,
        private readonly jwtService: JwtService,) {}

    async AuthRegister(inputUser: UserRegisterInput): Promise<UserRegisterdto> {
        const {name , email, password} = inputUser;
        const foundUser = await this.userService.findUserByEmail(email);
        if (foundUser) {
            throw new Error(MESSAGES.UNAUTHORIZED_EMAIL_IN_USE);
        }

        const salt = await bcrypt.genSaltSync(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await this.userService.register({
            name,
            email,
            password: hashedPassword,
        });

        return createdUser;
    }
}
