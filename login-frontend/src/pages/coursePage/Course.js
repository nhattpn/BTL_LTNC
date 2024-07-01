import React, { useState, useEffect } from 'react';

import CourseHeader from '../../components/header_footer/CourseHeader';
import Footer from '../../components/header_footer/Footer';

function Course() {
  const course_bg = 'http://i.ibb.co/GVRnWJC/course-bg.jpg';
  
  return (
    <>
      <CourseHeader />
      <div style={{ height: '80vh', backgroundImage: `url(${course_bg})`, backgroundSize: 'cover', backgroundPositionX: 'center', backgroundRepeat: 'noRepeat' }}>
        <div style={{ marginTop: '0%', marginRight: 'auto', marginBottom: '0%', marginLeft: '15%', width: '50%', paddingTop: '2%', border: 'none' }}>
          <h1>CHĂM CHỈ DỄ DÀNG THÀNH CÔNG</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Course;