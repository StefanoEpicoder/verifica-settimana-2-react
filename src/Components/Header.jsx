import { Container, Form, FormControl, NavbarBrand } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";

const Header = (props) => {
  const [searchString, setSearchString] = useState("");
  return (
    <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
      <Container>
        <NavbarBrand>
          <img
            alt="logo"
            src="./assets/images/logo.png"
            width="40"
            height="40"
            className="d-inline-block align-top logoHeader"
            onClick={() => {
              window.location.reload();
            }}
          />
          <strong>METEO IN REACT</strong>
        </NavbarBrand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Form className="d-flex ms-auto">
            <FormControl
              type="text"
              placeholder="Cerca una città"
              className="me-2"
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
            />
            <Button
              variant="outline-success"
              onClick={() => {
                props.updateSearch(searchString);
              }}
            >
              Cerca
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
