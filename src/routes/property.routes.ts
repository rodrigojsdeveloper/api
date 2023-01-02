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
    new PropertiesControllers().createPropertyController
  );

  routes.get(
    "",
    tokenMiddleware,
    new PropertiesControllers().listAllPropertiesController
  );

  routes.patch(
    "/:id",
    tokenMiddleware,
    isAdmMiddleware,
    new PropertiesControllers().updatePropertyController
  );

  routes.get(
    "/:id",
    tokenMiddleware,
    new PropertiesControllers().specificPropertyController
  );

  routes.delete(
    "/:id",
    tokenMiddleware,
    isAdmMiddleware,
    new PropertiesControllers().deletePropertyController
  );

  routes.post(
    "/:id",
    tokenMiddleware,
    new PropertiesControllers().propertySaleController
  );

  return routes;
};

export { propertiesRoutes };
