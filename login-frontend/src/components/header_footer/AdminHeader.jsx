import React, { useState, useEffect } from 'react';
import LogOut from './../../components/auth/logout';
import { logo } from '../image';
import { Navbar, Nav, Button} from "react-bootstrap";
import {useSelector} from 'react-redux';

function AdminHeader() {
  const [info, setInfo] = useState({});
  const user = useSelector(state => state.admin.adminData);
  useEffect(() => {
    if(user){
      setInfo(user);
    }
  }, [])
  return (
    <>
      <Navbar expand="lg" style={{border: '0'}}>
        <a href="/">
          <img style={{ width: '25%', marginLeft: '7vh' }} src={logo} alt="logo" />
        </a>
        <p style={{width: '20vh', marginLeft: '100vh'}}>{info.name} - ADMIN</p>
        <LogOut />
      </Navbar>
    </>
  );
}

export default AdminHeader;