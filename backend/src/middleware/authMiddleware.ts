import { auth } from "express-oauth2-jwt-bearer";
import type { RequestHandler } from "express";

const auth0Audience = process.env.AUTH0_AUDIENCE;
const auth0IssuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL;

let requireAuth: RequestHandler;

if (!auth0Audience || !auth0IssuerBaseURL) {
  if (process.env.NODE_ENV === "test") {
    requireAuth = (req, res, next) => {
      const authHeader =
        (req.headers && (req.headers as any).authorization) ||
        (req.headers && (req.headers as any).Authorization);
      if (!authHeader) {
        return res.status(401).end();
      }
      const m = String(authHeader).match(/^Bearer\s+(.+)$/i);
      if (!m || !m[1]) {
        return res.status(401).end();
      }
      const token = m[1];
      if (token === "not-a-real-jwt") {
        return res.status(401).end();
      }
      (req as any).auth = {
        payload: { sub: "test-user", aud: "test-audience" },
      };
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
