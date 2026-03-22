// swagger.ts
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const SWAGGER_PATH = 'api/docs';

export function setupSwagger(app: INestApplication): string | null {
  const configService = app.get(ConfigService);
  const swaggerEnv = configService.get<string>('SWAGGER');

  const isSwaggerEnabled =
    swaggerEnv === 'true' ||
    swaggerEnv === '1' ||
    (swaggerEnv as unknown) === true;

  if (!isSwaggerEnabled) return null;

  const config = new DocumentBuilder()
    .setTitle('Civic Pulse API')
    .setDescription('The Civic Pulse API description')
    .setVersion('1.0')
    .addTag('civic-pulse')
    .build();

  // lazy factory — document built only on first request
  SwaggerModule.setup(SWAGGER_PATH, app, () =>
    SwaggerModule.createDocument(app, config),
  );

  return SWAGGER_PATH;
}
