import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { readFileSync } from 'fs';

async function bootstrap() {
  // Carga de los archivos del certificado SSL
  const httpsOptions = {
    key: readFileSync('./ssl/key.pem'),
    cert: readFileSync('./ssl/cert.pem'),
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {httpsOptions});
  app.set('trust proxy', 'loopback');
  app.setGlobalPrefix('api/cv');

  // Habilitar CORS
  app.enableCors({
    origin: 'https://localhost:3000', // Cambia esto a tu dominio frontend
    credentials: true,
  });

  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // Limita cada IP a 100 solicitudes por ventana de 15 minutos
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
