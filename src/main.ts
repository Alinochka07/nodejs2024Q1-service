import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { setupSwagger } from './swagger.setup';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  setupSwagger(app, port);
  await app.listen(port);
}
bootstrap();
