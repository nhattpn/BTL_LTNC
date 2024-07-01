import React, { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FirstHeader from './../components/header_footer/FirstHeader';
import FirstFooter from './../components/header_footer/FirstFooter';

const slide1 = 'https://i.ibb.co/RbNBFv1/8ktXyJ-n.jpg';

function FirstPage() {
  return (
    <>
      <FirstHeader />
      <div style={{ height: '75vh', backgroundImage: `url(${slide1})`, backgroundSize: 'cover', backgroundPositionX: 'center', backgroundRepeat: 'noRepeat' }}>
        <div style={{ marginTop: '0%', marginRight: '50%', marginBottom: '0%', marginLeft: '22%', width: '28%', padding: '0%', border: 'none', }}>
          <h2 style={{ color: '#fff', fontSize: '1.5em' }}>
            CHƯƠNG TRÌNH CHẤT LƯỢNG VỚI ĐA DẠNG NGÀNH
          </h2>
          <div style={{ marginTop: '1%', marginRight: '35%', marginBottom: '1%', marginLeft: '10%', width: '55%', padding: '0%', borderColor: '#ebff00', borderStyle: 'solid', borderWidth: '1px', borderRadius: '20px' }}>
            <h3 style={{ color: '#ebff00', textAlign: 'center', marginBlockStart: '3px', marginBlockEnd: '3px', fontSize: '1.17em' }}>
              Training Program
            </h3>
          </div>
        </div>
      </div>
      <FirstFooter/>
    </>
  );
}

export default FirstPage;
