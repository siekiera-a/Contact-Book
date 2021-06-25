import { HttpClient } from './client';
import { IContact, IContactRequest, ISuccessResponse } from './types';

export const addContactApi = async (
  httpClient: HttpClient,
  data: IContactRequest
): Promise<IContact[]> => {
  return httpClient.post('/contact/add', data);
};

export const deleteContactApi = async (
  HttpClient: HttpClient,
  id: number
): Promise<ISuccessResponse> => {
  return HttpClient.delete(`/contact/${id}`);
};
