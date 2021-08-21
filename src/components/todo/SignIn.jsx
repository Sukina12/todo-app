import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { If, Else, Then } from "react-if";
import { Button } from "@blueprintjs/core";

export default function SignIn() {
  const authContext = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    userName:  '',
    password: '',
  });

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    authContext.signIn(userInfo.userName, userInfo.password);
  }
  return (
    <div>
      <If condition={authContext.loggedIn}>
        <Then>
          <Button onClick={authContext.signOut}> Sign Out </Button>
        </Then>
        <Else>
          <form onSubmit={handleSubmit}>
            <input
              required
              type ='text'
              placeholder="UserName"
              name="username"
              onChange={handleChange}
            />
            <input
              required
              type='password'
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button style={{backgroundColor:'#ffb3b3'}} type="submit">Sign In</button>
          </form>
        </Else>
      </If>
    </div>
  );
}
