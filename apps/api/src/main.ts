import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateOpenApi } from '@ts-rest/open-api';
import { api } from 'contracts';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: `${process.env.CLIENT_URL}`,
  });

  // Settings for Swagger
  const document = generateOpenApi(api, {
    info: {
      title: 'My Turborepo Sample API',
      version: '1.0.0',
    },
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
