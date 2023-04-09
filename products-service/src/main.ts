import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
//import { Logger } from '@nestjs/common';
async function bootstrap() {
  const port = process.env.PORT || 10421;
  const isDocker = process.env.NODE_ENV === 'docker';
  const host = isDocker ? '0.0.0.0' : 'localhost';
  const microServiceOptions = {
    transport: Transport.TCP,
    options: { host, port },
  };

  const app = await NestFactory.createMicroservice(
    AppModule,
    microServiceOptions,
  );
  app.listen();
}
bootstrap();
