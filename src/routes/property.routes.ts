import { Router } from "express";

import { PropertiesControllers } from "../controllers/properties.controller";

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
    new PropertiesControllers().create
  );

  routes.get("", tokenMiddleware, new PropertiesControllers().list);

  routes.patch(
    "/:id",
    tokenMiddleware,
    isAdmMiddleware,
    new PropertiesControllers().update
  );

  routes.get("/:id", tokenMiddleware, new PropertiesControllers().specific);

  routes.delete(
    "/:id",
    tokenMiddleware,
    isAdmMiddleware,
    new PropertiesControllers().delete
  );

  routes.post("/:id", tokenMiddleware, new PropertiesControllers().sale);

  return routes;
};

export { propertiesRoutes };
