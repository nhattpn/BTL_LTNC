import React, {useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ViewContext } from '../../../pages/dashboardPage/StudentDashboard';
import { setUserData } from '../../../store/feature/userReducer';

function EditStudent() {
  const jwtToken = sessionStorage.getItem('jwtToken');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  const {currentView, setCurrentView} = useContext(ViewContext);
  const toggleSwitch = () => {
    setCurrentView(currentView === 'InfoStudent' ? 'EditStudent' : 'InfoStudent');
  };

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
    training_info: {
      yearOfAdmission: '',
      trainingTime: '',
      educationProgram: '',
      status: '',
      expectSemester: '',
      maximumSemester: '',
      AAC: '',
      GPA: '',
      major: '',
      expectGraduationDate: '',
    }    
  });
  const fields = [[
    { name: 'name', label: '#Full Name', type: 'text' },
    { name: 'birthday', label: '#Day of Birth', type: 'date' },
    { name: 'cccd', label: '#Identity Card Number', type: 'text' },
    { name: 'mssv', label: '#Student ID', type: 'text', readOnly: true },
    { name: 'classId', label: '#Class', type: 'text' },
    { name: 'cccdDay', label: '#Date of issue of identity card', type: 'date' },
    { name: 'gender', label: '#Sex', type: 'radio' },
    { name: 'faculty', label: '#Faculty', type: 'text' },
    { name: 'cccdLocation', label: '#Place of issue of identity card', type: 'text' },
  ],[
    { name: 'address', label: '#Address', type: 'text' },
    { name: 'phoneNumber', label: '#Telephone Number', type: 'text' },
    { name: 'email', label: '#University Email', type: 'email' },
    { name: 'personalEmail', label: '#Other Email', type: 'email' },
  ]];
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

  useEffect(() => {
    setFormData(prevFormData => ({
      name: user.name,
      mssv: user.mssv,
      private_info: {
        ...prevFormData.private_info, 
        ...user.private_info
      },
      training_info: {
        ...prevFormData.training_info,
        ...user.training_info
      }
    }));
  }, [user]);

const handleInputChange = (event) => {
  const { name, value } = event.target;
  if(formData?.[name] !== undefined){
    setFormData({...formData, [name]: value});
  }
  else if (formData?.private_info?.[name] !== undefined ){ 
    setFormData({...formData, private_info: {...formData.private_info, [name]: value}});
  }
  else if (formData?.training_info?.[name] !== undefined ){
    setFormData({...formData, training_info: {...formData.training_info, [name]: value}});
  }
  else{
    console.log(formData?.training_info?.[name]);
  }
    
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
        body: JSON.stringify(user), // Sử dụng dữ liệu từ Redux store
      });

      if (response.ok) {

        dispatch(setUserData(formData));
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
          <div className="smallbox" >
            <p>
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
            <Col sm={9}>
              <Row>
              {fields[0] ////////personal info
                .map((field) => (
                  <Col sm={4} key={field.name} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)'}}>
                    <Form.Group controlId={`form${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`}>
                      <Form.Label><b>{field.label}</b></Form.Label>
                      <Form.Control
                        type={field.type}
                        placeholder="Enter"
                        name={field.name}
                        value={formData?.[field.name] || formData?.private_info?.[field.name] || ''}
                        onChange={handleInputChange}
                        readOnly={field.readOnly}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

        <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
          <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
            Address Information
          </p>
        </div>

        <Row>
          {fields[1]
            .map((field) => (
              <Col sm={3} key={field.name} style={{ paddingLeft: '1vh', borderLeft: field.name !== 'hovaten' ? '1px solid rgb(204, 203, 203)' : 'none' }}>
                <Form.Group controlId={`form${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`}>
                  <Form.Label><b>{field.label}</b></Form.Label>
                  <Form.Control
                    type={field.type}
                    placeholder="Enter"
                    name={field.name}
                    value={formData?.[field.name] || formData?.private_info?.[field.name] || ''}
                    onChange={handleInputChange}
                    readOnly={field.readOnly}
                  />
                </Form.Group>
              </Col>
            ))}        
        </Row>

        <Button type="submit" onClick={handleSubmit} style={{marginLeft: '40em', backgroundColor: 'green', width: '10vh'}}>
          Save
        </Button>
        </Tab.Pane>

        <Tab.Pane eventKey="#training" style={{ borderTop: 'none' }}>
          <div className="smallbox">
            <p>
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

            {trainingFields
              .map((field) => (
                <Col sm={3} key={field.name} style={{ paddingLeft: '1vh', borderLeft:'1px solid rgb(204, 203, 203)'}}>
                  <Form.Group controlId={`form${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`}>
                    <Form.Label><b>{field.label}</b></Form.Label>
                    <Form.Control
                      type={field.type}
                      placeholder="Enter"
                      name={field.name}
                      value={formData?.[field.name] || formData?.training_info?.[field.name] || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              ))}
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
