import React,{useContext, useState} from 'react';
import { AuthContext } from '../../context/auth/authContext';
import { Button } from "@blueprintjs/core";
import './form.css'

function If (props){
  return props.condition ? props.children : null;
};

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({
    userName:'',
    password:'',
  });

  const authContext  = useContext(AuthContext);

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    setUserInfo ({
      ...userInfo,
      [name]:value,
    });
  };
  
  function handleSubmit(e){
    e.preventDefault();
    authContext.signIn(userInfo.userName,userInfo.password);
  };
  return (
    <div>
      <If condition={authContext.loginState}>
        <button onClick={authContext.signOut}> Sign Out </button>
      </If>
      <If condition={!authContext.loginState}>
        <form onSubmit={handleSubmit}>
           <input
             required
             placeholder='UserName'
             name='username'
             onChange={handleChange}
           />
             <input
             required
             placeholder='Password'
             name='password'
             onChange={handleChange}
           />
           <button type='submit'>Sign In</button>
        </form>
      </If>
      
    </div>
  );
};
