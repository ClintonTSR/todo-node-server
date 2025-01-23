import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsConstants } from './todo/constants/cors.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: corsConstants.origin,
    credentials: true,
  });

  app.setGlobalPrefix('/api')

  await app.listen(3000);
}
bootstrap();
