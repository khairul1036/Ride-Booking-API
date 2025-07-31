/* eslint-disable no-console */
import envVars from '../config/env';
import { IAuthProvider, IStatus, IUser, Role } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import hashedPassword from './hashedPassword';

const seedAdmin = async () => {
  try {
    const isAdminExist = await User.findOne({
      email: envVars.ADMIN_EMAIL,
    });

    if (isAdminExist) {
      console.log('Supper admin already Exits');
      return;
    }

    console.log('Trying to create supper admin...');

    const securePassword = await hashedPassword(envVars.ADMIN_PASSWORD);

    const authProvider: IAuthProvider = {
      provider: 'credentials',
      providerId: envVars.ADMIN_EMAIL,
    };

    const payload: IUser = {
      name: 'admin',
      email: envVars.ADMIN_EMAIL,
      role: Role.ADMIN,
      password: securePassword,
      isVerified: true,
      status: IStatus.ONLINE,
      auths: [authProvider],
    };

    const admin = await User.create(payload);
    console.log('Super admin created successfully \n');
    console.log(admin);
  } catch (error) {
    console.log(error);
  }
};

export default seedAdmin;
