import { Navbar, Nav, Button} from "react-bootstrap";
import LogOut from '../auth/logout';
import {logo} from '../image';
import { useSelector } from 'react-redux';
import { useEffect } from "react";

function StudentHeader() {
  const user = useSelector(state => state.user.userData);
  useEffect(() => {
    console.log(user);
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
          <h4 style={{ marginTop: '0.5rem' }}>{user.name} - SV{user.userId}</h4>
        </div>
        <LogOut />

      </Navbar>
    </>
  );
}

export default StudentHeader;