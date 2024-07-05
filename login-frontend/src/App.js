import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './config/Dashboard.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import PrivateRoute from './components/auth/PrivateRoute';

// Lazy load các component
const Course = lazy(() => import('./pages/coursePage/Course'));
const MyCourse = lazy(() => import('./pages/coursePage/MyCourse'));
const CourseRegistration = lazy(() => import('./pages/coursePage/CourseRegistration'));
const DashBoard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/teacher/login' element={<AuthPage />} />
          <Route path='/student/login' element={<AuthPage />} />
          <Route path='/admin/login' element={<AuthPage />} />
          <Route path='/teacher/changepassword' element={<AuthPage />} />
          <Route path='/student/changepassword' element={<AuthPage />} />
          <Route path='/admin/changepassword' element={<AuthPage />} />

          <Route element={<PrivateRoute />} >
            <Route path='/teacher/dashboard' element={<DashBoard />} />
            <Route path='/student/dashboard' element={<DashBoard />} />
            <Route path='/admin/dashboard' element={<DashBoard />} />
            <Route path='/student/course' element={<Course />} />
            <Route path='/student/mycourse' element={<MyCourse />} />
            <Route path='/student/courseRegistration' element={<CourseRegistration />} />
            
            <Route path='/admin/dashboard/student/:studentid' element={<DashBoard />} />
            <Route path='/admin/dashboard/teacher/:teacherid' element={<DashBoard />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
