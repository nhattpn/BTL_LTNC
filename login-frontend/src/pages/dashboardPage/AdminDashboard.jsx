import {Suspense, createContext, lazy, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import UserHeader from '../../components/header_footer/UserHeader';
import Footer from '../../components/header_footer/Footer';

const ListUser = lazy(() => import('../../components/dashboard/primaryFeature/listUser'));
const EditUser = lazy(() => import('../../components/dashboard/primaryFeature/editUser'));
const DashBoard = lazy(() => import('../../components/dashboard/scheduleComponent/dashboardAdmin'));

export const ViewContext = createContext();
function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentView, setCurrentView] = useState('Student');
    
  const renderTableData = () => {
    switch (currentView){
      case 'Student': return <ListUser type="student" />;
      case 'Teacher': return <ListUser type="teacher" />; 
      case 'AdminEditStudent': return <EditUser />;
      case 'AdminEditTeacher': return <EditUser />;
      case 'DashBoard': return <DashBoard />;
      default: return; 
    }
  };
  return (
    <>
      <UserHeader />
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
                      <Link to={'/admin/dashboard'} onClick={() => setCurrentView('Student')} className={`linkbar ${currentView === 'Student' ? 'greentext' : ''}`} >
                        Student 
                      </Link>
                  </ol>
                  <ol className="nav-item" style={{ paddingTop: '2rem' }}>
                      <Link to={'/admin/dashboard'} onClick={() => {setCurrentView('Teacher')}} className={`linkbar ${currentView === 'Teacher' ? 'greentext' : ''}`} >
                        Teacher
                      </Link>
                  </ol>
                </ul>
              )}
              <li className="nav-item" style={{ paddingTop: '2rem' }}>
                <Link to='/admin/dashboard' onClick={() => {setCurrentView('DashBoard')}} className={`linkbar ${currentView === 'DashBoard' ? 'greentext' : ''}`}>
                  <i className="fa-brands fa-blackberry fa-2x"></i> 
                  <span > Dashboard </span>
                </Link> 
              </li>
            </ul>
          </div>
          <div className='col-md-10 rightBody'>
            <div className="dataTable mx-auto">
              <Suspense fallback={<div>Loading...</div>}>
                <ViewContext.Provider value={{currentView, setCurrentView}} >
                  { renderTableData() }
                </ViewContext.Provider>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;

