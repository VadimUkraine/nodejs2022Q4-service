import { LoggerService, LogLevel } from '@nestjs/common';
import { env } from 'process';
import { appendFileSync, mkdirSync, statSync, renameSync } from 'fs';
import { dirname, join } from 'path';

const ONE_KILOBYTE = 1024;
const DEFAULT_LOG_FILE_SIZE = 10;
const LOG_FILE_MAX_SIZE =
  parseInt(env.LOG_FILE_SIZE, 10) || DEFAULT_LOG_FILE_SIZE;

const logLevels: LogLevel[] = ['error', 'warn', 'log', 'verbose', 'debug'];

export class CustomMyLogger implements LoggerService {
  private logLevel: number;

  constructor() {
    this.logLevel = logLevels.indexOf(this.getLogLevel());
  }

  getLogLevel(): LogLevel {
    const logLevel = env.LOG_LEVEL as LogLevel;

    if (!logLevels.includes(logLevel)) {
      return 'debug';
    }

    return logLevel;
  }

  writeLogsInFile(level: LogLevel, log: string) {
    const fileName = level === 'error' ? 'error-file.txt' : 'log-file.txt';
    const filePath = join('./', 'logs', fileName);
    const dirName = dirname(filePath);


    try {
      const { size } = statSync(filePath);

      if ((size / ONE_KILOBYTE) >= LOG_FILE_MAX_SIZE) {
        const oldFilePath = join(
          dirName,
          `${new Date().toISOString()}-${fileName}`,
        );
        renameSync(filePath, oldFilePath);
      }
    } catch (error) { 
        throw error;
    }

    mkdirSync(dirName, { recursive: true });
    appendFileSync(filePath, log);
  }

  writeLogs(level: LogLevel, message: any, optionalParams: any[]): void {
    if (logLevels.indexOf(level) > this.logLevel) {
      return;
    }

    const log =
      `${level.toUpperCase()}: ${new Date().toISOString()} ${message} ${optionalParams.join(' ')}` + '\n';

    process.stdout.write(log);
    // this.writeLogsInFile(level, log);
  }

  writeResponse(statusCode: number, responseBody: string): void {
    this.log(`Response: Status code ${statusCode}; Body: ${responseBody}`);
  }
  
  error(message: any, ...optionalParams: any[]): any {
    this.writeLogs('error', message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.writeLogs('warn', message, optionalParams);
  }

  log(message: any, ...optionalParams: any[]): any {
    this.writeLogs('log', message, optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.writeLogs('verbose', message, optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.writeLogs('debug', message, optionalParams);
  }  
}