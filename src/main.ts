import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { StationModule } from './station.module';

async function bootstrap() {
  const app = await NestFactory.create(StationModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
