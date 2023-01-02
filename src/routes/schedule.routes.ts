import { Router } from "express";

import { specificScheduleController } from "../controllers/schedules/specificSchedule.controller";
import { createScheduleController } from "../controllers/schedules/createSchedule.controller";
import { deleteScheduleController } from "../controllers/schedules/deleteSchedule.controller";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";

import { scheduleSchema } from "../schemas/schedule.schema";

const routes = Router();

const schedulesRoutes = (): Router => {
  routes.post(
    "/:id",
    schemaValidationMiddleware(scheduleSchema),
    tokenMiddleware,
    createScheduleController
  );

  routes.delete("/:id", tokenMiddleware, deleteScheduleController);

  routes.get("/:id", tokenMiddleware, specificScheduleController);

  return routes;
};

export { schedulesRoutes };
