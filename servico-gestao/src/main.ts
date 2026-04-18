import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './application/services/app.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
  const appService = app.get(AppService);
  
}
bootstrap();