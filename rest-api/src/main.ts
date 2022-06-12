import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as csurf from 'csurf';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { validateEnvVars } from './shared/configs/environment.config';

async function bootstrap() {
    validateEnvVars();

    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Cards Rest API')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());
    app.use(helmet());
    app.use(csurf());
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
