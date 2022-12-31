import { AppDataSource } from "./data-source";
import { app } from "./app";

(async () => {
  await AppDataSource.initialize()
    .then((_) => console.log("Database initialized"))
    .catch((error) => console.error("Error initializing the Database", error));

  app.listen(process.env.PORT || 3000, () => console.log("Server runnning"));
})();
