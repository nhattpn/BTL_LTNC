import { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, CrossBar, DisplayMap } from '../general/generalComponent';
import { StudentModel, TrainingFields, Fields as StudentFields} from '../general/studentObj';
import { TeacherModel, Fields as TeacherFields } from '../general/teacherObj';
import {setView} from '../../store/feature/userReducer'

function InfoUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const currentView = useSelector(state => state.user.view);

  const toggleSwitch = () => {
    dispatch(setView(currentView === 'Info' ? 'Edit' : 'Info'));
  }

  const fields = user.role === 'student' ? StudentFields : TeacherFields;
  const trainingFields = user.role === 'student' ? TrainingFields : [];

  return (
    <Tab.Container defaultActiveKey={'#info'}>
      <ListGroup style={{ marginTop: '2%', flexDirection: 'row' }}>
        <ListGroup.Item action href="#info" style={{ width: '25%' }}>
          <b>Personal Information</b>
        </ListGroup.Item>
        {user.role === 'student' && (
          <ListGroup.Item action href="#training" style={{ width: '25%' }}>
            <b>Training Information</b>
          </ListGroup.Item>
        )}
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
              <DisplayMap fields={fields[0]} row={4}/>
            </Col>
          </Row>

          <CrossBar content="Address Infomation"/>
          <Row style={{ width: '96%', margin: 'auto' }}>
            <DisplayMap fields={fields[1]} row={3}/>
          </Row>
        </Tab.Pane>

        {user.role === 'student' && (
          <Tab.Pane eventKey='#training' style={{ borderTop: 'none' }}>
            < CrossBar content="Training Infomation"/>
            <Row style={{ width: '96%', margin: 'auto' }}>
              <Avatar />
              <Col sm={9}>
                <DisplayMap fields={trainingFields[0]} row={4}/>
              </Col>
            </Row>

            <CrossBar content="Graduate Infomation"/>
            <Row style={{ width: '96%', margin: 'auto' }}>
              <DisplayMap fields={trainingFields[1]} row={3}/>
            </Row>
          </Tab.Pane>
        )}
      </Tab.Content>
    </Tab.Container>
  );
}

export default InfoUser;
