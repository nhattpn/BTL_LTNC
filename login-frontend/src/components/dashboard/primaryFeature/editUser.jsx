import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';

import { Avatar, FormMap, CrossBar } from '../../general/generalComponent';
import { handleSubmit as AdminHandleSubmit} from '../../API/admin/adminAPI';
import { handleSubmit as UserHandleSubmit } from '../../API/userAPI';
import { StudentModel, TrainingFields, Fields as StudentFields} from '../../general/studentModel';
import { TeacherModel, Fields as TeacherFields } from '../../general/teacherModel';
import { setView, setUserData } from '../../../store/feature/userReducer';

function EditUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const loggin = useSelector((state) => state.user.isLoggin);
  const currentView = useSelector(state => state.user.view);

  const toggleSwitch = () => {
    dispatch(setView(currentView === 'Info' ? 'Edit' : 'Info'));
  };

  const [formData, setFormData] = useState(
    user.role === 'student' ? StudentModel : TeacherModel
  );
  const fields = user.role === 'student' ? StudentFields : TeacherFields;
  const trainingFields = user.role === 'student' ? TrainingFields : [];

  useEffect(() => {
    setFormData(prevFormData => ({
      name: user.name,
      userId: user.userId,
      role: user.role,
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
    let newVal = value;

    if(formData?.[name] !== undefined){
      setFormData({...formData, [name]: newVal});
    }
    else if (formData?.private_info?.[name] !== undefined ){ 
      setFormData({...formData, private_info: {...formData.private_info, [name]: newVal}});
    }
    else if (formData?.training_info?.[name] !== undefined ){
      setFormData({...formData, training_info: {...formData.training_info, [name]: newVal}});
    }
    else{
      console.log(formData?.training_info?.[name]);
    }
  };

  const updateUser = () => {
    dispatch(setUserData(formData));
  };
  
  const handleSubmit = (e) => {
    if(!loggin) AdminHandleSubmit(e, formData, updateUser);
    else UserHandleSubmit(e, formData, updateUser);
  };

  return(
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
      { loggin && ( 
          <Button onClick={toggleSwitch} style={{marginLeft :'100vh', marginRight: '1vh'}}>Edit</Button>
      )}
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
        <Button type="submit" onClick={e => handleSubmit(e)} style={{marginLeft: '40em', backgroundColor: 'green', width: '10vh'}}>
          Save
        </Button>
        </Tab.Pane>

        {user.role === 'student' && (
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
            <Button type="submit" onClick={(e) => handleSubmit(e)} style={{marginLeft: '40em', backgroundColor: 'green', width: '10vh'}}>
              Save
            </Button>
          </Tab.Pane>
        )}
      </Tab.Content>
    </Tab.Container>
  );
}

export default EditUser;
