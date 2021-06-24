import React from 'react';
import { useContext } from 'react';
import { appContext } from '../AppContext';
import { AuthView } from './auth/AuthView';
import { ContactBook } from './contact/ContactBook';

export function AppView() {
  const { loggedIn } = useContext(appContext);

  return loggedIn ? <ContactBook /> : <AuthView />;
}
