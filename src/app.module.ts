import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KolModule } from './kol/kol.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/idaelab_test'),
    KolModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
