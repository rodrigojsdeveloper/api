import { Router } from "express";

import { listAllPropertiesController } from "../controllers/properties/listAllProperties.controller";
import { specificPropertyController } from "../controllers/properties/specificProperty.controller";
import { createPropertyController } from "../controllers/properties/createProperty.controller";
import { deletePropertyController } from "../controllers/properties/deleteProperty.controller";
import { updatePropertyController } from "../controllers/properties/updateProperty.controller";
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

  routes.get("", tokenMiddleware, listAllPropertiesController);

  routes.patch("/:id", tokenMiddleware, updatePropertyController);

  routes.get("/:id", tokenMiddleware, specificPropertyController);

  routes.delete("/:id", tokenMiddleware, deletePropertyController);

  return routes;
};

export { propertiesRoutes };
