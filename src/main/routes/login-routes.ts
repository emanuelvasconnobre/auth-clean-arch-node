import { Router } from "express";
import { adaptRoute } from "../adapters";
import { makeLoginController } from "../factories/controller/login-controller-factory";
import { makeSignUpController } from "../factories/controller/signup-controller-factory";

export default (router: Router) => {
  router.post("/signup", adaptRoute(makeSignUpController()));
  router.post("/login", adaptRoute(makeLoginController()));
};
