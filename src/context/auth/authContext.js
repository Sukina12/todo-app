import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';
// import axios from 'axios';
const API = 'https://auth-server-401.herokuapp.com';
export const AuthContext = React.createContext();

export default function Auth(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
   
  useEffect(()=>{
    const token = cookie.load('auth');
    validateToken(token);
  },[])
  function validateToken(token) {
    try{
      let user = jwt.decode(token);
      if (user) setLoginState(true,token,user);
    } catch (err){
      setLoginState(false,null,{});
      console.log(`Validation Error Token ${err.message}`);
    }
  };

  function setLoginState (loggedIn,token,user){
    cookie.save ('auth',token);
    setUser({user});
    setLoggedIn(loggedIn);
  }

  function setLogoutState(loggedIn,user){
    cookie.save ('auth',null);
    setUser({user});
    setLoggedIn(loggedIn);
  }
  async function signIn(userName, password) {
    try {
      const response = await superagent
      .post(`${API}/signin`)
      .set('authorization', `Basic ${base64.encode(`${userName}:${password}`)}`);
      validateToken(response.body.token);
  } catch (error) {
    console.error('LOGIN ERROR', error.message);
  }
  };

  async function signUp(userName, password, email, role) {
    try {
      let response = await superagent
        .post(`${API}/signup`,{
          email,
          userName,
          password,
          role,
        });
       
      validateToken(response.body.token);
    } catch (error) {
      console.error('Sign Up Error',error.message);
    }
  };

  function signOut() {
    setLogoutState(false,{});
  };

  const state = {
    loggedIn,
    user,
    setLoggedIn,
    signIn,
    signOut,
    signUp,
    setUser,
  };
  return (
    <AuthContext.Provider value={state}>
      {props.children}
    </AuthContext.Provider>
  )
}


