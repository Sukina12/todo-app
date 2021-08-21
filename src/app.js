import React from 'react';

import ToDo from './components/todo/todo';
import SettingContextProvider from './context/setting/context';
import AuthContextProvider from './context/auth/authContext';

export default function App() {
  return (
    <React.Fragment>
      <SettingContextProvider>
          <AuthContextProvider>
            <ToDo />
          </AuthContextProvider>
      </SettingContextProvider>
    </React.Fragment>
  );
}
