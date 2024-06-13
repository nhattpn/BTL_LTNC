import React, { useState, useEffect } from 'react';
import LogOut from '../auth/logout';
import { logo } from '../image';
import { Navbar, Nav, Button} from "react-bootstrap";
function TeacherHeader() {
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
        <p style={{width: '20vh', marginLeft: '100vh'}}>{info.name} - SV{info.mssv}</p>
        <LogOut />
      </Navbar>
    </>
  );
}

export default TeacherHeader;