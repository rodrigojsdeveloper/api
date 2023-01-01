import { Router } from "express";

import { listAllPropertiesController } from "../controllers/properties/listAllProperties.controller";
import { specificPropertyController } from "../controllers/properties/specificProperty.controller";
import { createPropertyController } from "../controllers/properties/createProperty.controller";
import { deletePropertyController } from "../controllers/properties/deleteProperty.controller";
import { updatePropertyController } from "../controllers/properties/updateProperty.controller";
import { propertySaleController } from "../controllers/properties/propertySale.controller";
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
    createPropertyController
  );

  routes.get("", tokenMiddleware, listAllPropertiesController);

  routes.patch(
    "/:id",
    tokenMiddleware,
    isAdmMiddleware,
    updatePropertyController
  );

  routes.get("/:id", tokenMiddleware, specificPropertyController);

  routes.delete(
    "/:id",
    tokenMiddleware,
    isAdmMiddleware,
    deletePropertyController
  );

  routes.post("/:id", tokenMiddleware, propertySaleController);

  return routes;
};

export { propertiesRoutes };
