import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRegisterdto } from './dto';
import { UserRegisterInput } from './inputs';




@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly usersModel: Model<UserRegisterdto>) {}

    async register (inputUser: UserRegisterInput): Promise<UserRegisterdto> {
        const createdUser = new this.usersModel(inputUser);
        return await createdUser.save();
    }

    async getUsers(): Promise<UserRegisterdto[]> {
        const users = await this.usersModel.find().exec();
        users.map(user => {
            delete user.password;
            return user;
        });
        return users;
    }

    async findUserByEmail(email: string): Promise<UserRegisterdto> {
        
       return  await this.usersModel.findOne({email:email});
       
    }

    


}
