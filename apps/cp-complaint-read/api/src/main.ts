import * as crypto from 'crypto';
if (!globalThis.crypto) {
  globalThis.crypto = crypto as any;
}

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './domains/app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- RabbitMQ microservice (event consumer) ---
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env['RABBITMQ_URL'] || 'amqp://localhost:5672'],
      queue: 'complaint_created',
      queueOptions: { durable: true },
      noAck: false, // manual ack — message only removed after successful processing
    },
  });

  // Start the RabbitMQ listener before the HTTP server
  await app.startAllMicroservices();

  // --- HTTP server ---
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  const swaggerPath = setupSwagger(app);

  const port = process.env['PORT'] || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  if (swaggerPath) {
    Logger.log(
      `📄 Swagger Docs are available at: http://localhost:${port}/${swaggerPath}`,
    );
  }
  Logger.log(`🐇 RabbitMQ consumer listening on queue: complaint_created`);
}

bootstrap();
