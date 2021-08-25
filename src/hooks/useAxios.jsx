import { useEffect, useState } from "react";
import axios from "axios";
const todoAPI = "https://api-js401.herokuapp.com/api/v1/todo";

function UseAxios() {
  const [list, setList] = useState([]);

  async function _deleteComplete(_id) {
     // if (user.capabilities.includes('delete')) {
      let a = await axios.delete(`${todoAPI}/${_id}`)
      console.log(a);
      let c = (await axios.get(todoAPI)).data.results
      console.log(c);
      setList(c);
  // } else { alert("you cant delete") }
  }

  function _addItem(item) {
    item.due = new Date();
    axios.post(todoAPI, item, {
      headers: {
        mode: "cors",
        cache: "no-cache",
        "Content-Type": "application/json",
      },
    })
      .then (res => {
        setList([...list,res.data]);
      })
      .catch(console.error);
  };

  function _toggleComplete (id){
    let item = list.filter (item1 => item1._id === id)[0] || {};
    if (item._id){
      item.complete = !item.complete;
      let url = `${todoAPI}/${id}`;

      axios
        .put(url, item, {
          headers: {
            mode: 'cors',
            cache: 'no-cache',
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          setList(
            list.map(listItem =>
              listItem._id === item._id ? res.data : listItem
            )
          );
        })
        .catch(console.error);
    
    }
  };
   function _getTodoItems (){
     axios
      .get(todoAPI,{
        headers: {
          mode: 'cors',
          cache: 'no-cache',
          'Content-Type': 'application/json',
        },
      })
       .then (res => setList(res.data.results))
       .catch(console.error);
   };

   useEffect(_getTodoItems,[]);

   return [list,_addItem,_deleteComplete,_toggleComplete,_getTodoItems];

};
export default UseAxios;

