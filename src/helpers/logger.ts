import { constants } from "config/constants";

const logLevels = ["debug", "info", "warn", "error", "fatal"] as const;

export type LogLevel = (typeof logLevels)[number];

const currentLogLevel = constants.logLevel as LogLevel;

const logger = {
  debug: (message: string) => {
    if (currentLogLevel === "debug") {
      // eslint-disable-next-line no-console
      console.debug(message);
    }
  },
  info: (message: string) => {
    if (logLevels.indexOf(currentLogLevel) <= logLevels.indexOf("info")) {
      // eslint-disable-next-line no-console
      console.info(message);
    }
  },
  warn: (message: string) => {
    if (logLevels.indexOf(currentLogLevel) <= logLevels.indexOf("warn")) {
      // eslint-disable-next-line no-console
      console.warn(message);
    }
  },
  error: (message: string) => {
    if (logLevels.indexOf(currentLogLevel) <= logLevels.indexOf("error")) {
      // eslint-disable-next-line no-console
      console.error(message);
    }
  },
  fatal: (message: string) => {
    if (logLevels.indexOf(currentLogLevel) <= logLevels.indexOf("fatal")) {
      // eslint-disable-next-line no-console
      console.error(message);
    }
  },
};

export { logger };
