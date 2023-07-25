import { join } from 'path'
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import configuration from './configuration/configuration';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],    
    }),
    GraphQLModule.forRoot({ 
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    AuthModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
  })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
