import { Router } from "express";

import { listAllPropertiesController } from "../controllers/properties/listAllProperties.controller";
import { createPropertyController } from "../controllers/properties/createProperty.controller";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";

import { tokenMiddleware } from "../middlewares/token.middleware";

import { propertySchema } from "../schemas/property.schema";

const routes = Router();

const propertiesRoutes = () => {
  routes.post(
    "",
    schemaValidationMiddleware(propertySchema),
    tokenMiddleware,
    createPropertyController
  );

  routes.get("", listAllPropertiesController);

  return routes;
};

export { propertiesRoutes };
