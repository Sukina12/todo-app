import React, { useContext, useState, useEffect } from "react";
import { Button,Card,Elevation } from '@blueprintjs/core';
import { SettingContext } from "../../context/setting/context";


function List(props) {
  const settingContext = useContext(SettingContext);
  const [activeList, setActiveList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(Math.ceil(props.list.length/settingContext.pageItems));


  useEffect(()=>{
    let start = (activePage - 1)*settingContext.pageItems;
    let last = start + settingContext.pageItems;
    setNumOfPages(Math.ceil(props.list.length/settingContext.pageItems)); 
    setActiveList(props.list.slice(start,last)); 
},[props.list.length]);

useEffect(()=>{
    if(settingContext.completed){
        let start = (activePage - 1)*settingContext.pageItems;
        let last = start + settingContext.pageItems;
        setActiveList(props.list.slice(start,last));
        setNumOfPages(Math.ceil(props.list.length/settingContext.pageItems));
    }else{
       let temp = props.list.filter((item)=>{
            return item.complete===false
        })
        let start = (activePage - 1)*settingContext.pageItems;
        let last = start + settingsContext.pageItems;
        setActiveList(temp.slice(start,last));
        setNumOfPages(Math.ceil(temp.length/settingContext.pageItems))
    }
},[activePage,settingContext.Completed]);


function changeActivePage(num){
    setActivePage(num);
}

function toggleView(){
    settingContext.setCompleted( !settingContext.Completed );
}

const pages=()=>{
    let page =[];
    for(let i=1;i<=numOfPages;i++){
       page.push(<Button style={{backgroundColor:'#ffb3b3'}} onClick={()=>{changeActivePage(i)}} key={i}>{i}</Button>)
    }
    return page;
}

  return (
    <>
     <Button style={{marginLeft:'18px', backgroundColor:'#ffb3b3'}} onClick={toggleView} >{settingContext.completed.toString()}</Button>
        <div style={{marginLeft:'10%'}}>
            {activeList.map(item => (
        <Card style={{width:'30%', marginBottom:'5px',backgroundColor:'#ffb3b3'}} interactive={true} elevation={Elevation.TWO} key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => props.toggleComplete(item._id)}>Complete: {item.complete.toString()}</div>
          <button onClick ={() => props.deleteItem(item._id)}>Delete</button>
        </Card>
      ))}
     {activePage>1 && <Button style={{backgroundColor:'#ffb3b3'}} onClick={()=>{setActivePage(activePage-1)}}>prev</Button>}
        {pages()}
      {activePage<numOfPages && <Button style={{backgroundColor:'#ffb3b3'}} onClick={()=>{setActivePage(activePage+1)}} >next</Button>}

        </div>
      </>
    
  );
}
export default List;