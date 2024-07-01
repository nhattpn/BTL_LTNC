import  {useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './../../styles/Dashboard.css';

import InfoUser from '../../components/dashboard/primaryFeature/infoUser';
import EditUser from '../../components/dashboard/primaryFeature/editUser';
import StudentSchedule from '../../components/dashboard/scheduleComponent/studentSchedule';

import UserHeader from '../../components/header_footer/UserHeader';
import Footer from '../../components/header_footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import {setView} from '../../store/feature/userReducer'

function DataTable() {
  
  const dispatch = useDispatch();
  const currentView = useSelector(state => state.user.view);
  const handleNavigation = (viewName) => {
    dispatch(setView(viewName));
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <UserHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 leftBody">
            <ul className="nav flex-column">
              <li className="nav-item" style={{ marginTop: '2rem', cursor: 'pointer' }}>
                <div onClick={() => handleNavigation('Info')}>
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
                <div onClick={() => handleNavigation('StudentSchedule')}>
                  <i class="fa-solid fa-calendar-days fa-md fa-2x"></i>Schedule
                </div>
              </li>
            </ul>
          </div>

          <div className="col-md-10 rightBody">
            <div className="dataTable mx-auto">
                {currentView === 'Info' && <InfoUser />}
                {currentView === 'Edit' && <EditUser />}
                {currentView === 'StudentSchedule' && <StudentSchedule />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DataTable;
