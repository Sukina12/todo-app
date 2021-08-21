import React, { useContext } from "react";
import { AuthContext } from "../../context/auth/authContext";
import {If} from 'react-if';

export default function Auth(props) {
  const authContext = useContext(AuthContext);
  let render = false;
  try {
    render =
      authContext.loggedIn &&
      (props.capability
        ? authContext.user.capabilities.includes(props.capability)
        : false);
  } catch (error) {
    console.log("No Authorization");
  }
  return (
    <If condition={render}>
      <div class="">{props.children}</div>
    </If>
  );
}
