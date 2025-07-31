import express from 'express';

import checkAuth from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';
import { validateRequest } from '../../middlewares/validateRequest';
import { driverValidation } from './driver.validation';
import { DriverController } from './driver.controller';

const router = express.Router();

router.post('/', checkAuth(...Object.values(Role)), validateRequest(driverValidation.createDriver), DriverController.createDriver);
router.get('/', checkAuth(Role.ADMIN), DriverController.getAllDrivers);
router.get('/me', checkAuth(Role.DRIVER), DriverController.getDriverById);
router.patch('/approve/:id', checkAuth(Role.ADMIN), DriverController.updateApproval);
router.patch('/availability', checkAuth(Role.DRIVER), validateRequest(driverValidation.updateAvailability),DriverController.updateAvailability);
router.delete('/:id', checkAuth(Role.ADMIN), DriverController.deleteDriver);

export const DriverRoutes = router;
