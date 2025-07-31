import { Types } from "mongoose";

export type DriverStatus = "approved" | "suspended";

export type VehicleType =
  | "bike"
  | "car"
  | "auto-rickshaw"
  | "scooter"
  | "van"
  | "microbus";

export interface IDriver {
  _id?: Types.ObjectId;
  user: Types.ObjectId; // user ID reference
  licenseNumber: string;
  vehicleType: VehicleType;
  vehicleNumber: string;
  isApproved: boolean;
  isAvailable: boolean;
  totalEarnings: number;
  activeRide?: string | null; // ride ID reference
}
