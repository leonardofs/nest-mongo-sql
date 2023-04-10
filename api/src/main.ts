import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

async function bootstrap() {
  const logger = new Logger('Main');
  const swaggerRoute = 'swagger';
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Teste Nest.Js')
    .setDescription(
      'Teste de conhecimento do uso de Nest.js,Typescript, Microserviços, Mongoose e Typeorm',
    )
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Products')
    .addTag('Cart')
    .addTag('User')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme('v3');
  const options = {
    explorer: true,
    customCss: theme.getBuffer('dark'),
  };
  SwaggerModule.setup(swaggerRoute, app, document, options);

  const PORT = process.env.PORT || 10420;
  await app.listen(PORT, () => {
    logger.log(`Application startup on port ${PORT}`),
      logger.log(
        `Documentation (Swagger) startup on http://localhost:${PORT}/${swaggerRoute}`,
      );
  });
}
bootstrap();
