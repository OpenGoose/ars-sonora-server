import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { parseEnv } from '@config/parse-env.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';

async function bootstrap() {
  const {
    swagger: { enabled: isSwaggerEnabled },
  } = parseEnv();

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Use compression
  app.use(compression());

  // Setup security headers
  app.use(helmet());

  // Setup validation
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  if (isSwaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('Ars Sonora Server')
      .setDescription('The API documentation')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentation', app, document);
  }

  await app.listen(3000);
}
bootstrap();
