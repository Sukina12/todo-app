import React from 'react';
export const SettingContext = React.createContext();
import {useState} from 'react';

 function SettingProvider(props) {
  const [completed, setCompleted] = useState(false);
  const [sorted, setSorted] = useState('Ascending');
  const [pageItems, setPageItems] = useState(4);

  const settingState ={
    completed,
    sorted,
    pageItems,
    setCompleted,
    setSorted,
    setPageItems,
  }
  return (
    <SettingContext.Provider value={settingState}>
       {props.children} 
    </SettingContext.Provider>
  )
}

export default SettingProvider;