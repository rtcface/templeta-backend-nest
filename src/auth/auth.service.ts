import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterInput } from 'src/users/inputs';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { MESSAGES } from './auth.constants';
import { UserTokenDto } from '../users/dto/user-token.dto';
import { LoginAuthInput } from './inputs';

@Injectable()
export class AuthService {

    constructor( private readonly userService: UsersService,
        private readonly jwtService: JwtService,) {}

    async AuthRegister(inputUser: UserRegisterInput): Promise<UserTokenDto> {
        const {name , email, password} = inputUser;
        const foundUser = await this.userService.findUserByEmail(email);
        if (foundUser) {
            throw new Error(MESSAGES.UNAUTHORIZED_EMAIL_IN_USE);
        }

        // const salt = await bcrypt.genSaltSync(10);

        // const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await this.userService.register({
            name,
            email,
            password: await this.hashePassword(password)
        });

       
       
        return { user: createdUser, token: this.singToken(createdUser.id) };
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findUserByEmail(email);
        if (user && user.password === password) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    

    private singToken(id:string):string {
        return this.jwtService.sign({ id });
    }

    public async login(loginInput:LoginAuthInput): Promise<UserTokenDto> {
        const user = await this.userService.findUserByEmail(loginInput.email);
        if (!user) {
            throw new BadRequestException(`${MESSAGES.UNAUTHORIZED_INVALID_EMAIL} `);
        }
        const isValid = await bcrypt.compare(loginInput.password, user.password);
        if (!isValid) {
            throw new BadRequestException(`${MESSAGES.UNAUTHORIZED_INVALID_PASSWORD} `);
        }
        user.password = "";
        return { user, token: this.singToken(user.id) };
    }

    private async hashePassword(password:string): Promise<string> {
        const salt = await bcrypt.genSaltSync(10);
        return await bcrypt.hash(password, salt);
    }



}
