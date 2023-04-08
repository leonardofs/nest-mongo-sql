import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main');
  const swaggerRoute = 'swagger';
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    // .addBearerAuth()
    .setTitle('Teste Nest.Js')
    .setDescription(
      'Teste de conhecimento do uso de Nest.js,Typescript, Microserviços, Mongoose e Typeorm',
    )
    .setVersion('1.0')
    .addTag('Products')
    // .addTag('Shopping Cart')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerRoute, app, document);

  const PORT = 3000;
  await app.listen(PORT, () => {
    logger.log(`Application startup on port ${PORT}`),
      logger.log(
        `Documentation (Swagger) startup on http://localhost:${PORT}/${swaggerRoute}`,
      );
  });
}
bootstrap();
