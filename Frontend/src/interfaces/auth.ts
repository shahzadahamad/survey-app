import { ReactNode } from 'react';

export interface ProtectedAndPublicRouteProps {
  children: ReactNode;
}

export interface FormDataType {
  fullname: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthProps {
  mode: 'login' | 'register' | 'admin-login';
}

export interface UserData {
  _id: string;
  fullname: string;
  email: string;
}