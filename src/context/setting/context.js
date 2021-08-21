import React from 'react';
export const SettingContext = React.createContext();
import {useState,useEffect} from 'react';

 function Context(props) {
   const [pageItems, setPageItems] = useState(4);
  const [completed, setCompleted] = useState(true);

  const settingState ={
    completed,
    pageItems,
    setCompleted,
    setPageItems,
  }
  useEffect (()=>{
    const localSetting = JSON.parse (localStorage.getItem('setting'));
    if(localSetting){
      setPageItems(Number(localSetting.pageItems));
      setCompleted(completed);
    }
  },[]);
  useEffect(()=>{
    console.log(pageItems);
  },[pageItems]);
  return (
    <SettingContext.Provider value={settingState}>
       {props.children} 
    </SettingContext.Provider>
  )
}

export default Context;