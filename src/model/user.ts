export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface DtoUserUpdate {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface DtoUserCreate {
  name: string;
  email: string;
  gender: string;
  status: string;
}
