import React, { useState, useEffect } from 'react';
import { cookie } from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';
import axios from 'axios';

export const AuthContext = React.createContext();

const API = 'https://auth-server-401.herokuapp.com';


export default function authContext(props) {
  const [loginState, setLoginState] = useState(false);
  const [user, setUser] = useState({});
   
  // useEffect(()=>{
  //   const token = cookie.load('auth');
  //   validateToken(token);
  // })
  async function signIn(userName, password) {
    try {
      const response = await superagent
      .post(`${API}/signin`)
      .set('authorization', `Basic ${base64.encode(`${userName}:${password}`)}`);
    console.log(response.body);
    validateToken(response.body.token);
  } catch (error) {
    console.error('LOGIN ERROR', error.message);
  }
  };

  async function signUp(userName, password, email, role) {
    try {
      const user = {
        userName: userName,
        password: password,
        email: email,
        role: role,
      };
      let response = await superagent
        .post(`${API}/signup`)
        .send({user});
       
      validateToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  function validateToken(token) {
    if(token !== 'null') {
      let user = jwt.decode(token);
      loginFun(!!user, token, user);
    } else {
      loginFun(false, null, {});
    }
  };
  function signOut() {
    loginFun(false, null, {});
  };

  function loginFun(loginState, token, user) {
    cookie.save('auth', token);
    setLoginState(loginState);
    setUser(user)
  };

  const state = {
    loginState,
    signIn,
    signOut,
    signUp,
    user
  };
  return (
    <AuthContext.Provider value={state}>
      {props.children}
    </AuthContext.Provider>
  )
}
