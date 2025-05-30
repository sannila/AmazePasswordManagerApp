
export interface IdentityUser {
  id: number;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: Date;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export interface UserModel extends IdentityUser {
  firstName: string;
  lastName?: string;
  dateOfBirth?: Date;
  loginAttempts: number;
  role: string;
  isLockedOut: boolean;
  lockoutEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}