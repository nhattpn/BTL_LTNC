import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ViewContext } from '../../../pages/dashboardPage/StudentDashboard';

function EditStudent() {
  const jwtToken = sessionStorage.getItem('jwtToken');
  const {currentView, setCurrentView, user, setUser} = useContext(ViewContext);
  const toggleSwitch = () => {
    setCurrentView(currentView === 'InfoStudent' ? 'EditStudent' : 'InfoStudent');
  };
  const fields = [
    { name: 'name', label: '#Full Name', type: 'text' },
    { name: 'mssv', label: '#Student ID', type: 'text', readOnly: true },
    { name: 'gender', label: '#Sex', type: 'radio' }, // Radio button for gender
    { name: 'birthday', label: '#Day of Birth', type: 'date' },
    { name: 'classId', label: '#Class', type: 'text' },
    { name: 'faculty', label: '#Faculty', type: 'text' },
    { name: 'cccd', label: '#Identity Card Number', type: 'text' },
    { name: 'cccdDay', label: '#Date of issue of identity card', type: 'date' },
    { name: 'cccdLocation', label: '#Place of issue of identity card', type: 'text' },
    { name: 'address', label: '#Address', type: 'text' },
    { name: 'phoneNumber', label: '#Telephone Number', type: 'text' },
    { name: 'email', label: '#University Email', type: 'email' },
    { name: 'personalEmail', label: '#Other Email', type: 'email' },
  ];
  
  // Training Information fields
  const trainingFields = [
    { name: 'yearOfAdmission', label: '#Year of Admission', type: 'text' },
    { name: 'trainingTime', label: '#Training Time', type: 'text' },
    { name: 'educationProgram', label: '#Education Program', type: 'text' },
    { name: 'status', label: '#Status', type: 'text' },
    { name: 'expectSemester', label: '#Expected number of semesters', type: 'number' },
    { name: 'maximumSemester', label: '#Maximum Number of Semesters', type: 'number' },
    { name: 'AAC', label: '#Accumulate Academic Credits', type: 'number' },
    { name: 'GPA', label: '#GPA', type: 'number' },
    { name: 'major', label: '#Major', type: 'text' },
    { name: 'expectGraduationDate', label: '#Expected Graduation Date', type: 'date' },
  ]; 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      thongtinsinhvien: {
        ...prevUser.thongtinsinhvien,
        [name]: value,
      },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/student/dashboard/thongtinsinhvien`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        alert('Update successfully.');
      } else {
        console.error('Failed to update student');
        alert('Failed to update student!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return(
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
          <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
            <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
              Personal Information
            </p>
          </div>

          <Row style={{ width: '96%', margin: 'auto' }}>
            <Col sm={3}>
              <div style={{ textAlign: 'center' }}>
                <img src={''} alt="avatar" style={{ padding: '3vh', backgroundColor: 'rgb(204, 203, 203)' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <b style={{ textAlign: 'center' }}>
                  Last profile photo update time: ___
                </b>
              </div>
            </Col>

            {fields.map((field) => (
              <Col sm={3} key={field.name} style={{ paddingLeft: '1vh', borderLeft: field.name !== 'hovaten' ? '1px solid rgb(204, 203, 203)' : 'none' }}>
                <Form.Group controlId={`form${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`}>
                  <Form.Label><b>{field.label}</b></Form.Label>
                  <Form.Control
                    type={field.type}
                    placeholder="Enter"
                    value={user?.thongtinsinhvien?.[field.name] || ''}
                    onChange={handleInputChange}
                    readOnly={field.readOnly}
                  />
                </Form.Group>
              </Col>
          ))}
          {/*cac phan khac*/}
        </Row>

        </Tab.Pane>

        <Tab.Pane eventKey="#training" style={{ borderTop: 'none' }}>
          <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
            <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
              Training Infomation
            </p>
          </div>

          <Row style={{ width: '96%', margin: 'auto' }}>
            <Col sm={3}>
              <div style={{ textAlign: 'center' }}>
                <img src={''} alt="avatar" style={{ padding: '3vh', backgroundColor: 'rgb(204, 203, 203)' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <b style={{ textAlign: 'center' }}>
                  Last profile photo update time: ___
                </b>
              </div>
            </Col>

            {trainingFields.map((field) => (
              <Col sm={3} key={field.name} style={{ paddingLeft: '1vh', borderLeft: field.name !== 'namnhaphoc' ? '1px solid rgb(204, 203, 203)' : 'none' }}>
                <Form.Group controlId={`form${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`}>
                  <Form.Label><b>{field.label}</b></Form.Label>
                  <Form.Control
                    type={field.type}
                    placeholder="Enter"
                    value={user?.thongtinsinhvien?.training_info?.[field.name] || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>
          {/* ... (các phần khác) */}
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}

export default EditStudent;