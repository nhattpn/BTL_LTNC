import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';

import { Avatar, FormMap, CrossBar } from '../../general/generalComponent';
import { handleSubmit as AdminHandleSubmit} from '../../API/admin/adminAPI';
import { handleSubmit as UserHandleSubmit } from '../../API/userAPI';
import { StudentModel, TrainingFields, Fields as StudentFields} from '../../general/studentModel';
import { TeacherModel, Fields as TeacherFields } from '../../general/teacherModel';
import { setUserData } from '../../../store/feature/userReducer';
import { setCurrentView } from '../../../store/feature/viewReducer';

function EditUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const loggin = useSelector((state) => state.user.isLoggin);
  const currentView = useSelector(state => state.view.currentView);

  const toggleSwitch = () => {
    dispatch(setCurrentView(currentView === 'InfoUser' ? 'EditUser' : 'InfoUser'));
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

  return (
    <div className="card">
          <div className="flex align-items-center justify-content-between ml-4 ">
            <i className="font-bold">Last updated time: {new Date().toLocaleString()}</i>
            {loggin && (
              <Button label={currentView === 'InfoUser' ? 'Edit' : 'View'} onClick={toggleSwitch} />
            )}
          </div>
      <TabView>
        <TabPanel header="Personal Information" className='pt-0'>
          <CrossBar content="Personal Information"/>
          <div className="grid">
            <Avatar />
            <div className="col-9">
              <FormMap fields={fields[0]} formData={formData} handleInputChange={handleInputChange} row={4}/>
            </div>
          </div>
          <CrossBar content="Address Information"/>
          <FormMap fields={fields[1]} formData={formData} handleInputChange={handleInputChange} row={3} />
          <div className="flex justify-content-center mt-3">
            <Button label="Save" onClick={handleSubmit} className="p-button-success" />
          </div>
        </TabPanel>

        {user.role === 'student' && (
          <TabPanel header="Training Information">
            <CrossBar content="Training Information"/>
            <div className="grid">
              <Avatar />
              <div className="col-9">
                <FormMap fields={trainingFields[0]} formData={formData} handleInputChange={handleInputChange} row={4} />
              </div>
            </div>
            <CrossBar content="Graduate Information"/>
            <FormMap fields={trainingFields[1]} formData={formData} handleInputChange={handleInputChange} row={3} />
            <div className="flex justify-content-center mt-3">
              <Button label="Save" onClick={handleSubmit} className="p-button-success" />
            </div>
          </TabPanel>
        )}
      </TabView>
    </div>
  );
}

export default EditUser;