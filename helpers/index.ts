import cookie from 'cookie';
import { IncomingMessage } from 'http';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseCookies(req: IncomingMessage) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}
