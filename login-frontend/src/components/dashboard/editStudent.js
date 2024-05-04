import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import { ViewContext } from '../../pages/dashboardPage/StudentDashboard';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
function EditStudent() {
  const {currentView, setCurrentView} = useContext(ViewContext);
  const toggleSwitch = () => {
    setCurrentView(currentView === 'StudentInfo' ? 'EditStudent' : 'StudentInfo');
  }
  const [formData, setFormData] = useState({
    name: '',
    mssv: '',
    private_info: {
      gender: 'O',
      birthday: '',
      classId: '',
      faculty: '',
      cccd: '',
      cccdDay: '',
      cccdLocation: '',
      address: '',
      phoneNumber: '',
      email: '',
      personalEmail: '',
    },
    training_info: ''    
  });
  const jwtToken = sessionStorage.getItem('jwtToken');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/student/dashboard/thongtinsinhvien`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Update successfully');
        alert('Update successfully.');
      } else {
        console.error('Failed to update student');
        alert('Failed to update student!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const userdata = sessionStorage.getItem('userdata');
    if(userdata){
      const retrivedata = JSON.parse(userdata);
      setFormData({...formData, ...retrivedata});
    }
  }, [])
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
              <input type="text" className="form-control" id="hovaten" placeholder="Nhập Họ & tên" aria-label="Họ & tên" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />

              <label htmlFor="mssv" className="form-label"><b>#Student ID</b></label>
              <input type="text" className="form-control" id="mssv" placeholder="Nhập Mã số sinh viên" aria-label="Mã số sinh viên" value={formData.mssv} onChange={(e) => setFormData({...formData, mssv: e.target.value})} />

              <div style={{ marginBottom: '6px' }}>
                <p style={{ fontWeight: 'bold' }}>#Sex</p>
                <input className="form-check-input" type="radio" name="gioitinh" id="nam" value='M' checked={formData.private_info.gender === 'M'} onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, gender: e.target.value}} )} />
                <label className="form-check-label" htmlFor="nam">
                  Male
                </label>
                <input className="form-check-input" type="radio" name="gioitinh" id="nu" value='F' checked={formData.private_info.gender === 'F'} onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, gender: e.target.value}} )} />
                <label className="form-check-label" htmlFor="nu">
                  Female
                </label>
                <input className="form-check-input" type="radio" name="gioitinh" id="khac" value='O' checked={formData.private_info.gender === 'O'} onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, gender: e.target.value}} )} />
                <label className="form-check-label" htmlFor="khac">
                  Other
                </label>
              </div>

            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="ngaysinh" className="form-label"><b>#Day of Births</b></label>
              <input type="date" className="form-control" id="ngaysinh" value={formData.private_info.birthday} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, birthday: e.target.value}} )} />

              <label htmlFor="malop" className="form-label"><b>#Class</b></label>
              <input type="text" className="form-control" id="malop" placeholder="Nhập Mã lớp" aria-label="Mã lớp" value={formData.private_info.classId} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, classId: e.target.value}} )} />

              <label htmlFor="khoa" className="form-label"><b>#Faculty</b></label>
              <input type="text" className="form-control" id="khoa" placeholder="Nhập Khoa" aria-label="Khoa" value={formData.private_info.faculty} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, faculty: e.target.value}} )} />
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="cccd" className="form-label"><b>#Identity Card Number</b></label>
              <input type="text" className="form-control" id="cccd" placeholder="Nhập Số CCCD" aria-label="Số CCCD" value={formData.private_info.cccd} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, cccd: e.target.value}} )} />

              <label htmlFor="ngaycapcccd" className="form-label"><b>#Date of issue of identity card</b></label>
              <input type="date" className="form-control" id="ngaycapcccd" value={formData.private_info.cccdDay} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, cccdDay: e.target.value}} )} />
              
              <label htmlFor="noicapcccd" className="form-label"><b>#Place of issue of identity card</b></label>
              <input type="text" className="form-control" id="noicapcccd" placeholder="Nhập Nơi cấp CCCD" aria-label="Nơi cấp CCCD" value={formData.private_info.cccdLocation} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, cccdLocation: e.target.value}} )} />
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
                <input type="text" className="form-control" id="diachi" placeholder="Nhập Địa chỉ" aria-label="Địa chỉ" value={formData.private_info.address} 
                  onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, address: e.target.value}} )} />
              </div>
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="sdt" className="form-label"><b>#Telephone Number</b></label>
              <input type="text" className="form-control" id="sdt" placeholder="Nhập Số điện thoại" aria-label="Số điện thoại" value={formData.private_info.phoneNumber} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, phoneNumber: e.target.value}} )} />
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="emailtruong" className="form-label"><b>#University Email</b></label>
              <input type="text" className="form-control" id="emailtruong" placeholder="Nhập Email trường" aria-label="Email trường" value={formData.private_info.email} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, email: e.target.value}} )} />
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="email" className="form-label"><b>#Other Email</b></label>
              <input type="text" className="form-control" id="email" placeholder="Nhập Email liên lạc" aria-label="Em#Email liên lạc" value={formData.private_info.personalEmail}
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, personalEmail: e.target.value}} )} />
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
          <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
            <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
              Graduated Infomation
            </p>
          </div>
          <Button type="submit" onClick={handleSubmit} style={{marginLeft: '40em', backgroundColor: 'green', width: '10vh'}}>
            Save
          </Button>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}

export default EditStudent;