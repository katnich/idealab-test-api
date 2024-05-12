import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/idaelab_test'),
    AuthModule,
    UserModule,
    ConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
