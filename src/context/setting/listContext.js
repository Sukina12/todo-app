import React, { useState } from 'react';
export const ListContext = React.createContext();

export default function listContext(props) {
  const [list, setList] = useState([
    { _id: 1, complete: false, text: 'study to the exam', difficulty: 5, assignee: 'Sukina' },
    { _id: 2, complete: false, text: 'do assignment', difficulty: 4, assignee: 'Sewar' },
    { _id: 3, complete: false, text: 'Buy sweets', difficulty: 3, assignee: 'Sami' },
    { _id: 4, complete: true, text: 'Cooking The Dinner', difficulty: 4, assignee: 'Sukina' },
    { _id: 5, complete: false, text: 'play Football', difficulty: 3, assignee: 'Sami' },
    { _id: 6, complete: true, text: 'clean the room', difficulty: 2, assignee: 'Sewar' }
  ]);
  function addItem(item) {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  }
  function toggleComplete(id){
    let completedItem = list.filter(item => item._id === id)[0] || {};
    if ( completedItem._id ) {
      completedItem.complete = ! completedItem.complete;
      let newList = list.map (item=>{
        item._id === completedItem._id ? completedItem : item
      });
      setList(newList);
    }
  }
  return (
    <ListContext.Provider value={{list,addItem,toggleComplete}}>
       {props.children}
    </ListContext.Provider>
  )
}
