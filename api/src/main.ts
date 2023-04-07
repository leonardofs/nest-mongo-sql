import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  await app.listen(PORT, () =>
    logger.log(`Application startup on  port ${PORT}`),
  );
}
bootstrap();
