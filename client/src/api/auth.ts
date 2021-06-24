import { HttpClient } from './client';
import { IAuthResponse, ISignInRequest, ISignUpRequest } from './types';

export const signInApi = async (
  httpClient: HttpClient,
  data: ISignInRequest
): Promise<IAuthResponse> => {
  return httpClient.post('/login', data, false);
};

export const signUpApi = async (
  httpClient: HttpClient,
  data: ISignUpRequest
): Promise<IAuthResponse> => {
  return httpClient.post('/register', data, false);
};
