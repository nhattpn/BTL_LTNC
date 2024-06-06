import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ViewContext } from '../../../pages/dashboardPage/StudentDashboard';
function InfoStudent() {
  const {currentView, setCurrentView, user, setUser} = useContext(ViewContext);

  const toggleSwitch = () => {
    setCurrentView(currentView === 'InfoStudent' ? 'EditStudent' : 'InfoStudent');
  }

  return (
    <>
      <Tab.Container defaultActiveKey={'#info'}>
        <ListGroup style={{ marginTop: '2%', flexDirection: 'row' }}>
          <ListGroup.Item action href="#info" style={{ width: '25%' }}>
            <b>Personal Information</b>
          </ListGroup.Item>
          <ListGroup.Item action href="#training" style={{ width: '25%' }}>
            <b>Training Information</b>
          </ListGroup.Item>
        </ListGroup>
      <div style={{ padding: '10px' }}>
        <i style={{ fontWeight: 'bold' }}>Last updated time: dd/mm/yyyy realtime</i>
        <Button onClick={toggleSwitch} style={{marginLeft :'100vh', marginRight: '1vh'}}>Edit</Button>
      </div>

      <Tab.Content>
        <Tab.Pane eventKey='#info' style={{ borderTop: 'none' }}>
          <div className="smallbox">
            <p>Personal Information</p>
          </div>
          <div className="data-container" style={{ display: 'flex' }}> 
            <div className="data-box" style={{ marginLeft: '4vh' }}>
              <div style={{ textAlign: 'center' }}>
                <img src={''} alt="avatar" style={{ padding: '3vh', backgroundColor: 'rgb(204, 203, 203)' }} />
              </div>
              <p style={{ fontWeight: 'bold' }}>
                Last profile photo update time: ___
              </p>
            </div>
            <div className="data-box col-3x">
              <p style={{ fontWeight: 'bold' }}>#Full Name</p>
              <p>{user.thongtinsinhvien.name}</p>
              <p style={{ fontWeight: 'bold' }}>#Student ID</p>
              <p>{user.thongtinsinhvien.mssv}</p>
              <p style={{ fontWeight: 'bold' }}>#Sex</p>
              <p>{(user.thongtinsinhvien.private_info.gender === 'M' ? 'Male' : user.thongtinsinhvien.gender === 'F' ? 'Female' : 'Other')||'None'}</p>
            </div>
            <div className="data-box">
              <p style={{ fontWeight: 'bold' }}>#Day of births</p>
              <p>{user.thongtinsinhvien.private_info.birthday||'None'}</p>
              <p style={{ fontWeight: 'bold' }}>#Class</p>
              <p>{user.thongtinsinhvien.private_info.classId||'None'}</p>
              <p style={{ fontWeight: 'bold' }}>#Faculty</p>
              <p>{user.thongtinsinhvien.private_info.faculty||'None'}</p>
            </div>
            <div className="data-box">
              <p style={{ fontWeight: 'bold' }}>#Identity Card Number</p>
              <p>{user.thongtinsinhvien.private_info.cccd||'None'}</p>
              <p style={{ fontWeight: 'bold' }}>#Date of issue of identity card</p>
              <p>{user.thongtinsinhvien.private_info.cccdDay||'None'}</p>
              <p style={{ fontWeight: 'bold' }}>#Place of issue of identity card</p>
              <p>{user.thongtinsinhvien.private_info.cccdLocation||'None'}</p>
            </div>
          </div>
          <div className="smallbox">
            <p>Address Information</p>
          </div>
          <div className="data-container" style={{ display: 'flex' }}>
            <div className="data-box" style={{ marginLeft: '4vh' }}>
              <p style={{ fontWeight: 'bold' }}>#Address</p>
              <p>{user.thongtinsinhvien.private_info.address||'None'}</p>
            </div>
            <div className="data-box">
              <p style={{ fontWeight: 'bold' }}>#Telephone Number</p>
              <p>{user.thongtinsinhvien.private_info.phoneNumber||'None'}</p>
            </div>
            <div className="data-box">
              <p style={{ fontWeight: 'bold' }}>#University Email</p>
              <p>{user.thongtinsinhvien.private_info.email||'None'}</p>
            </div>
            <div className="data-box">
              <p style={{ fontWeight: 'bold' }}>#Other Email</p>
              <p>{user.thongtinsinhvien.private_info.personalEmail||'None'}</p>
            </div>
          </div>
        </Tab.Pane>
        <Tab.Pane eventKey='#training' style={{ borderTop: 'none' }}>
          <div className="training-info">        
            <div className="smallbox">
              <p>Training Information</p>
            </div>
            <div className="data-container" style={{ display: 'flex' }}> 
              <div className="data-box" style={{ marginLeft: '4vh' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src={''} alt="avatar" style={{ padding: '3vh', backgroundColor: 'rgb(204, 203, 203)' }} />
                </div>
                <p style={{ fontWeight: 'bold' }}>
                  Last profile photo update time: ___
                </p>
              </div>
              <div className="data-box">
                <p style={{ fontWeight: 'bold' }}>#Year of Admission</p>
                <p>{user.thongtinsinhvien.training_info.yearOfAdmission||'None'}</p>
                <p style={{ fontWeight: 'bold' }}>#Training Time</p>
                <p>{user.thongtinsinhvien.training_info.traingTime||'None'}</p>
                <p style={{ fontWeight: 'bold' }}>#Education Program</p>
                <p>{user.thongtinsinhvien.training_info.educationProgram||'None'}</p>
              </div>
              <div className="data-box">
                <p style={{ fontWeight: 'bold' }}>#Status</p>
                <p>{user.thongtinsinhvien.training_infostatus||'None'}</p>
                <p style={{ fontWeight: 'bold' }}>#Expected number of semesters</p>
                <p>{user.thongtinsinhvien.training_info.expectSemester||'None'}</p>
                <p style={{ fontWeight: 'bold' }}>#Maximum Number of Semesters</p>
                <p>{user.thongtinsinhvien.training_info.maximumSemester||'None'}</p>
              </div>
              <div className="data-box">
                <p style={{ fontWeight: 'bold' }}>#Accumulate Academic Credits</p>
                <p>{user.thongtinsinhvien.training_info.AAC||'None'}</p>
                <p style={{ fontWeight: 'bold' }}>#GPA</p>
                <p>{user.thongtinsinhvien.training_info.GPA||'None'}</p>
              </div>
            </div>
            <div className="smallbox">
              <p>Graduate Information</p>
            </div>
            <div className="data-container" style={{ display: 'flex' }}>
              <div className="data-box" style={{ marginLeft: '4vh' }}>
                <p style={{ fontWeight: 'bold' }}>#Major</p>
                <p>{user.thongtinsinhvien.training_info.major||'None'}</p>
              </div>
              <div className="data-box">
                <p style={{ fontWeight: 'bold' }}>#Expected Graduation Date</p>
                <p>{user.thongtinsinhvien.training_info.expectGrationDate||'None'}</p>
              </div>
            </div>
          </div>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
    </>
  );
}

export default InfoStudent;
