import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Authorization', 'set-cookie'], // * 사용할 헤더 추가.
  });
  await app.listen(3000);
}
bootstrap();
