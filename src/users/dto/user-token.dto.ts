import { Field, ObjectType } from "@nestjs/graphql";
import { UserRegisterdto } from "./user-register.dto";

@ObjectType()
export class UserTokenDto {
    @Field()
    readonly haveError: boolean;

    @Field()
    readonly Err: string;
   
    @Field()
    readonly token: string;

    @Field()
    readonly user: UserRegisterdto;
}