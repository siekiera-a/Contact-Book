import React from 'react';
import { AppContextProvider } from './AppContext';
import { AuthView } from './components/auth/AuthView';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <AuthView />
      </AppContextProvider>
    </div>
  );
}

export default App;
