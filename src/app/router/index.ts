import { Router } from 'express';
import { IModuleRoutes } from '../interfaces';
import { AuthRouter } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.routes';

const router = Router();

const moduleRoutes: IModuleRoutes[] = [
  {
    path: 'auth',
    element: AuthRouter,
  },
    {
    path: 'user',
    element: UserRoutes,
  },
];

moduleRoutes.forEach((r) => {
  router.use(`/${r.path}`, r.element);
});

export const Routes = router;
