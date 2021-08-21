import React, { useContext,useState,useEffect } from "react";
import { SettingContext } from "../../context/setting/context";
import { H2,Button,Alignment } from "@blueprintjs/core";

function Options() {
  const settingContext  = useContext(SettingContext);

  const [show, setShow] = useState(true);
  const [numItems, setNumItems] = useState(1);

  function handleNumItems (event){
    setNumItems(Number(event.target.value));
  }
  function handleShow (event){
    if(event.target.checked){
      setShow(event.target.checked)
    } else {
      setShow (event.target.checked);
    }
  }
  function handleSubmit (event){
    event.preventDefault();
    settingContext.setPageItems(Number(numItems));
    settingContext.setCompleted(show);
  }
  useEffect (() => {
    let payload = {
      pageItems : settingContext.pageItems,
      completed : settingContext.completed,
    }
    if (settingContext.pageItems){
      localStorage.setItem('setting',JSON.stringify(payload));
    }
  },[settingContext]);
  return (
    <form className="options" onSubmit={(event) =>{handleSubmit(event)} }>
      <H2 style={{color:'#ffb3b3'}}>Options</H2>
      <div>
                <label style={{width:'10%'}}>number of items per page</label>
                <input className="bp3-input" style={{width:'70px'}} name='items' type='number' placeholder={1} value={numItems} min={1} onChange={handleNumItems}></input>
                </div>
                <div style={{height:'40px'}}>
                <label class="bp3-control bp3-checkbox .bp3-align-left">
                <input  name='view' type='checkbox' onChange={handleShow}/>
                <span class="bp3-control-indicator"></span>
                    view completed items
                </label>
                </div>
                <Button style={{backgroundColor:'#ffb3b3'}}  type='submit'>submit</Button>
    </form>
  );
}

export default Options;