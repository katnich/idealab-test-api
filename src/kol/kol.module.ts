import { Module } from '@nestjs/common';
import { KolService } from './kol.service';
import { KolController } from './kol.controller';
import { Kol, KolSchema } from './schemas/kol.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Kol.name, schema: KolSchema }])],
  controllers: [KolController],
  providers: [KolService],
})
export class KolModule {}
