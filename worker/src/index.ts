/**
 * Edge proxy for the static Homepage (S3 origin, Cloudflare in front).
 *
 * Responsibilities:
 *   1. Canonicalize www.kota.dog → kota.dog (301).
 *   2. Proxy everything else to the S3 static-site bucket over HTTPS with
 *      index-file resolution (trailingSlash: true export).
 *
 * No age-gate — kota.dog is general-audience content.
 */

export interface Env {
  /** S3 REST base URL, e.g. https://homepage-prod.s3.us-east-1.amazonaws.com */
  S3_ORIGIN: string;
}

/**
 * Map a request path to the S3 object key for a Next static export built with
 * `trailingSlash: true` (every route → <route>/index.html).
 */
function toObjectPath(pathname: string): string {
  if (pathname === '/' || pathname === '') return '/index.html';
  if (pathname.endsWith('/')) return `${pathname}index.html`;
  const last = pathname.split('/').pop() ?? '';
  if (!last.includes('.')) return `${pathname}/index.html`;
  return pathname;
}

async function serveFromOrigin(env: Env, pathname: string, req: Request): Promise<Response> {
  const base = env.S3_ORIGIN.replace(/\/$/, '');
  const originReq = new Request(base + toObjectPath(pathname), {
    method: 'GET',
    headers: { Accept: req.headers.get('accept') ?? '*/*' },
  });
  const res = await fetch(originReq, { cf: { cacheEverything: true } });
  if (res.status === 404) {
    const notFound = await fetch(`${base}/404.html`);
    return new Response(notFound.body, { status: 404, headers: notFound.headers });
  }
  return res;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Canonicalize www to apex.
    if (url.hostname === 'www.kota.dog') {
      url.hostname = 'kota.dog';
      return Response.redirect(url.toString(), 301);
    }

    return serveFromOrigin(env, url.pathname, request);
  },
};
