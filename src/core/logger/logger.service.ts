import {
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
  Scope,
} from '@nestjs/common';
import { Logger } from 'chpr-logger';
import { LOGGER_PROVIDER } from './constants';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements NestLoggerService {
  public prefix?: string;

  constructor(@Inject(LOGGER_PROVIDER) private logger: Logger) {}

  private formatMessage(message: string) {
    return this.prefix ? `[${this.prefix}] ${message}` : message;
  }

  private formatContext(context: unknown) {
    return context ? context : {};
  }

  setPrefix(prefix: string) {
    this.prefix = prefix;

    return this;
  }

  debug(message: string, context?: unknown): any {
    this.logger.debug(this.formatContext(context), this.formatMessage(message));
  }

  error(message: string, trace?: string, context?: unknown): any {
    this.logger.error(
      {
        context: this.formatContext(context),
        trace,
      },
      this.formatMessage(message),
    );
  }

  log(message: string, context?: unknown): any {
    this.logger.info(this.formatContext(context), this.formatMessage(message));
  }

  info(message: string, context?: unknown): any {
    this.logger.info(this.formatContext(context), this.formatMessage(message));
  }

  verbose(message: string, context?: unknown): any {
    this.logger.debug(this.formatContext(context), this.formatMessage(message));
  }

  warn(message: string, context?: unknown): any {
    this.logger.warn(this.formatContext(context), this.formatMessage(message));
  }
}
