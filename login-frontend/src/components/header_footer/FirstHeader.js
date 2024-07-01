import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Form, Button, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

function FirstHeader() {
  const [notifications, setNotifications] = useState([]);

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      right: 6,
      top: 10,
      border: "2px solid",
      padding: "0 4px",
    },
  }));
  return (
    <>
      <Navbar style={{ display: 'flex' }}>
        <img style={{ width: '20vh', marginLeft: '3vh' }} src={'https://i.ibb.co/CMwkBmw/lSgDz8N.png'} alt="logo" />
        <Link to={'/teacher/dashboard'} style={{ marginLeft: '5vh', color: 'black', textDecorationLine: 'none' }}>
          <h4 style={{marginLeft: '5vh', marginRight: '5vh', width:'15vh', textAlign: 'center' }}>TEACHER</h4>
        </Link>
        <Link to={'/student/dashboard'} style={{ color: 'black', textDecorationLine: 'none' }}>
          <h4 style={{marginLeft: '5vh', marginRight: '5vh', width:'15vh', textAlign: 'center' }}>STUDENT</h4>
        </Link>
        <Link to={'/admin/dashboard'} style={{ color: 'black', textDecorationLine: 'none' }}>
          <h4 style={{marginLeft: '5vh', marginRight: '5vh', width:'15vh', textAlign: 'center' }}>ADMIN</h4>
        </Link>
        <div style={{ marginLeft: '35%', width: '10%' }}>
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-notifications"
              className="d-flex align-items-center"
            >
              <span
                style={{
                  color: "#324552",
                  fontSize: 16.26,
                  fontFamily: "Work Sans",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <StyledBadge className="me-3" badgeContent={notifications.length} color="primary">
                  <NotificationsIcon color="action" />
                </StyledBadge>
                Notifications
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-0" align="end" style={{ color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word', right: 'auto' }}>
              {notifications.map((notification, index) => (
                <Dropdown.Item key={index}>{notification}</Dropdown.Item>
              ))}
              {notifications.length === 0 && (
                <Dropdown.Item disabled>No notifications</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>
    </>
  );
}

export default FirstHeader;