import React from 'react';

import ToDo from './components/todo/todo';
import SettingContextProvider from './context/setting/context';
import ListContextProvider from './context/setting/listContext';
import AuthContextProvider from './context/auth/authContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Options from './components/todo/Options';
export default class App extends React.Component {
  render() {
    return (
      <>
      <SettingContextProvider>
        <ListContextProvider>
          <AuthContextProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path ='/'>
                <ToDo />
              </Route>
              <Route exact path = '/Options'>
                <Options />
              </Route>
            </Switch>
          </BrowserRouter>
          </AuthContextProvider>
        </ListContextProvider>
      </SettingContextProvider>
      </>
    );
  }
}
