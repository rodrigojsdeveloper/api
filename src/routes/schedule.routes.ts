import { Router } from "express";

import { createScheduleController } from "../controllers/schedules/createSchedule.controller";

const routes = Router();

const schedulesRoutes = (): Router => {
  routes.post("", createScheduleController);

  return routes;
};

export { schedulesRoutes };
