/* eslint-disable max-classes-per-file */
import { constants } from 'config/constants';

/*
  These adapters must implement these methods:
    - log(message): logs a message that is not an error or warning.
        if you're implementing an adapter for error tracking, this kind
        of message should be ignored.
    - warn(message): similar to log, but a bit more important. You should
        also avoid tracking it on error reporting.
    - error(message): logs an error.

  NOTE: In order to provide consistent logging, these methods should be
    used with caution. Try to use the correct logging function for your case.
*/

// TODO: implement this adapter
class ProductionAdapter {
  static log() {}

  static warn() {}

  static error() {}
}

class DevelopmentAdapter {
  static log(...messages) {
    /* eslint-disable-next-line no-console */
    console.log(...messages);
  }

  static warn(...messages) {
    /* eslint-disable-next-line no-console */
    console.warn(...messages);
  }

  static error(error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
  }
}

class VoidAdapter {
  static log() {}

  static warn() {}

  static error() {}
}

class Logger {
  constructor(adapter) {
    this.adapter = adapter;

    this.log = this.log.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
  }

  log(...messages) {
    this.adapter.log(...messages);
  }

  warn(...messages) {
    this.adapter.warn(...messages);
  }

  // NOTE: It is assumed 'error' is a javascript error
  error(error) {
    this.adapter.error(error);
  }
}

let adapter = VoidAdapter;
if (constants.environment.isDevelopment) {
  adapter = DevelopmentAdapter;
} else {
  adapter = ProductionAdapter;
}

const logger = new Logger(adapter);

export { logger };
