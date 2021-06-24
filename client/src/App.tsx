import React from 'react';
import { AppContextProvider } from './AppContext';
import { AppView } from './components/AppView';

function App() {
  return (
    <AppContextProvider>
      <AppView />
    </AppContextProvider>
  );
}

export default App;
