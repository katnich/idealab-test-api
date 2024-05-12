import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KolDocument = Kol & Document;

@Schema()
export class Kol {
  @Prop({ required: true })
  name: string;

  @Prop()
  platform: string;

  @Prop()
  sex: string;

  @Prop([String])
  categories: string[];

  @Prop()
  tel: string;

  @Prop()
  link: string;

  @Prop()
  followers: string;

  @Prop()
  photo: number;

  @Prop()
  vdo: number;

  @Prop()
  er: string;
}

export const KolSchema = SchemaFactory.createForClass(Kol);
