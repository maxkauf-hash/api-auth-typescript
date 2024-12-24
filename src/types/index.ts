export interface Users {
  id?: number;
  email: string;
  password: string;
  emailVerified?: string;
  twoFactorSecret?: string;
  role?: string;
  username?: string;
}
