import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/exceptions/allException.filter';

async function bootstrap() {
  const envBasedLogger = {
    development: {
      transport: {
        target: 'pino-pretty',
      },
    },
    production: true,
  };

  const environment = process.env.ENVIRONMENT;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: envBasedLogger[environment] ?? true,
    }),
  );

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
