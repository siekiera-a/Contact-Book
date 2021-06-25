import React, { createContext, useCallback, useState } from 'react';
import { HttpClient } from './api/client';
import { IAuthResponse, IContact, ISignInRequest, IUser } from './api/types';

interface IAppContext {
  signIn(data: IAuthResponse, credentials: ISignInRequest): void;
  httpClient: HttpClient;
  loggedIn: boolean;
  contacts: IContact[];
  setContacts(contacts: IContact[]): void;
  deleteContact(id: number): void;
  updateContact(contact: IContact): void;
  signOut(): void;
}

interface IAppContextProps {
  children?: React.ReactNode;
}

const defaultValue: IAppContext = {
  signIn: (data: IAuthResponse, credentials: ISignInRequest) => void 0,
  httpClient: new HttpClient('', ''),
  loggedIn: false,
  contacts: [],
  setContacts: (contacts: IContact[]) => void 0,
  deleteContact: (id: number) => void 0,
  updateContact: (contact: IContact) => void 0,
  signOut: () => void 0,
};

export const appContext = createContext<IAppContext>(defaultValue);

const { Provider } = appContext;

export function AppContextProvider({ children }: IAppContextProps) {
  const [httpClient, setHttpClient] = useState<HttpClient>(
    new HttpClient('', '')
  );
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [me, setMe] = useState<IUser>();

  const signIn = useCallback(
    (data: IAuthResponse, credentials: ISignInRequest) => {
      setContacts(data.contacts);
      setMe(data.user);

      const { email, password } = credentials;
      setHttpClient(new HttpClient(email, password));
    },
    [setContacts, setMe, setHttpClient]
  );

  const deleteContact = useCallback(
    (id: number) => {
      setContacts((s) => s.filter((e) => e.id !== id));
    },
    [setContacts]
  );

  const updateContact = useCallback(
    (contact: IContact) => {
      setContacts((c) => {
        const index = c.findIndex((x) => x.id === contact.id);
        if (index === -1) {
          return c;
        }
        c.splice(index, 1, contact);
        return [...c];
      });
    },
    [setContacts]
  );

  const signOut = useCallback(() => {
    setMe(undefined);
    setContacts([]);
    setHttpClient(new HttpClient('', ''));
  }, [setMe, setContacts, setHttpClient]);

  return (
    <Provider
      value={{
        signIn,
        httpClient,
        loggedIn: me !== undefined,
        contacts,
        setContacts,
        deleteContact,
        updateContact,
        signOut,
      }}
    >
      {children}
    </Provider>
  );
}
