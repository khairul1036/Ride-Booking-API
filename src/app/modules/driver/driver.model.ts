import mongoose, { Schema } from "mongoose";
import { IDriver } from "./driver.interface";

const driverSchema = new Schema<IDriver>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    licenseNumber: { type: String, required: true, unique: true, },
    vehicleType: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: false },
    totalEarnings: { type: Number, default: 0 },
    activeRide: { type: Schema.Types.ObjectId, ref: "Ride", default: null },
  },
  { timestamps: true }
);

export const Driver = mongoose.model<IDriver>("Driver", driverSchema);
