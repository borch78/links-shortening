import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Config } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(Config);

  const { address, port } = config.get('server');
  const { title, version, description } = config.get('swagger');

  const swaggerConfig = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, address);
}
bootstrap();
