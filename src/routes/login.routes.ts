import { Router } from "express";

import { LoginControllers } from "../controllers/login.controller";

const routes = Router();

const loginRoutes = () => {
  routes.post("", new LoginControllers().loginController);

  return routes;
};

export { loginRoutes };
