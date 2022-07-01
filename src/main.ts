import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const pipes = [
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  ];

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(...pipes);
  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
dotenv.config();
bootstrap();
