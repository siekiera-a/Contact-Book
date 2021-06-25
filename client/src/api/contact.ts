import { HttpClient } from './client';
import { IContact, IContactRequest } from './types';

export const addContactApi = async (
  httpClient: HttpClient,
  data: IContactRequest
): Promise<IContact[]> => {
  return httpClient.post('/contact/add', data);
};
