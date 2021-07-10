export interface IUser {
    id?: string;
    fullName: string;
    email: string;
    password: string;
    refreshToken?: string;
    userType: 'administrator' | 'vendor' | 'user';
    inactive?: boolean;
  }
  
  