'use strict';
import React, { Component } from 'react';
import { useContext } from 'react';
import {ManageAppContext} from './todo/context/manageApp-context';


class List extends Component {
  static manageAppContext = ManageAppContext;
  constructor(props){
    super(props);
    this.state= {
      index :0,
      stopIndex :this.context.numItem,
    }
  }
  nextPage=()=>{
    if(this.state.stopIndex<this.props.list.length){
      this.setState({
        index : index+this.context.numItem,
        stopIndex : stopIndex + this.context.numItem,
      });
    }
  }
  prevPage=()=>{
    if(this.state.index>0){
      this.setState ({
        index:index-this.context.numItem,
        stopIndex:stopIndex-this.context.numItem,
      })
    }
  }

  
  render() {
    return (
      <>
      <div>
        {this.props.list 
          .filter(item =>( this.context.showCompleted ? true : !item.showCompleted))
          .sort((x,y)=>{
            let z;
            this.context.sortField === 'Ascending' ? (z=1) : (z=-1);
            if(x.sortField > y.sortField){
              return z;
            }
            if(x.sortField < y.sortField){
              return z*-1;
            }else {
              return 0;
            }
          })
          .slice(this.state.index,this.state.stopIndex)
          .map (item => (
            <>
             <p>item</p>
            </>
          ))
        }
        
      </div>
        <div className='buttons'>
        <Button onClick={this.prevPage}> Previous </Button>
        <Button onClick={this.nextPage}> Next </Button>
      </div>
      </>
    )
  }
}

export default List
