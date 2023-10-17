import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import * as uuid from 'uuid';

export type CatDocument = HydratedDocument<Users>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Users {
  @Exclude()
  @Prop({ type: String, default: uuid.v4 })
  _id: string;

  @Prop()
  name: string;

  @Prop({ type: String, index: true, unique: true })
  email: string;

  @Exclude()
  @Prop()
  password: string;

  @Prop()
  age: number;

  @Prop([String])
  hobbies: string[];
}

export const userSchema = SchemaFactory.createForClass(Users);
