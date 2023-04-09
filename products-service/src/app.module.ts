import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

const getDb = () => process.env.MONGODB_DATABASE;
const getConnectionString = () => {
  const { MONGODB_HOST, MONGO_MAPPED_PORT, MONGODB_USER, MONGODB_PASSWORD } =
    process.env;
  const isDocker = process.env.NODE_ENV === 'docker';
  const mongoHost = isDocker ? MONGODB_HOST : 'localhost';
  const mongoPort = isDocker ? 27017 : MONGO_MAPPED_PORT;
  return `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${mongoHost}:${mongoPort}/`;
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(getConnectionString(), {
      useNewUrlParser: true,
      dbName: getDb(),
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class AppModule {}
