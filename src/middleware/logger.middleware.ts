import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log({
        request: {
            url: req.url,
            method: req.method,
            query: req.query ?? req.body
        } 
    });
    next();
  }
}
