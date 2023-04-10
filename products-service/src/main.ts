import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
//import { Logger } from '@nestjs/common';
async function bootstrap() {
  const port = process.env.PORT || 10421;
  const isDocker = process.env.NODE_ENV === 'docker';
  const host = isDocker ? '0.0.0.0' : 'localhost';
  const microServiceOptions = {
    transport: Transport.TCP,
    options: { host, port },
  };
  const logger = new Logger('Main');
  const app = await NestFactory.createMicroservice(
    AppModule,
    microServiceOptions,
  );
  logger.log(`started on ${host}:${port}`);
  app.listen();
}
bootstrap();
