import { Router } from "express";

import { PropertiesController } from "../controllers/properties.controller";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

import { propertySchema } from "../schemas/property.schema";

const routes = Router();

const propertiesRoutes = () => {
  routes.post(
    "",
    schemaValidationMiddleware(propertySchema),
    tokenMiddleware,
    isAdmMiddleware,
    new PropertiesController().create
  );

  routes.get("", tokenMiddleware, new PropertiesController().list);

  routes.patch(
    "/:id",
    tokenMiddleware,
    isAdmMiddleware,
    new PropertiesController().update
  );

  routes.get("/:id", tokenMiddleware, new PropertiesController().specific);

  routes.delete(
    "/:id",
    tokenMiddleware,
    isAdmMiddleware,
    new PropertiesController().delete
  );

  routes.post("/:id", tokenMiddleware, new PropertiesController().sale);

  return routes;
};

export { propertiesRoutes };
