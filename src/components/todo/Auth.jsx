import React, { useContext } from "react";
import { AuthContext } from "../../context/auth/authContext";

function If(props) {
  return props.condition ? props.children : null;
}

export default function Auth(props) {
  const authContext = useContext(AuthContext);
  let render = false;
  try {
    render =
      authContext.logIn &&
      (props.capability
        ? authContext.user.capabilities.includes(props.capability)
        : true);
  } catch (error) {
    console.log("No Authorization");
  }
  return (
    <If condition={render}>
      <div class="">{props.children}</div>
    </If>
  );
}
