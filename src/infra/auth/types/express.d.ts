import { UserPayload } from './user-payload.interface';

declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}
