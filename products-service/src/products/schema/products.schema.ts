import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as mongooseSeq from 'mongoose-sequence';

const AutoIncrement = mongooseSeq(mongoose);

@Schema({ timestamps: true })
export class ProductsEntity extends Document {
  @Prop({
    type: Number,
    unique: true,
  })
  productId: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: Number, required: true })
  price: number;
}

export const ProductsSchema = SchemaFactory.createForClass(
  ProductsEntity,
).plugin(AutoIncrement, {
  id: 'product_id',
  inc_field: 'productId',
  //start_seq: 1,
});
