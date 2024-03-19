import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication, port) => {
  const config = new DocumentBuilder()
    .setTitle('Home Service Library')
    .setDescription('The REST API description')
    .setVersion('0.0.2')
    .addServer(`http://localhost:${port}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);
};
