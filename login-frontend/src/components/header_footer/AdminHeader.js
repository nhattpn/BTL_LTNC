import React, { useState, useEffect } from 'react';
import LogOut from './../../components/auth/logout';
import { logo } from '../image';
import { Navbar, Nav, Button} from "react-bootstrap";
function AdminHeader() {
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