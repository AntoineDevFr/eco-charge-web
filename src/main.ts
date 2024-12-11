import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { StationModule } from './station.module';

async function bootstrap() {
  const app = await NestFactory.create(StationModule);
  // Définition du port d'écoute de l'application. On utilise une variable d'environnement PORT si elle existe, sinon le port 3000 par défaut.
  const port = process.env.PORT || 3000;

  // Application d'une pipe globale pour valider les données entrantes dans toutes les routes de l'application.
  app.useGlobalPipes(new ValidationPipe());

  // Lancement de l'application en écoutant sur le port défini.
  await app.listen(port);
}
//Démarrage de l'application
bootstrap();
