import { adaptMiddleware } from "../adapters/express-middleware-adapter";
import { makeAuthMiddleware } from "../factories/middleware";

const makeAuthAdmin = adaptMiddleware(makeAuthMiddleware("ADMIN"))