import { Application } from "express";
import tutorialRoutes from "./tutorial.routes";
import homeRoutes from "./home.routes";
import indexRoutes from "./index.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/", indexRoutes);
    app.use("/api", homeRoutes);
    app.use("/api/tutorials", tutorialRoutes);
  }
}
