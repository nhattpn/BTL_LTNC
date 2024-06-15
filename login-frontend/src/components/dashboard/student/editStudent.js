import React, {useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import { Avatar, FormMap, CrossBar, handleSubmit } from '../../general/generalComponent';
import { StudentModel, Fields, TrainingFields} from '../../general/studentObj';
import { ViewContext } from '../../../pages/dashboardPage/StudentDashboard';
import { setUserData } from '../../../store/feature/userReducer';

function EditStudent() {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const {currentView, setCurrentView} = useContext(ViewContext);
  const toggleSwitch = () => {
    setCurrentView(currentView === 'InfoStudent' ? 'EditStudent' : 'InfoStudent');
  };

  const [formData, setFormData] = useState(StudentModel);
  const fields = Fields;
  const trainingFields = TrainingFields;

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

  const handleFormSubmit = (e) => {
    handleSubmit(e, 'student', formData, dispatch, setUserData); 
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
          <CrossBar content="Personal Infomation"/>
          <Row style={{ width: '96%', margin: 'auto' }}>
            <Avatar />
            <Col sm={9}>
              <FormMap fields={fields[0]} formData={formData} handleInputChange={handleInputChange} row={4}/>
            </Col>
          </Row>

        <CrossBar content="Address Infomation"/>
        <Row style={{ width: '96%', margin: 'auto' }}>
          <FormMap fields={fields[1]} formData={formData} handleInputChange={handleInputChange} row={3} />
        </Row>
        <Button type="submit" onClick={handleFormSubmit} style={{marginLeft: '40em', backgroundColor: 'green', width: '10vh'}}>
          Save
        </Button>
        </Tab.Pane>

        <Tab.Pane eventKey="#training" style={{ borderTop: 'none' }}>
          <CrossBar content="Training Infomation"/>
          <Row style={{ width: '96%', margin: 'auto' }}>
            <Avatar/>
            <Col sm={9}>
              <FormMap fields={trainingFields[0]} formData={formData} handleInputChange={handleInputChange} row={4} />
            </Col>            
          </Row>

          <CrossBar content="Graduated Infomation"/>
          <Row style={{ width: '96%', margin: 'auto' }}>
            <FormMap fields={trainingFields[1]} formData={formData} handleInputChange={handleInputChange} row={3} /> 
          </Row>
          <Button type="submit" onClick={handleFormSubmit} style={{marginLeft: '40em', backgroundColor: 'green', width: '10vh'}}>
            Save
          </Button>

        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}

export default EditStudent;
