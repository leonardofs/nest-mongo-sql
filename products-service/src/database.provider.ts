import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: ['./entities/*.entity{.ts,.js}'],
        migrations: [],
        // seed: [], TODO implements typeorm-extension
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
