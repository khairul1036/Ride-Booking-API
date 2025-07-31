import { z } from 'zod';

const createDriver = z.object({
  user: z.string({ message: "User must be string" }),
  licenseNumber: z.string({ message: "License number must be at least 4 numbers" }).min(4),
  vehicleType: z.string({ message: "Vehicle Type must be string" }),
  vehicleNumber: z.string({ message: "Vehicle Number must be string" }),
});

const updateAvailability = z.object({
  isAvailable: z.boolean(),
});

export const driverValidation = {
  createDriver,
  updateAvailability,
};