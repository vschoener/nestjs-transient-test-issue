import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerFactory } from './core/logger/logger.provider';
import { LoggerService } from './core/logger/logger.service';

async function bootstrap() {
  const logger = new LoggerService(loggerFactory.useFactory());
  logger.setPrefix('BootStrap');

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  await app.listen(3000);
  logger.info(`WebServer running om port 3000`);
}
bootstrap();
