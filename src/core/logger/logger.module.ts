import { Module, Scope } from '@nestjs/common';
import { loggerFactory } from './logger.provider';
import { LoggerService } from './logger.service';

@Module({
  providers: [loggerFactory, LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
