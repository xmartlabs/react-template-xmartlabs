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

// NOTE: we're disabling this rule since Typescript does not allow defining interfaces with
// static members. This forces us to define all the adapters with instance methods instead of
// static methods, even though we never use `this` in them.
/* eslint-disable class-methods-use-this */

interface LoggerAdapter {
  log(...messages: any[]): void,
  warn(...messages: any[]): void,
  error(error: Error): void,
}

// TODO: implement this adapter
class ProductionAdapter implements LoggerAdapter {
  log() {}

  warn() {}

  error() {}
}

class DevelopmentAdapter {
  log(...messages: any[]) {
    /* eslint-disable-next-line no-console */
    console.log(...messages);
  }

  warn(...messages: any[]) {
    /* eslint-disable-next-line no-console */
    console.warn(...messages);
  }

  error(error: Error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
  }
}

class VoidAdapter {
  log() {}

  warn() {}

  error() {}
}

class Logger {
  adapter: LoggerAdapter;

  constructor(adapter: LoggerAdapter) {
    this.adapter = adapter;

    this.log = this.log.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
  }

  log(...messages: any[]) {
    this.adapter.log(...messages);
  }

  warn(...messages: any[]) {
    this.adapter.warn(...messages);
  }

  // NOTE: It is assumed 'error' is a javascript error
  error(error: Error) {
    this.adapter.error(error);
  }
}

let adapter: LoggerAdapter = new VoidAdapter();
if (constants.environment.isDevelopment) {
  adapter = new DevelopmentAdapter();
} else {
  adapter = new ProductionAdapter();
}

const logger = new Logger(adapter);

export { logger };
