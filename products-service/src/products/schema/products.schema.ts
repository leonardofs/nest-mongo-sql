import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: Number, required: true })
  price: number;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductsSchema = SchemaFactory.createForClass(Product);
