import React from 'react';

import ToDo from './components/todo/todo.js';
// import List from './components/List';
import Header from './components/Header.js';
// import Main from './components/Main.js';
import ManageAppContextProvider from './components/todo/context/manageApp-context.js';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        < ManageAppContextProvider>
          <Header />
          <ToDo />
          {/* <List/> */}
        </ManageAppContextProvider>
        {/* <Main/> */}
      </React.Fragment>
    );
  }
}
