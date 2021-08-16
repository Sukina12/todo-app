import React, { useContext, useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { If, Else } from "../if/If";
import { SettingContext } from "../../context/setting/context";
import ItemCard from "./Card";

function List(props) {
  const settingContext = useContext(SettingContext);
  const [index, setIndex] = useState(0);
  const [stopIndex, setStopIndex] = useState(settingContext.pageItems);

  let length = props.list.length;

  function nextPage() {
    if (stopIndex < length) {
      setIndex(index + settingContext.pageItems);
      setStopIndex(stopIndex + settingContext.pageItems);
    }
  }

  function prevPage () {
    if (index>0){
       setIndex(index - settingContext.pageItems);
      setStopIndex(stopIndex - settingContext.pageItems);
    }
  }

  return (
    <ListGroup>
    {props.list
        .filter(item => (settingContext.completed ? true : !item.complete))
        .sort((item1, item2) => {
          let x;
          settingContext.difficulty === 'Ascending' ? (x = 1) : (x = -1);
          if (item1.difficulty > item2.difficulty) {
            return x;
          }
          if (item1.difficulty < item2.difficulty) {
            return x * -1;
          } else {
            return 0;
          }
        })
        .slice(index, stopIndex)
        .map(item => (
          <>
            <If condition={item.complete}>
              <ItemCard
                color={'success'}
                asignee={item.assignee}
                title={item.text}
                diff={item.difficulty}
                key={item._id}
                callDelete={() => { props.deleteItem(item._id);}}
                callToggle={() => { props.toggleComplete(item._id);}}
                badge={'Completed'}
              />
            </If>
            <Else condition={item.complete}>
              <ItemCard
                color={'danger'}
                asignee={item.assignee}
                title={item.text}
                diff={item.difficulty}
                key={item._id}
                callDelete={() => { props.deleteItem(item._id);}}
                callToggle={() => { props.toggleComplete(item._id);}}
                badge={'In Progress'}
              />
            </Else>
          </>
        ))}
      {length >= 4 && 
      <div className='buttons'>
        <Button onClick={prevPage}> Previous </Button>
        <Button onClick={nextPage}> Next </Button>
      </div>
      }
      </ListGroup>
    
  );
}
export default List;
