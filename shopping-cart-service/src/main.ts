import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const microServiceOptions = {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3002,
    },
  };

  const app = await NestFactory.createMicroservice(
    AppModule,
    microServiceOptions,
  );
  app.listen();
}
bootstrap();
