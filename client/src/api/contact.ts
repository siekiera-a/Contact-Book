import { HttpClient } from './client';
import { IContact, IContactRequest, ISuccessResponse } from './types';

export const addContactApi = async (
  httpClient: HttpClient,
  data: IContactRequest
): Promise<IContact[]> => {
  return httpClient.post('/contact/add', data);
};

export const deleteContactApi = async (
  httpClient: HttpClient,
  id: number
): Promise<ISuccessResponse> => {
  return httpClient.delete(`/contact/${id}`);
};

export const editContactApi = async (
  httpClient: HttpClient,
  contact: IContactRequest,
  id: number
): Promise<ISuccessResponse> => {
  return httpClient.put(`/contact/${id}`, contact);
};
