import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from 'chpr-logger';
import { LoggerService } from './logger.service';
import { LOGGER_PROVIDER } from './constants';

describe('LoggerService', () => {
  let loggerService: LoggerService;
  let logger;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LOGGER_PROVIDER,
          useValue: {
            debug: jest.fn(),
            warn: jest.fn(),
            info: jest.fn(),
            error: jest.fn(),
          },
        },
        LoggerService,
      ],
    }).compile();

    loggerService = await app.resolve<LoggerService>(LoggerService);
    logger = app.get<Logger>(LOGGER_PROVIDER);
  });

  it('should forward log call', () => {
    loggerService.log('Use log method');

    expect(logger.info.mock.calls).toEqual([[{}, 'Use log method']]);
  });

  it('should forward info call', () => {
    loggerService.info('Use info method');

    expect(logger.info.mock.calls).toEqual([[{}, 'Use info method']]);
  });

  it('should forward warn call', () => {
    loggerService.warn('Use warn method');

    expect(logger.warn.mock.calls).toEqual([[{}, 'Use warn method']]);
  });

  it('should forward verbose call', () => {
    loggerService.verbose('Use verbose method');

    expect(logger.debug.mock.calls).toEqual([[{}, 'Use verbose method']]);
  });

  it('should forward debug call', () => {
    loggerService.debug('Use debug method');

    expect(logger.debug.mock.calls).toEqual([[{}, 'Use debug method']]);
  });

  it('should forward error call', () => {
    loggerService.error('Use error method', 'TRACE', { error: 'CONTEXT' });

    expect(logger.error.mock.calls).toEqual([
      [
        {
          context: { error: 'CONTEXT' },
          trace: 'TRACE',
        },
        'Use error method',
      ],
    ]);
  });

  it('should forward with a prefix', () => {
    loggerService.setPrefix('PREFIX').info('Info with prefix');

    expect(logger.info.mock.calls).toEqual([[{}, '[PREFIX] Info with prefix']]);
  });

  it('should forward with a context', () => {
    loggerService.info('Info with prefix', { context: 'CONTEXT' });

    expect(logger.info.mock.calls).toEqual([
      [
        {
          context: 'CONTEXT',
        },
        'Info with prefix',
      ],
    ]);
  });
});
