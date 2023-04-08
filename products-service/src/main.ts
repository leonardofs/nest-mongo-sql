import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
//import { Logger } from '@nestjs/common';
async function bootstrap() {
  //const logger = new Logger('Main');
  const microServiceOptions = {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,
    },
  };

  const app = await NestFactory.createMicroservice(
    AppModule,
    microServiceOptions,
  );
  app.listen();
}
bootstrap();
