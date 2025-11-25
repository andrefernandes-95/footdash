import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { getClientUri } from 'apps/api/src/modules/data/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: (origin, callback) => {
      const clientUri = getClientUri(); // e.g., "localhost:3000" or "myapp.com"
      console.log('clientUri', clientUri)
      
      // allow same origin
      if (!origin || origin === clientUri) {
        return callback(null, true);
      }

      // allow subdomains
      const regex = new RegExp(`^https?:\/\/[a-z0-9-]+\\.${clientUri.replace(/https?:\/\//, '')}$`);
      if (regex.test(origin)) {
        console.log('miau')
        return callback(null, true);
      }
        console.log('false')

      // disallow others
      callback(new Error(`CORS not allowed for ${origin}`));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Footdash API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });

  await app.listen(3005);
}

void bootstrap();
