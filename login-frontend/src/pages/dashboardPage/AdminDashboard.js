import React, {createContext, useContext, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ListUser from '../../components/dashboard/admin/listUser';
import AdminEditStudent from '../../components/dashboard/admin/adminEditStudent';
import AdminEditTeacher from '../../components/dashboard/admin/adminEditTeacher';
import DashBoard from '../../components/dashboard/admin/dashboardAdmin';
import AdminHeader from '../../components/header_footer/AdminHeader';
import Footer from '../../components/header_footer/Footer';

export const ViewContext = createContext();
function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentView, setCurrentView] = useState('Student');
    
  const renderTableData = () => {
    switch (currentView){
      case 'Student': return <ListUser type="student" />;
      case 'Teacher': return <ListUser type="teacher" />; 
      case 'AdminEditStudent': return <AdminEditStudent />;
      case 'AdminEditTeacher': return <AdminEditTeacher />;
      case 'DashBoard': return <DashBoard />;
      default: return; 
    }
  }
  return (
    <>
      <AdminHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 leftBody">
            <ul className="nav flex-column">
              <li className="nav-item" style={{ paddingTop: '2rem', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
                  <i className="fas fa-regular fa-id-badge fa-md fa-2x"></i> User Information
                  <i className="fa-solid fa-angles-down"></i>
              </li>
              {isOpen && (
                <ul>
                  <ol className="nav-item" style={{ paddingTop: '2rem' }}>
                      <p onClick={() => setCurrentView('Student')} className={currentView === 'Student' && 'greentext'} style={{ marginBottom: '0', cursor: 'pointer' }}>
                        Student
                      </p>
                  </ol>
                  <ol className="nav-item" style={{ paddingTop: '2rem' }}>
                      <p onClick={() => {setCurrentView('Teacher')}} className={currentView === 'Teacher' && 'greentext'} style={{ marginBottom: '0', cursor: 'pointer' }}>
                        Teacher
                      </p>
                  </ol>
                </ul>
              )}
              <li className="nav-item" style={{ paddingTop: '2rem' }}>
                <Link to='/admin/dashboard' style={{ color: 'white', padding: '0', textDecoration: 'none' }}>
                  <i className="fa-brands fa-blackberry fa-2x"></i> 
                  <span onClick={() => {setCurrentView('DashBoard')}} className={currentView === 'DashBoard' && 'greentext'}> Dashboard </span>
                </Link> 
              </li>
            </ul>
          </div>
          <div className='col-md-10 rightBody'>
            <div className="dataTable mx-auto">
              <ViewContext.Provider value={{currentView, setCurrentView}} >
                {renderTableData()}
              </ViewContext.Provider>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;

