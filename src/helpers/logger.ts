/* eslint-disable no-console */
import { constants } from "config/constants";

const logLevels = ["debug", "info", "warn", "error", "fatal"] as const;

export type LogLevel = (typeof logLevels)[number];

const currentLogLevel = constants.logLevel as LogLevel;

const logger = {
  debug: (message: string) => {
    if (currentLogLevel === "debug") {
      console.debug(message);
    }
  },
  info: (message: string) => {
    if (logLevels.indexOf(currentLogLevel) <= logLevels.indexOf("info")) {
      console.info(message);
    }
  },
  warn: (message: string) => {
    if (logLevels.indexOf(currentLogLevel) <= logLevels.indexOf("warn")) {
      console.warn(message);
    }
  },
  error: (message: string) => {
    if (logLevels.indexOf(currentLogLevel) <= logLevels.indexOf("error")) {
      console.error(message);
    }
  },
  fatal: (message: string) => {
    if (logLevels.indexOf(currentLogLevel) <= logLevels.indexOf("fatal")) {
      console.error(message);
    }
  },
};

export { logger };
