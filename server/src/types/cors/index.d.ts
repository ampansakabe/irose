import type { RequestHandler } from 'express';

declare module 'cors' {
  function cors(options?: {
    origin?: boolean | string | RegExp | (string | RegExp)[];
    credentials?: boolean;
  }): RequestHandler;

  export = cors;
}
