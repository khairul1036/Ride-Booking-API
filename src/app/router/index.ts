import { Router } from "express";
import { IModuleRoutes } from "../interfaces";
import { AuthRouter } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.routes";
import { DriverRoutes } from "../modules/driver/driver.routes";

const router = Router();

const moduleRoutes: IModuleRoutes[] = [
  {
    path: "auth",
    element: AuthRouter,
  },
  {
    path: "user",
    element: UserRoutes,
  },
  {
    path: "driver",
    element: DriverRoutes,
  },
];

moduleRoutes.forEach((r) => {
  router.use(`/${r.path}`, r.element);
});

export const Routes = router;
