import React from 'react';

import ToDo from './components/todo/todo';
import SettingContextProvider from './context/setting/context';
import ListContextProvider from './context/setting/listContext';

export default class App extends React.Component {
  render() {
    return (
      <>
      <SettingContextProvider>
        <ListContextProvider>
          <ToDo />
        </ListContextProvider>
      </SettingContextProvider>
      </>
    );
  }
}
