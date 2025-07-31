import { Router } from 'express';
import { IModuleRoutes } from '../interfaces';
import { AuthRouter } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes: IModuleRoutes[] = [
  {
    path: 'auth',
    element: AuthRouter,
  },
];

moduleRoutes.forEach((r) => {
  router.use(`/${r.path}`, r.element);
});

export const Routes = router;
