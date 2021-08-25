import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';
import axios from 'axios';
const API = 'https://auth-server-401.herokuapp.com';
export const AuthContext = React.createContext();

export default function Auth(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = cookie.load('auth');
    validateToken(token);
  }, [])
  function validateToken(token) {

    if (token !== 'undefined' && token !== 'null') {
      let user = jwt.decode(token);
      setLoginState(true, token, user);
    } else {
      setLoginState(false, null, {});
      console.log(`Validation Error Token `);
    }
  };

  function setLoginState(loggedIn, token, user) {
    cookie.save('auth', token);
    setToken(token);
    setUser({ user });
    setLoggedIn(loggedIn);
  }
  async function signIn(userName, password) {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set('authorization', 
        `Basic ${base64.encode(`${userName}:${password}`)}`
        );
      validateToken(response.body.token);
    } catch (error) {
      console.error('LOGIN ERROR', error.message);
    }
  };

  async function signUp(email,username, password, role) {
    try {
      let response = await axios
        .post(`${API}/signup`, {
          email:email,
          username:username,
          password:password,
          role:role,
        });

      validateToken(response.data.token);
    } catch (error) {
      console.error('Sign Up Error', error.message);
    }
  };

  function signOut() {
    setLoginState(false,null, {});
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


