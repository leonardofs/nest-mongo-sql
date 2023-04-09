import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './products.entity';

@Entity('Shopping_Cart')
export class ShoppingCart {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  shoppingCartId: number;
  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number;

  @Column({ name: 'total_quantity', type: 'int', nullable: false, default: 0 })
  totalQuantity: number;

  @Column({
    name: 'total_price',
    type: 'decimal',
    scale: 2,
    nullable: false,
    default: 0,
  })
  totalPrice: number;

  @Column('jsonb', { nullable: true })
  products?: Product[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
