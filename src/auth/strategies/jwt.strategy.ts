import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from '@nestjs/common';
import { JWT_SECRET_TOKEN } from "../auth.constants";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET_TOKEN,
        });
    }
    
    async validate(payload: any) {
        return {id: payload.sub, email: payload.email };
      }
}