
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomMyLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: CustomMyLogger) {}

  use(request: Request, response: Response, next: NextFunction) {

    response.on('finish', () => {
      const { method, path, body, query } = request;
      const { statusCode, statusMessage } = response;
      const queryString = `query: ${JSON.stringify(query)}`;
      const bodyString = `body: ${JSON.stringify(body)}`;      

      this.logger.log(
        `Request: ${method} ${path} ${bodyString} ${queryString} => ${statusCode} ${statusMessage}`
      );
    });

    next();
  }
}
