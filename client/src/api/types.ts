export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest extends ISignInRequest {
  name: string;
}

export interface IAuthResponse {
  user: IUser;
  contacts: IContact[];
}

export interface IUser {
  name: string;
  email: string;
}

export interface IContact {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
}
