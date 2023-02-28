import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomMyLogger } from './logger.service';

@Catch()
export class LoggingExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: CustomMyLogger,
  ) {
    process.on('uncaughtException', (err, origin) => {
      this.logger.error(
        `We get "Uncaught Exception listener": ${err}. Exception origin: ${origin}.`,
      );
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.logger.error(`We get "Unhandled Rejection listener": ${reason}`, promise);
    });  
  }

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;
    const { name, message } = exception;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      error: name,
      message: message,
    };

    this.logger.writeResponse(httpStatus, JSON.stringify(responseBody));

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
