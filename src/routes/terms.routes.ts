import { Router } from "express";

import { TermsController } from "../controllers/terms.controller";

const routes = Router();

const termsRoutes = () => {
  routes.get("", new TermsController().terms);

  return routes;
};

export { termsRoutes };
