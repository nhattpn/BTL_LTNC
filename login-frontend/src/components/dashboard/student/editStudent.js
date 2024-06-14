import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ViewContext } from '../../../pages/dashboardPage/StudentDashboard';
import { useSelector } from 'react-redux';

function EditStudent() {
  const jwtToken = sessionStorage.getItem('jwtToken');
  const {currentView, setCurrentView} = useContext(ViewContext);
  const toggleSwitch = () => {
    setCurrentView(currentView === 'InfoStudent' ? 'EditStudent' : 'InfoStudent');
  };
  const user = useSelector(state => state.user?.userData);

  const [mssv, setMssv] = useState('');  const [gender, setGender] = useState('');
  const [faculty, setFaculty] = useState('');  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');  const [classId, setClassId] = useState('');
  const [cccd, setCccd] = useState('');  const [cccdDay, setCccdDay] = useState('');
  const [cccdLocation, setCccdLocation] = useState('');  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');  const [email, setEmail] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');

  const[yearOfAdmission, setYearOfAdmission] = useState('');  const [trainingTime, setTrainingTime] = useState('');
  const [educationProgram, setEducationProgram] = useState('');  const [status, setEtatus] = useState('');
  const [expectSemester, setExpectSemester] = useState('');  const [maximumSemester, setMaximumSemester] = useState('');
  const [AAC, setAAC] = useState('');  const [GPA, setGPA] = useState('');
  const [major, setMajor] = useState('');  const [expectGraduationDate, setExpectGraduationDate] = useState('');

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

  return (
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

            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="hovaten" className="form-label"><b>#Full Name</b></label>
              <input type="text" className="form-control" id="hovaten" placeholder="Enter" value={name} onChange={(e) => setUser(e.target.value)} />

              <label htmlFor="mssv" className="form-label"><b>#Student ID</b></label>
              <input type="text" className="form-control" id="mssv" placeholder="Enter" value={mssv}/>

              <div style={{ marginBottom: '6px' }}>
                <p style={{ fontWeight: 'bold' }}>#Sex</p>
                <input className="form-check-input" type="radio" name="gioitinh" id="nam" value='M' checked={gender === 'M'} onChange={(e) => setUser(e.target.value)} />
                <label className="form-check-label" htmlFor="nam">
                  Male
                </label>
                <input className="form-check-input" type="radio" name="gioitinh" id="nu" value='F' checked={gender === 'F'} onChange={(e) => setUser(e.target.value)} />
                <label className="form-check-label" htmlFor="nu">
                  Female
                </label>
                <input className="form-check-input" type="radio" name="gioitinh" id="khac" value='O' checked={gender === 'O'} onChange={(e) => setUser(e.target.value)} />
                <label className="form-check-label" htmlFor="khac">
                  Other
                </label>
              </div>

            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="ngaysinh" className="form-label"><b>#Day of Births</b></label>
              <input type="date" className="form-control" id="" placeholder="Enter" value={birthday} 
                onChange={(e) => setUser(e.target.value)} />

              <label htmlFor="malop" className="form-label"><b>#Class</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter" value={classId} 
                onChange={(e) => setUser(e.target.value)} />

              <label htmlFor="khoa" className="form-label"><b>#Faculty</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"  value={faculty} 
                onChange={(e) => setUser(e.target.value)} />
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="cccd" className="form-label"><b>#Identity Card Number</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter" value={cccd} 
                onChange={(e) => setUser( e.target.value)} />

              <label htmlFor="ngaycapcccd" className="form-label"><b>#Date of issue of identity card</b></label>
              <input type="date" className="form-control" id="" placeholder="Enter" value={cccdDay} 
                onChange={(e) => setUser(e.target.value)} />
              
              <label htmlFor="noicapcccd" className="form-label"><b>#Place of issue of identity card</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter" value={cccdLocation} 
                onChange={(e) => setUser( e.target.value)} />
            </Col>
          </Row>
          <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
            <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
              Address Information
            </p>
          </div>
          <Row style={{ width: '96%', margin: '2% auto' }}>
            <Col sm={3}>
              <div style={{ paddingLeft: '1vh' }}>
                <label htmlFor="diachi" className="form-label"><b>#Address</b></label>
                <input type="text" className="form-control" id="diachi" placeholder="Enter"  value={address} 
                  onChange={(e) => setUser(e.target.value)} />
              </div>
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="sdt" className="form-label"><b>#Telephone Number</b></label>
              <input type="text" className="form-control" id="sdt" placeholder="Enter" value={phoneNumber} 
                onChange={(e) => setUser(e.target.value)} />
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="emailtruong" className="form-label"><b>#University Email</b></label>
              <input type="text" className="form-control" id="emailtruong" placeholder="Enter" value={email} 
                onChange={(e) => setUser( e.target.value)} />
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="email" className="form-label"><b>#Other Email</b></label>
              <input type="text" className="form-control" id="email" placeholder="Enter" value={personalEmail}
                onChange={(e) => setUser(e.target.value)} />
            </Col>
          </Row>
          <Button type="submit" onClick={handleSubmit} style={{marginLeft: '40em', backgroundColor: 'green', width: '10vh'}}>
            Save
          </Button>
        </Tab.Pane>

        <Tab.Pane eventKey='#training' style={{ borderTop: 'none' }}>
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

            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="" className="form-label"><b>#Year of Admission</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={yearOfAdmission} 
                onChange={(e) => setUser(e.target.value)} />
              
              <label htmlFor="" className="form-label"><b>#Training Time</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={trainingTime} 
                onChange={(e) => setUser( e.target.value)} />
              
              <label htmlFor="" className="form-label"><b>#Education Program</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={educationProgram} 
                onChange={(e) => setUser( e.target.value)} />
              
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              
              <label htmlFor="" className="form-label"><b>#Status</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={status} 
                onChange={(e) => setUser( e.target.value)} />
              
              <label htmlFor="" className="form-label"><b>#Expected number of semesters</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={expectSemester} 
                onChange={(e) => setUser(e.target.value)} />
              
              <label htmlFor="" className="form-label"><b>#Maximum Number of Semesters</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={maximumSemester} 
                onChange={(e) => setUser( e.target.value)} />
              
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="" className="form-label"><b>#Accumulate Academic Credits</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter" value={AAC} 
                onChange={(e) => setAAC( e.target.value)} />

              <label htmlFor="" className="form-label"><b>#GPA</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={GPA} 
                onChange={(e) => setGPA(e.target.value)} />
            </Col>
          </Row>
          <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
            <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
              Graduated Infomation
            </p>
          </div>
          <Row style={{ width: '96%', margin: '2% auto' }}>
            <Col sm={3}>
              <div style={{ paddingLeft: '1vh' }}>
                <label htmlFor="diachi" className="form-label"><b>#Major</b></label>
                <input type="text" className="form-control" id="diachi" placeholder="Enter" value={major} 
                  onChange={(e) => setMajor(e.target.value)} />
              </div>
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="sdt" className="form-label"><b>#Expected Graduation Date</b></label>
              <input type="text" className="form-control" id="sdt" placeholder="Enter" value={expectGraduationDate} 
                onChange={(e) => setExpectGraduationDate( e.target.value)} />
            </Col>
          </Row>
          <Button type="submit" onClick={handleSubmit} style={{marginLeft: '40em', backgroundColor: 'green', width: '10vh'}}>
            Save
          </Button>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}

export default EditStudent;
