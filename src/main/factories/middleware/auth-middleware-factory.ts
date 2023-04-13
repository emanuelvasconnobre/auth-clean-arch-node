import { AuthMiddleware } from "@/presentation/middlewares";
import { Middleware } from "@/presentation/Protocols";
import { makeDbLoadAccountByToken } from "../usecases";

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role);
};
