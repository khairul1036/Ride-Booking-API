import { Types } from 'mongoose';

enum Role {
  ADMIN = 'ADMIN',
  RIDER = 'RIDER',
  DRIVER = 'DRIVER',
}
interface IAuthProvider {
  provider: 'google' | 'credentials';
  providerId: string;
}

enum IsActive {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}
enum IStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: string;
  isActive?: IsActive;
  status: IStatus;
  isVerified?: boolean;
  role: Role;
  auths: IAuthProvider[];
  bookings?: Types.ObjectId[];
  guides?: Types.ObjectId[];
}

export { Role, IAuthProvider, IUser, IsActive, IStatus };
