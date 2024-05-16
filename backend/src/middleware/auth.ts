import { auth } from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSURE_BASE_URL as string,
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALGO as string,
});
