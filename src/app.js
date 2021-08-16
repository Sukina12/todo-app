import React from 'react';

import ToDo from './components/todo/todo';
import SettingContextProvider from './context/setting/context';

export default class App extends React.Component {
  render() {
    return (
      <SettingContextProvider>

        <ToDo />
      </SettingContextProvider>
    );
  }
}
