import React, {createContext, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import InfoTeacher from '../../components/dashboard/teacher/infoTeacher';
import TeacherSchedule from '../../components/dashboard/teacher/teacherSchedule';
import EditTeacher from '../../components/dashboard/teacher/editTeacher';

import TeacherHeader from '../../components/header_footer/TeacherHeader';
import Footer from '../../components/header_footer/Footer';

export const ViewContext = createContext();
function DataTable() {
  const [currentView, setCurrentView] = useState('InfoTeacher');
  const handleNavigation = (viewName) => {
    setCurrentView(viewName);
  };
  
  return (
    <div>
      <TeacherHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 leftBody">
            <ul className="nav flex-column">
              <li className="nav-item" style={{ marginTop: '2rem', cursor: 'pointer' }}>
                <a onClick={() => handleNavigation('InfoTeacher')}>
                    <i className="fa-regular fa-address-book fa-2x"></i> Personal
                </a>
              </li>
              <li className="nav-item" style={{ marginTop: '2rem', cursor: 'pointer'}}>
                <a onClick={() => handleNavigation('TeacherSchedule')}>
                    <i className="fa-brands fa-blackberry fa-2x"></i> Schedule
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-10 rightBody">
            <div className="dataTable mx-auto">
              <ViewContext.Provider value={{currentView, setCurrentView}} >
                {currentView === 'InfoTeacher' && <InfoTeacher />}
                {currentView === 'EditTeacher' && <EditTeacher />}
                {currentView === 'TeacherSchedule' && <TeacherSchedule />}
              </ViewContext.Provider>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DataTable;
