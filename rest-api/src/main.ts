import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validateEnvVars } from './shared/configs/environment.config';

async function bootstrap() {
  validateEnvVars();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
