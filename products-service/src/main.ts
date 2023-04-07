import { NestFactory } from '@nestjs/core';
import { AppModule } from './products.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const logger = new Logger('Main')
  const microServiceOptions = {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port : 8081
    }, 
  }
  
  const app = await NestFactory.createMicroservice(AppModule,  microServiceOptions
  );
    app.listen()
}
bootstrap();
