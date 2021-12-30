
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRegisterdto } from 'src/users/dto';
import { UserRegisterInput } from 'src/users/inputs';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor( private readonly authService:AuthService ) {}

    @Query(() => String)
    async hello() {
        return 'Hello World!';
    }

    @Mutation(() => UserRegisterdto)
    async register(
        @Args('input') inputUser: UserRegisterInput,
    ) {
        const createdUser = this.authService.AuthRegister(inputUser);
        return createdUser;
    }

    
}
