import { auth } from 'express-oauth2-jwt-bearer';
import type { RequestHandler } from 'express';

const auth0Audience = process.env.AUTH0_AUDIENCE;
const auth0IssuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL;

let requireAuth: RequestHandler;

if (!auth0Audience || !auth0IssuerBaseURL) {
  // In test environments, export a passthrough middleware so tests can run
  // without a real Auth0 setup. In other environments, fail fast.
  if (process.env.NODE_ENV === "test") {
    requireAuth = (_req, _res, next) => next();
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
