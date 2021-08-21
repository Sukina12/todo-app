import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Header(props) {
  return (
    <React.Fragment>
      <Navbar bg={props.color} variant="dark">
        <Container>
          <h1 style={{color:'#ffb3b3'}}>
            There are {props.list.filter((item) => !item.complete).length} Items
            To Complete
          </h1>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;
