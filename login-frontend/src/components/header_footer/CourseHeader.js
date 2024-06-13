import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button} from "react-bootstrap";
import LogOut from '../auth/logout';
import {logo} from './../image';
function StudentHeader() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    const userdata = sessionStorage.getItem('userdata');
    if(userdata){
      const retrivedata = JSON.parse(userdata);
      setInfo(retrivedata);
    }
  }, [])
  return (
    <>
      <Navbar expand="lg" style={{ borderBlockEnd: '1px solid' }}>
        <a href="/">
          <img style={{ width: '30%', marginLeft: '7vh' }} src={logo} alt="logo" />
        </a>
        <Navbar.Collapse id="basic-navbar-nav" style={{ marginLeft: '5%' }}>
          <Nav className="me-auto">
              <Nav.Link href="/student/mycourse" style={{ fontSize: '1.5em' }}>My Course</Nav.Link>
            <Nav.Link href="/student/courseRegistration" style={{ fontSize: '1.5em' }}>Course Registration</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div>
          <h4 style={{ marginTop: '0.5rem' }}>{info.name} - SV{info.mssv}</h4>
        </div>
        <LogOut />

      </Navbar>
    </>
  );
}

export default StudentHeader;