import React, { useState, useContext } from "react";
import {AuthContext } from "../../context/auth/authContext";
import { If, Else, Then } from "react-if";
import { Button } from "@blueprintjs/core";

export default function SignUp() {
  const authContext = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  function changeUsername(e) {
		setUserName(e.target.value);
	}

	function changePassword(e) {
		setPassword(e.target.value);
	}
  function changeEmail(e) {
		setEmail(e.target.value);
	}

	function handleChangeRole(e) {
		setRole(e.target.value);
	}



  function handleSubmit(e) {
    e.preventDefault();
    authContext.signUp(userName, password, email, role);
  }

  return (
    <>
      <If condition={authContext.loggedIn}>
        <Then>
          <div></div>
        </Then>
        <Else>
          <form onSubmit={handleSubmit}>
            <input
              required
              type="email"
              placeholder="email"
              name="email"
              onChange={changeEmail}
            />
            <input
              required
              placeholder="UserName"
              name="username"
              onChange={changeUsername}
            />
            <input
              required
              placeholder="Password"
              name="password"
              onChange={changePassword}
            />
            <input placeholder="Role" name="role" onChange={handleChangeRole} />
            <Button style={{backgroundColor:'#ffb3b3'}} type="submit">Sign Up</Button>
          </form>
        </Else>
      </If>
    </>
  );
}
