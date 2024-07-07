import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';

import { Avatar, CrossBar, DisplayMap } from '../../general/generalComponent';
import { TrainingFields, Fields as StudentFields} from '../../general/studentModel';
import { Fields as TeacherFields } from '../../general/teacherModel';
import { setCurrentView } from '../../../store/feature/viewReducer';

function InfoUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const currentView = useSelector(state => state.view.currentView);

  const toggleSwitch = () => {
    dispatch(setCurrentView(currentView === 'InfoUser' ? 'EditUser' : 'InfoUser'));
  }

  const fields = (user.role === 'student') ? StudentFields : TeacherFields;
  const trainingFields = (user.role === 'student') ? TrainingFields : [];

  return (
    <div className="card">      
          <div className="flex align-items-center justify-content-between">
            <i className="font-bold ml-4">Last updated time: {new Date().toLocaleString()}</i>
            <Button label={currentView === 'InfoUser' ? 'Edit' : 'View'} onClick={toggleSwitch} />
          </div>

      <TabView >
        <TabPanel header="Personal Information" className='pt-0'>
          <CrossBar content="Personal Information"/>
          <div className="grid">
            <Avatar />
            <div className="col-9">
              <DisplayMap fields={fields[0]} row={4} />
            </div>
          </div>
          <CrossBar content="Address Information"/>
          <DisplayMap fields={fields[1]} row={3} />
        </TabPanel>

        {user.role === 'student' && (
          <TabPanel header="Training Information">
            <CrossBar content="Training Information"/>
            <div className="grid">
              <Avatar />
              <div className="col-9">
                <DisplayMap fields={trainingFields[0]} row={4} />
              </div>
            </div>
            <CrossBar content="Graduate Information"/>
            <DisplayMap fields={trainingFields[1]} row={3} />
          </TabPanel>
        )}
      </TabView>
    </div>
  );
}

export default InfoUser;
