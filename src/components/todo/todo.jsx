import React, { useEffect, useState } from 'react';
// import useForm from './form';
import Header from '../header/Header';
import List from './List';
import Form from './Form';
import { v4 as uuid } from 'uuid';


const ToDo = () => {

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [values, setValues] = useState({});

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map( item => {
      if ( item.id == id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    setList(items);

  }
  function handleSubmit (event) {
    if (event) event.preventDefault();
    values.id = uuid();
    values.complete = false;
    setList([...list, values]);
    event.target.reset();
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };



  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
    <Header incomplete={incomplete} />
    <Form handleChange={handleChange} handleSubmit={handleSubmit}/>
    <List list={list} toggleComplete={toggleComplete} deleteItem={deleteItem}/>
    </>
  );
};

export default ToDo;
