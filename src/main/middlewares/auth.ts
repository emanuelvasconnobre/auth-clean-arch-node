import { adaptMiddleware } from "../adapters/express-middleware-adapter";
import { makeAuthMiddleware } from "../factories/middleware";

export const makeUserAuthMiddleware = adaptMiddleware(makeAuthMiddleware());
