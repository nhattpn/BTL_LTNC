import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import { Avatar, CrossBar, DisplayMap } from '../../general/generalComponent';
import { Fields, TrainingFields } from '../../general/studentObj';
import { ViewContext } from '../../../pages/dashboardPage/StudentDashboard';
import { useSelector } from 'react-redux';
function InfoStudent() {
  const {currentView, setCurrentView} = useContext(ViewContext);
  const toggleSwitch = () => {
    setCurrentView(currentView === 'InfoStudent' ? 'EditStudent' : 'InfoStudent');
  }
  const fields = Fields;
  const trainingFields = TrainingFields;
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
      </Tab.Content>
    </Tab.Container>
  );
}

export default InfoStudent;
