import { Navbar, Nav} from "react-bootstrap";
import LogOut from '../auth/logout';
import {logo} from '../image';
import { useSelector } from 'react-redux';

function StudentHeader() {
  const user = useSelector(state => state.user.userData);

  return (
    <>
      <Navbar expand="lg" style={{ borderBlockEnd: '1px solid' }}>
        <a href="/">
          <img style={{ width: '30%', marginLeft: '7vh' }} src={logo} alt="logo" />
        </a>
        <Navbar.Collapse style={{ marginLeft: '5%' }}>
          <Nav className="me-auto">
            <Nav.Link href="/student/mycourse" style={{ fontSize: '1.5em' }}>My Course</Nav.Link>
            <Nav.Link href="/student/courseRegistration" style={{ fontSize: '1.5em' }}>Course Registration</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link href="/student/dashboard" style={{ fontSize: '1.5em' }}>
          <h4 style={{ marginTop: '0.5rem' }}>{user.name} - SV{user.userId}</h4>
        </Nav.Link>
        <LogOut />
      </Navbar>
    </>
  );
}

export default StudentHeader;