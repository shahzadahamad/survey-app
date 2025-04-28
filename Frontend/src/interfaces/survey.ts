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

export type CountryName = {
  name: string;
  flag: string;
};

export type RawCountry = {
  name: { common: string };
  flags: { png: string };
};

export interface HeaderProps {
  title: string;
  role: string;
}