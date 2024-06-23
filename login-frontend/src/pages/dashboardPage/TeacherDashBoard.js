import React, { useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import InfoUser from '../../components/dashboard/primaryFeature/infoUser';
import EditUser from '../../components/dashboard/primaryFeature/editUser';
import TeacherSchedule from '../../components/dashboard/scheduleComponent/teacherSchedule';

import TeacherHeader from '../../components/header_footer/TeacherHeader';
import Footer from '../../components/header_footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import {setView} from '../../store/feature/userReducer'

function DataTable() {
  const dispatch = useDispatch();
  const currentView = useSelector(state => state.user.view);
  const handleNavigation = (viewName) => {
    dispatch(setView(viewName));
  };
  
  return (
    <div>
      <TeacherHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 leftBody">
            <ul className="nav flex-column">
              <li className="nav-item" style={{ marginTop: '2rem', cursor: 'pointer' }}>
                <div onClick={() => handleNavigation('Info')}>
                    <i className="fa-regular fa-address-book fa-2x"></i> Personal
                </div>
              </li>
              <li className="nav-item" style={{ marginTop: '2rem', cursor: 'pointer'}}>
                <div onClick={() => handleNavigation('TeacherSchedule')}>
                    <i className="fa-brands fa-blackberry fa-2x"></i> Schedule
                </div>
              </li>
            </ul>
          </div>
          <div className="col-md-10 rightBody">
            <div className="dataTable mx-auto">
                {currentView === 'Info' && <InfoUser />}
                {currentView === 'Edit' && <EditUser />}
                {currentView === 'TeacherSchedule' && <TeacherSchedule />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DataTable;
