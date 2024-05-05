import React, { useMemo, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';

import AdminHeader from '../../../components/header_footer/AdminHeader';
import Footer from '../../../components/header_footer/Footer';

function AdminStudentEdit() {
  const [isOpen, setIsOpen] = useState(true);
  
  const [mssv, setMssv] = useState('SV0000000');
  const [gender, setGender] = useState('M');
  const [faculty, setFaculty] = useState('CSE');
  const [fullName, setFullName] = useState('Nguyen Van A');
  const [birthday, setBirthday] = useState('2000-10-20');
  const [classId, setClassId] = useState('MTxxKHzz');
  const [cccd, setCccd] = useState('000000000000');
  const [cccdDay, setCccdDay] = useState('2019-07-19');
  const [cccdLocation, setCccdLocation] = useState('Đắk Lắk');
  const [unit, setUnit] = useState('CSE');
  const [address, setAddress] = useState('KTX khu A');
  const [phoneNumber, setPhoneNumber] = useState('0123456789');
  const [email, setEmail] = useState('abcxyz@mut.edu.vn');
  const [personalEmail, setPersonalEmail] = useState('123456@gmail.com');
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
                  <div style={{ color: '#90f216', padding: '0' }}>
                    Student
                  </div>
                </li>
                <li className="nav-item" style={{ paddingTop: '2rem' }}>
                  <Link to={'/admin/dashboard'} style={{ color: 'white', padding: '0', textDecoration: 'none' }}>
                    Teacher
                  </Link>
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
          <Tab.Container defaultActiveKey={'#info'}>
            <ListGroup style={{ marginTop: '2%', flexDirection: 'row' }}>
              <ListGroup.Item action href="#info" style={{ width: '25%' }}>
                <b>Thông tin sinh viên</b>
              </ListGroup.Item>
              <ListGroup.Item action href="#training" style={{ width: '25%' }}>
                <b>Thông tin đào tạo</b>
              </ListGroup.Item>
            </ListGroup>
            
            <div style={{ margin: '10px 0', borderTop: '1px solid gray', borderBottom: '1px solid gray' }}>
              <i>
                <b>Thời điểm cập nhật gần nhất:</b>
              </i>
              <b>dd/mm/yyyy realtime</b>
            </div>

            <Tab.Content>
              <Tab.Pane eventKey='#info' style={{ borderTop: 'none' }}>
                <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
                  <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
                    Thông tin cá nhân
                  </p>
                </div>
                <Row style={{ width: '96%', margin: 'auto' }}>
                  <Col sm={2}>
                    <div style={{ textAlign: 'center' }}>
                      <img src={''} alt="avatar" style={{ padding: '3vh', backgroundColor: 'rgb(204, 203, 203)' }} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <b style={{ textAlign: 'center' }}>
                        Thời điểm cập nhật ảnh thẻ gần nhất: ___
                      </b>
                    </div>
                  </Col>
                  <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
                    <label htmlFor="mssv" className="form-label"><b>#Mã số sinh viên</b></label>
                    <input type="text" className="form-control" id="mssv" placeholder="Nhập Mã số sinh viên" aria-label="Mã số sinh viên" value={mssv} onChange={(e) => setMssv(e.target.value)} />

                    <div style={{ marginBottom: '6px' }}>
                      <p style={{ fontWeight: 'bold' }}>#Giới tính</p>
                      <input className="form-check-input" type="radio" name="gioitinh" id="nam" value='M' checked={gender === 'M'} onChange={(e) => setGender(e.target.value)} />
                      <label className="form-check-label" htmlFor="nam">
                        Nam
                      </label>
                      <input className="form-check-input" type="radio" name="gioitinh" id="nu" value='F' checked={gender === 'F'} onChange={(e) => setGender(e.target.value)} />
                      <label className="form-check-label" htmlFor="nu">
                        Nữ
                      </label>
                      <input className="form-check-input" type="radio" name="gioitinh" id="khac" value='O' checked={gender === 'O'} onChange={(e) => setGender(e.target.value)} />
                      <label className="form-check-label" htmlFor="khac">
                        Khác
                      </label>
                    </div>

                    <label htmlFor="khoa" className="form-label"><b>#Khoa</b></label>
                    <input type="text" className="form-control" id="khoa" placeholder="Nhập Khoa" aria-label="Khoa" value={faculty} onChange={(e) => setFaculty(e.target.value)} />
                  </Col>
                  <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
                    <label htmlFor="hovaten" className="form-label"><b>#Họ & Tên</b></label>
                    <input type="text" className="form-control" id="hovaten" placeholder="Nhập Họ & tên" aria-label="Họ & tên" value={fullName} onChange={(e) => setFullName(e.target.value)} />

                    <label htmlFor="ngaysinh" className="form-label"><b>#Ngày sinh</b></label>
                    <input type="date" className="form-control" id="ngaysinh" value={birthday} onChange={(e) => setBirthday(e.target.value)} />

                    <label htmlFor="malop" className="form-label"><b>#Mã lớp</b></label>
                    <input type="text" className="form-control" id="malop" placeholder="Nhập Mã lớp" aria-label="Mã lớp" value={classId} onChange={(e) => setClassId(e.target.value)} />
                  </Col>
                  <Col sm={2} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
                    <label htmlFor="cccd" className="form-label"><b>#Số CCCD</b></label>
                    <input type="text" className="form-control" id="cccd" placeholder="Nhập Số CCCD" aria-label="Số CCCD" value={cccd} onChange={(e) => setCccd(e.target.value)} />

                    <label htmlFor="ngaycapcccd" className="form-label"><b>#Ngày cấp CCCD</b></label>
                    <input type="date" className="form-control" id="ngaycapcccd" value={cccdDay} onChange={(e) => setCccdDay(e.target.value)} />
                    
                    <label htmlFor="noicapcccd" className="form-label"><b>#Nơi cấp CCCD</b></label>
                    <input type="text" className="form-control" id="noicapcccd" placeholder="Nhập Nơi cấp CCCD" aria-label="Nơi cấp CCCD" value={cccdLocation} onChange={(e) => setCccdLocation(e.target.value)} />
                  </Col>
                  <Col sm={2} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
                    <label htmlFor="donviquanly" className="form-label"><b>#Đơn vị quản lý</b></label>
                    <input type="text" className="form-control" id="donviquanly" placeholder="Nhập Đơn vị quản lý" aria-label="Đơn vị quản lý" value={unit} onChange={(e) => setUnit(e.target.value)} />
                  </Col>
                </Row>
                <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
                  <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
                    Thông tin liên lạc
                  </p>
                </div>
                <Row style={{ width: '96%', margin: '2% auto' }}>
                  <Col sm={3}>
                    <div style={{ paddingLeft: '1vh' }}>
                      <label htmlFor="diachi" className="form-label"><b>#Địa chỉ</b></label>
                      <input type="text" className="form-control" id="diachi" placeholder="Nhập Địa chỉ" aria-label="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                  </Col>
                  <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
                    <label htmlFor="sdt" className="form-label"><b>#Số điện thoại</b></label>
                    <input type="text" className="form-control" id="sdt" placeholder="Nhập Số điện thoại" aria-label="Số điện thoại" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </Col>
                  <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
                    <label htmlFor="emailtruong" className="form-label"><b>#Email trường</b></label>
                    <input type="text" className="form-control" id="emailtruong" placeholder="Nhập Email trường" aria-label="Email trường" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Col>
                  <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
                    <label htmlFor="email" className="form-label"><b>#Email liên lạc</b></label>
                    <input type="text" className="form-control" id="email" placeholder="Nhập Em#Email liên lạc" aria-label="Em#Email liên lạc" value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)} />
                  </Col>
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey='#training' style={{ borderTop: 'none' }}>
                <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
                  <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
                    Thông tin đào tạo
                  </p>
                </div>
                <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
                  <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
                    Thông tin tốt nghiệp
                  </p>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default AdminStudentEdit;