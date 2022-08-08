import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import {location} from '../assets/category';
import { loggedOut } from "../modules/authUser";

const Header = () => {
  const user = useSelector(state=>state.authReducer);
  const dispatch = useDispatch();
    return (
        <Navbar expand="lg" style={{margin:0, padding:0}}>
        <Container fluid>
          <Navbar.Brand>
          <Dropdown>
      <Dropdown.Toggle style={{background:'none', border:'none', color:'black'}} id="dropdown-basic">
        내근처
      </Dropdown.Toggle>

      <Dropdown.Menu>
       
      {location.map(value=>(
         <Dropdown.Item>{value}</Dropdown.Item>
      ))}
      </Dropdown.Menu>
    </Dropdown>
          </Navbar.Brand>
        
        </Container>
      </Navbar>
    )
}

export default Header;
