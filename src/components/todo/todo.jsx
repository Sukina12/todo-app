import React, { useEffect, useState, useContext } from "react";
// import useForm from './form';
// import Header from '../header/Header';
import Form from "./Form";
import List from "./List";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Header from "../header/Header";
import { v4 as uuid } from "uuid";
import "@blueprintjs/core/lib/css/blueprint.css";
import Options from "./Options";

const ToDo = () => {
  
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  function addItem(item){
    let data = {id:uuid() , text:item.text, assignee:item.assignee, complete:false, difficulty: item.difficulty};
    setList ([...list,data]);
  }

  function toggleComplete (id){
    const items = list.map (item =>{
      if (item.id === id){
        item.complete = !item.complete;
      }
      return item;
    });
    setList (items);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  useEffect (()=>{
    let inCompleteItems = list.filter (item => !item.complete).length;
    setIncomplete(inCompleteItems);
    document.title = `To Do List : ${incomplete}`;
  },[list]);
  // function handleSubmit(event) {
  //   if (event) event.preventDefault();
  //   values._id = uuid();
  //   values.complete = false;
  //   setList([...list, values]);
  //   event.target.reset();
  // }

  // const handleChange = (event) => {
  //   event.persist();
  //   setValues((values) => ({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   }));
  // };



  return (
    <>
      <h1 style={{color:'#ffb3b3'}}>To Do App</h1>
      <SignIn /> <SignUp />
      <Header list ={list}/>
      <section className="todo">
        <div>
          <Options/>
        </div>
        <div>
          <Form addItem={addItem} />
        </div>
        <div>
          <List
            list={list}
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;
