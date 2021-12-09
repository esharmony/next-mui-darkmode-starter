import cookie from 'cookie';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}
