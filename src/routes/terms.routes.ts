import { Router } from "express";

import { termsController } from "../controllers/terms/terms.controller";

const routes = Router();

const termsRoutes = () => {
  routes.get("", termsController);

  return routes;
};

export { termsRoutes };
