import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function FirstFooter() {
  return (
    <>
    <footer style={{ marginTop: '0%', height: '100%', backgroundColor: '#0b3942', display: 'flex', textAlign: 'center' }}>
        <div style={{ marginLeft: '8%', width: '12%' }}>
          <div style={{ marginTop: '30%', marginRight: '30%', marginLeft: '30%', width: '40%', height: '40%', backgroundColor: 'blueviolet', borderRadius: '50%' }}>
            <i className="fas fa-solid fa-phone fa-2x" style={{ marginTop: '25%', color: 'white' }}></i>
          </div>
          <div>
            <p style={{ color: 'white ', marginTop: '1rem' }}>
              (+84)123456789
            </p>
          </div>
        </div>
        <div style={{ marginLeft: '3%', width: '12%' }}>
          <div style={{ marginTop: '30%', marginRight: '30%', marginLeft: '30%', width: '40%', height: '40%', backgroundColor: 'blueviolet', borderRadius: '50%' }}>
            <i className="fas fa-regular fa-envelope fa-2x" style={{ marginTop: '25%', color: 'white' }}></i>
          </div>
          <div>
            <p style={{ color: 'white ', marginTop: '1rem' }}>
              info@mut.edu.vn
            </p>
          </div>
        </div>
        <div style={{ marginLeft: '3%', width: '12%' }}>
          <div style={{ marginTop: '30%', marginRight: '30%', marginLeft: '30%', width: '40%', height: '40%', backgroundColor: 'blueviolet', borderRadius: '50%' }}>
            <i className="fas fa-solid fa-location-dot fa-2x" style={{ marginTop: '25%', color: 'white' }}></i>
          </div>
          <div>
            <p style={{ color: 'white ', marginTop: '1rem' }}>
              xyz, Quận 1, Tp.HCM
            </p>
          </div>
        </div>

        <div style={{ marginLeft: '4%', width: '12%' }}>
          <div style={{ marginTop: '30%', marginRight: '30%', marginLeft: '30%', width: '40%', height: '40%', backgroundColor: 'white', borderRadius: '50%' }}>
            <i className="fas fa-solid fa-paper-plane fa-2x" style={{ marginTop: '25%', color: 'blueviolet' }}></i>
          </div>
          <div>
            <p style={{ color: 'white ', marginTop: '1rem' }}>
              Contact us
            </p>
          </div>
        </div>
        <div style={{ marginLeft: '4%', width: '11%', textAlign: 'left' }}>
          <p style={{ color: 'white', marginTop: '1rem' }}>ABOUT US</p>
          <p style={{ color: '#13f7ce' }}>Developed team</p>
          <p style={{ color: '#13f7ce' }}>University</p>
        </div>

        <div style={{ marginLeft: '9%', marginTop: '8%' }}>
          <p style={{ color: 'white', marginTop: '1rem' }}>
            Copyright &copy; 2024
          </p>
        </div>
    </footer>
    </>
  );
}

export default FirstFooter;