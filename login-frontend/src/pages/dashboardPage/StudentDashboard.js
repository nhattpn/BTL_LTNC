import React, {createContext, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Dashboard.css';

import InfoStudent from '../../components/dashboard/student/infoStudent';
import EditStudent from '../../components/dashboard/student/editStudent';
import Schedule from '../../components/dashboard/student/scheduleStudent';

import StudentHeader from '../../components/header_footer/StudentHeader';
import Footer from '../../components/header_footer/Footer';

export const ViewContext = createContext();
function DataTable() {
  
  const [currentView, setCurrentView] = useState('InfoStudent');
  const handleNavigation = (viewName) => {
    setCurrentView(viewName);
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <StudentHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 leftBody">
            <ul className="nav flex-column">
              <li className="nav-item" style={{ marginTop: '2rem', cursor: 'pointer' }}>
                <div onClick={() => handleNavigation('InfoStudent')}>
                    <i className="fa-regular fa-address-book fa-2x"></i> Personal
                </div>
              </li>
              <li className="nav-item" style={{ marginTop: '2rem', cursor: 'pointer'}} onClick={() => setIsOpen(!isOpen)}>
                <i className="fa fa-solid fa-book fa-md fa-2x"></i>  Study
                <i className="fa-solid fa-angles-down"></i>
                {isOpen && (
                  <ul>      
                    <li className="nav-item" style={{ paddingTop: '2rem' }}>
                      <Link to={'/student/course'} style={{ color: 'white', padding: '0', textDecoration: 'none'}}>Course</Link>
                    </li>
                    <li className="nav-item" style={{ paddingTop: '2rem' }}>
                      <Link to={'/student/courseRegistration'} style={{ color: 'white', padding: '0', textDecoration: 'none'}}>Course registration</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item" style={{ paddingTop: '2rem', cursor: 'pointer' }}>
                <div onClick={() => handleNavigation('Schedule')}>
                  <i class="fa-solid fa-calendar-days fa-md fa-2x"></i>Schedule
                </div>
              </li>
            </ul>
          </div>

          <div className="col-md-10 rightBody">
            <div className="dataTable mx-auto">
              <ViewContext.Provider value={{currentView, setCurrentView}} >
                {currentView === 'InfoStudent' && <InfoStudent />}
                {currentView === 'EditStudent' && <EditStudent />}
                {currentView === 'Schedule' && <Schedule />}
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
