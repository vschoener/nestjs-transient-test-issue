import { Module, Scope } from '@nestjs/common';
import { loggerFactory } from './logger.provider';
import { LoggerService } from './logger.service';

@Module({
  providers: [
    loggerFactory,
    {
      provide: LoggerService,
      useClass: LoggerService,
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
