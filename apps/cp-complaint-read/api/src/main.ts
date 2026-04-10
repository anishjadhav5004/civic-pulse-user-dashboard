import * as crypto from 'crypto';
if (!globalThis.crypto) {
  globalThis.crypto = crypto as any;
}

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './domains/app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  const swaggerPath = setupSwagger(app); // route registered BEFORE listen

  const port = process.env.PORT || 3000;
  await app.listen(port); // if this throws, nothing below runs

  // logs only fire after server is confirmed running
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  if (swaggerPath) {
    Logger.log(
      `📄 Swagger Docs are available at: http://localhost:${port}/${swaggerPath}`,
    );
  }
}

bootstrap();
