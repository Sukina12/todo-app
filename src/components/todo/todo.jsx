import React, { useEffect, useState, useContext } from "react";
// import useForm from './form';
// import Header from '../header/Header';
import Form from "./Form";
import List from "./List";
import './todo.scss';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { v4 as uuid } from "uuid";
import { ListContext } from "../../context/setting/listContext";


const ToDo = () => {
  const listContext = useContext(ListContext);

  const [list, setList] = useState(listContext.list);
  const [incomplete, setIncomplete] = useState([]);
  const [values, setValues] = useState({});

  function deleteItem(id) {
    const items = list.filter((item) => item._id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let list2 = list.map((listItem) =>
        listItem._id === item._id ? item : listItem
      );
      // setCount(list.filter(item => !item.complete).length);
      setList(list2);
    }
  }
  function handleSubmit(event) {
    if (event) event.preventDefault();
    values._id = uuid();
    values.complete = false;
    setList([...list, values]);
    event.target.reset();
  }

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);
  const editor = (text, id) => {
    let item = list.filter((item) => item._id === id)[0] || {};
    if (item) {
      item.text = text;
      let list5 = list.map((itm) => {
        if (itm._id === id) {
          return item;
        } else {
          return itm;
        }
      });
      setList(list5);
    }
  };

  return (
    <>
      <SignIn /> <SignUp />
      <header>
        <h2>
          There are {list.filter((item) => !item.complete).length} Items To
          Complete
        </h2>
      </header>
      <section className="todo">
        <div>
          <Form handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
        <div>
          <List
            list={list}
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
            editor={editor}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;
