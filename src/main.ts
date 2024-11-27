import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { StationModule } from './station.module';

async function bootstrap() {
  const app = await NestFactory.create(StationModule);
  const port = process.env.PORT;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
