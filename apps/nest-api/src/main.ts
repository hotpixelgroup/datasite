import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

/* TODO: Come up with something engineers actually do in real world NestJS applications to
 demonstrate their knowledge of modules, providers, dependency injection, pipes,
 guards, interceptors, validation, and integration with a relational database,
 something that actually demonstrates real-world backend architecture skills.
 Once they have done that, unleash them with something they can show off with AI.
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix, {
    exclude: ['health'],
  });

  const port = process.env.PORT || 3001;

  const config = new DocumentBuilder()
    .setTitle('Client API')
    .setDescription('REST API for Code Challenge')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${port}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);

  Logger.log(`API server running on http://localhost:${port}`);
  Logger.log(`REST API: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`Swagger Docs: http://localhost:${port}/api-docs`);
}

bootstrap();
