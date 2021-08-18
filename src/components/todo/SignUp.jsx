import { setState } from 'expect';
import React,{useState, useContext} from 'react';
import { AuthContext } from '../../context/auth/authContext';
import { Button } from "@blueprintjs/core";
import './form.css'

function If (props){
  return props.condition ? props.children : null;
};

export default function SignUp() {
  const authContext = useContext (AuthContext);

  const [state, setstate] = useState({
    userName:'',
    password:'',
    email:'',
    role:'user',
  });

  function handleChange (e){
    let value = e.target.value;
    let name = e.target.name;

    setState ({
      ...state,
      [name]:value,
    });
  };

  function handleSubmit (e){
    e.preventDefault();
    authContext.signUp(state.userName,state.password,state.email,state.role);
  };


  return (
    <>
      <If condition ={authContext.loginState}>
        <></>
      </If>
      <If condition ={!authContext.loginState}>
        <form onSubmit={handleSubmit}>
          <input
            required
            type='email'
            placeholder='email'
            name='email'
            onChange={handleChange}
          />
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
          <input
            placeholder='Role'
            name='role'
            onChange={handleChange}
          />
          <button type='submit'>Sign Up</button>
          
        </form>
      </If>
      
    </>
  );
}
