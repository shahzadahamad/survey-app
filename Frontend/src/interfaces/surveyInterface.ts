export interface FormDataType {
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  date: string;
}

export interface SubmissionType extends FormDataType {
  id: number;
}

export interface SubmissionProps {
  role: 'user' | 'admin'
}