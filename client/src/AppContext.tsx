import React, { createContext, useState } from 'react';
import { useCallback } from 'react';
import { signInApi } from './api/auth';
import { HttpClient } from './api/client';
import { IAuthResponse, IContact, ISignInRequest } from './api/types';

interface IAppContext {
  signIn(data: IAuthResponse): void;
  httpClient: HttpClient;
}

interface IAppContextProps {
  children?: React.ReactNode;
}

const defaultValue: IAppContext = {
  signIn: (data: IAuthResponse) => void 0,
  httpClient: new HttpClient('', ''),
};

export const appContext = createContext<IAppContext>(defaultValue);

const { Provider } = appContext;

export function AppContextProvider({ children }: IAppContextProps) {
  const [httpClient, setHttpClient] = useState<HttpClient>(
    new HttpClient('', '')
  );
  const [contacts, setContacts] = useState<IContact[]>([]);

  const signIn = useCallback(
    (data: IAuthResponse) => {
      setContacts(data.contacts);
    },
    [httpClient, setContacts]
  );

  return <Provider value={{ signIn, httpClient }}>{children}</Provider>;
}
