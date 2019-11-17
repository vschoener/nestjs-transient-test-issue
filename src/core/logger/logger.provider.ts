import { FactoryProvider } from '@nestjs/common/interfaces';
import * as chprLogger from 'chpr-logger';
import { LOGGER_PROVIDER } from './constants';

export const loggerFactory: FactoryProvider = {
  provide: LOGGER_PROVIDER,
  useFactory: () => {
    return chprLogger.init({
      logger: {
        pretty: process.env.NODE_ENV !== 'production',
      },
    });
  },
};
