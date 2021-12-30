import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET_TOKEN } from './auth.constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [ UsersModule,
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: JWT_SECRET_TOKEN,
    signOptions: {
      expiresIn: 3600,
    },
  }),
],
  providers: [AuthService, AuthResolver, JwtStrategy]
})
export class AuthModule {}
