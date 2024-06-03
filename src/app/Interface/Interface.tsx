export interface DBUSER {
  username: string;
  _id: string;
  email: string;
  password: string;
  isverified: boolean;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
  verifyToken: string;
  verifyTokenExpiry: Date;
  resetPasswordToken: string;
  resetPasswordTokenExpiry: Date;
}
