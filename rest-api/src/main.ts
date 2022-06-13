import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { validateEnvVars } from './shared/configs/environment.config';

async function bootstrap() {
    validateEnvVars();

    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Cards Rest API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());
    app.use(helmet());
    app.enableCors();

    await app.listen(3000);
}
bootstrap();
