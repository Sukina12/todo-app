import React from 'react';

import ToDo from './components/todo/todo';
import SettingContextProvider from './context/setting/context';
import ListContextProvider from './context/setting/listContext';
import AuthContextProvider from './context/auth/authContext'
export default class App extends React.Component {
  render() {
    return (
      <>
      <SettingContextProvider>
        <ListContextProvider>
          <AuthContextProvider>

          <ToDo />
          </AuthContextProvider>
        </ListContextProvider>
      </SettingContextProvider>
      </>
    );
  }
}
