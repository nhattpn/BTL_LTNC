import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Form, Button, Row, Col } from "react-bootstrap";
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LogOut} from './../../components/auth/logout';
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img className="logo" src="https://i.ibb.co/CMwkBmw/lSgDz8N.png" alt="logo" />
        </a>
        <ul className="navbar-nav ms-auto">
          <li style={{padding: '2vh'}}>
            <p>{info.name} - ADMIN</p>
          </li>
          <li style={{padding: '2vh', cursor: 'pointer'}} onClick={LogOut}>
            <i className="fa fa-solid fa-bell fa-lg fa-3x"></i>
            LogOut
          </li>
        </ul>
      </nav>
    </>
  );
}

export default AdminHeader;