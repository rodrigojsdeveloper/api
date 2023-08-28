import { Router } from "express";

import { LoginController } from "../controllers/login.controller";

const routes = Router();

const loginRoutes = () => {
  routes.post("", new LoginController().create);

  return routes;
};

export { loginRoutes };
