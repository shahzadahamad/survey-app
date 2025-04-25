export interface FormDataType {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthProps {
  mode: 'login' | 'register' | 'admin-login';
}