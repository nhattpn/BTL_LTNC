import React, { useMemo, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';

import AdminHeader from '../../../components/header_footer/AdminHeader';
import Footer from '../../../components/header_footer/Footer';

function AdminTeacherEdit() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <AdminHeader />
      <Row>
        <Col sm={2}>
          <ul className="nav flex-column" style={{ height: '100%', backgroundColor: 'rgb(58, 35, 35)', color: 'white' }}>
            <li className="nav-item" style={{ paddingTop: '2rem', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
              <i className="fas fa-regular fa-id-badge fa-md fa-2x"></i> User Information
              <i class="fa-solid fa-angles-down"></i>
            </li>
            {isOpen && (
              <ul>
                <li className="nav-item" style={{ paddingTop: '2rem' }}>
                  <Link to='/admin/dashboard' style={{ color: 'white', padding: '0', textDecoration: 'none' }}>
                    Student
                  </Link>
                </li>
                <li className="nav-item" style={{ paddingTop: '2rem' }}>
                  <div style={{ color: '#90f216', padding: '0' }}>
                    Teacher
                  </div>
                </li>
              </ul>
            )}
            <li className="nav-item" style={{ paddingTop: '2rem' }}>
              <Link to='/dashboard' style={{ color: 'white', padding: '0', textDecoration: 'none' }}>
                <i className="fa fa-solid fa-question fa-md fa-2x"></i> Dashboard
              </Link>
            </li>
          </ul>
        </Col>
        <Col sm={10}>
          <div style={{ display: 'flex', backgroundColor: 'wheat' }}>
            <b style={{ padding: '2vh 10vh', borderTop: '3px solid blue' }}>Thông tin giảng viên</b>
          </div>

          <div style={{ margin: '10px 0', borderTop: '1px solid gray', borderBottom: '1px solid gray' }}>
            <i>
              <b>Thời điểm cập nhật gần nhất:</b>
            </i>
            <b>dd/mm/yyyy realtime</b>
          </div>

          
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default AdminTeacherEdit;