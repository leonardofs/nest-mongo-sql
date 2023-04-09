import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { LoggerOptions } from 'typeorm';
import { ShoppingCart } from './shopping-cart/entities/shopping-cart.entity';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    const isDocker = configService.get('NODE_ENV') === 'docker';

    return {
      type: 'postgres',
      host: isDocker ? 'postgres' : 'localhost',
      port: isDocker
        ? 5432
        : parseInt(configService.get('POSTGRES_MAPPED_PORT'), 10),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DB'),
      entities: [ShoppingCart],
      synchronize: true,
      logging: configService.get<LoggerOptions>('TYPEORM_LOGGING') || false,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
