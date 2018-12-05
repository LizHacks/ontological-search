import * as config from 'config';
import * as pino from 'pino';

const logger = pino();

logger.level = config.get('logger.level');

export type LogFn = (arg: any, ...args: any[]) => void;

// DEFAULT 	(0) The log entry has no assigned severity level.
// DEBUG 	(100) Debug or trace information.
// INFO 	(200) Routine information, such as ongoing status or performance.
// NOTICE 	(300) Normal but significant events, such as start up, shut down, or a configuration change.
// WARNING 	(400) Warning events might cause problems.
// ERROR 	(500) Error events are likely to cause problems.
// CRITICAL 	(600) Critical events cause more severe problems or outages.
// ALERT 	(700) A person must take an action immediately.
// EMERGENCY 	(800) One or more systems are unusable.

export interface Logger {
  trace: LogFn;
  debug: LogFn;
  info: LogFn;
  notice: LogFn;
  warn: LogFn;
  error: LogFn;
  crit: LogFn;
  alert: LogFn;
  emerg: LogFn;
}

const toExport: Logger = {
  trace: logger.trace.bind(logger),
  debug: logger.debug.bind(logger),
  info: logger.info.bind(logger),
  notice: logger.info.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
  crit: logger.error.bind(logger),
  alert: logger.fatal.bind(logger),
  emerg: logger.fatal.bind(logger),
};

export default toExport;
