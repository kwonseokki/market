import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from "react-redux";
import { loggedOut } from "../modules/authUser";

const Header = () => {
  const user = useSelector(state=>state.authReducer);
  const dispatch = useDispatch();
    return (
        <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">마켓</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" style={{flexGrow:'0'}}>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
                  <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">search</Button>
            </Form>
            <Nav.Link href="#action1">장바구니</Nav.Link>
            {user.isLogin ?  <NavDropdown title={user.displayName} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">내 상품</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
               내 채팅
              </NavDropdown.Item>
           
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{dispatch(loggedOut)}}>
                 로그아웃
              </NavDropdown.Item>
            </NavDropdown> : <><Nav.Link href="#action1">로그인</Nav.Link>
              <Nav.Link href="#action2">회원가입</Nav.Link></>}
          
            </Nav>
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Header;
