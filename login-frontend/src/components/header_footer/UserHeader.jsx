import React from 'react';
import LogOut from '../auth/logout';
import { logo } from '../image';
import { Navbar} from "react-bootstrap";
import {useSelector} from 'react-redux';

function UserHeader() {
  const role = useSelector(state => (state.user?.isLoggin ? state.user?.userData.role : "admin"))
  const user = useSelector(state => (role !== "admin" ? state.user?.userData : state.admin?.adminData));
  return (
    <>
      <Navbar expand="lg" style={{border: '0'}}>
        <a href="/">
          <img style={{ width: '35%', marginLeft: '5vh' }} src={logo} alt="logo" />
        </a>
        <div>
          <h4 style={{ marginTop: '0.5rem' , width: '25%', marginLeft: '100vh'}}>{user?.name} - {(role === "admin" ? "ADMIN" : (role === "student" ? "SV" : "GV") + user?.userId)}</h4>
        </div>
        <LogOut />
      </Navbar>
    </>
  );
}

export default UserHeader;