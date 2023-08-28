import { Router } from "express";

import { SchedulesController } from "../controllers/schedules.controller";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";

import { scheduleSchema } from "../schemas/schedule.schema";

const routes = Router();

const schedulesRoutes = (): Router => {
  routes.post(
    "/:id",
    schemaValidationMiddleware(scheduleSchema),
    tokenMiddleware,
    new SchedulesController().create
  );

  routes.delete("/:id", tokenMiddleware, new SchedulesController().delete);

  routes.get("/:id", tokenMiddleware, new SchedulesController().specific);

  return routes;
};

export { schedulesRoutes };
