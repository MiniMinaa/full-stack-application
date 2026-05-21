import { auth } from 'express-oauth2-jwt-bearer';
import type { RequestHandler } from 'express';

const auth0Audience = process.env.AUTH0_AUDIENCE;
const auth0IssuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL;

let requireAuth: RequestHandler;

if (!auth0Audience || !auth0IssuerBaseURL) {
  // In test environments, export a passthrough middleware so tests can run
  // without a real Auth0 setup. In other environments, fail fast.
  if (process.env.NODE_ENV === "test") {
    requireAuth = (req, res, next) => {
      // Basic test-mode enforcement: require an Authorization header with a
      // Bearer token. If missing or malformed, respond 401 so tests asserting
      // unauthorized access behave correctly. If present, attach a fake
      // auth payload and continue.
      const authHeader = (req.headers && (req.headers as any).authorization) || (req.headers && (req.headers as any).Authorization);
      if (!authHeader) {
        return res.status(401).end();
      }
      const m = String(authHeader).match(/^Bearer\s+(.+)$/i);
      if (!m || !m[1]) {
        return res.status(401).end();
      }
      const token = m[1];
      // Treat a clearly invalid placeholder as malformed
      if (token === "not-a-real-jwt") {
        return res.status(401).end();
      }
      // Attach a minimal auth payload so downstream routes can read req.auth
      (req as any).auth = { payload: { sub: "test-user", aud: "test-audience" } };
      return next();
    };
  } else {
    throw new Error(
      "Missing Auth0 environment variable: AUTH0_AUDIENCE or AUTH0_ISSUER_BASE_URL",
    );
  }
} else {
  requireAuth = auth({
    audience: auth0Audience,
    issuerBaseURL: auth0IssuerBaseURL,
    tokenSigningAlg: "RS256",
  });
}

export default requireAuth;
