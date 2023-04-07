import { NestFactory } from '@nestjs/core';
import { ProductModule } from './products.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const logger = new Logger('Main')
  const microServiceOptions = {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port : 3001
    }, 
  }
  
  const app = await NestFactory.createMicroservice(ProductModule,  microServiceOptions
  );
    app.listen()
}
bootstrap();
