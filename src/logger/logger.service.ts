import { LoggerService } from '@nestjs/common';

export class CustomMyLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  // log(message: any, ...optionalParams: any[]) {}

  log(message: any, ...optionalParams: any[]): any {

    const logLine = `${message} ${optionalParams.join(' ')}` + '\n';

    process.stdout.write(logLine);
  }


  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {}
}