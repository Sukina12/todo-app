import React, { Component } from 'react'
export const ManageAppContext = React.createContext();

export default class ManageApp extends Component {
  constructor(props){
    super(props);
    this.state ={
      showCompleted :false,
      numItem:5,
      sortField:'Ascending',
    }
  }
  render() {
    return (
      <ManageAppContext.Provider value={this.state}>
        {this.props.children}
      </ManageAppContext.Provider>
    )
  }
}


