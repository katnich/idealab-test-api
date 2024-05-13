import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { Kol, KolSchema } from './schemas/kol.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Kol.name, schema: KolSchema }])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports:[UserService, MongooseModule]
})
export class UserModule {}
