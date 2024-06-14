import React from 'react';
import LogOut from '../auth/logout';
import { logo } from '../image';
import { Navbar} from "react-bootstrap";
import {useSelector} from 'react-redux';

function TeacherHeader() {
  const user = useSelector(state => state.user.userData);

  return (
    <>
      <Navbar expand="lg" style={{ borderBlockEnd: '1px solid' }}>
        <a href="/">
          <img style={{ width: '30%', marginLeft: '7vh' }} src={logo} alt="logo" />
        </a>
        <p style={{width: '20vh', marginLeft: '100vh'}}>{user?.name} - SV{user?.mssv}</p>
        <LogOut />
      </Navbar>
    </>
  );
}

export default TeacherHeader;