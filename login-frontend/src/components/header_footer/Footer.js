import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="text-center foot" style={{ color: '#13f7ce'}} >
        <p style={{ paddingTop: '2vh', margin: 0 }}>
          Copyright &copy; 2024 | All rights reserved
        </p>
        <p style={{ padding: '1vh', margin: 0 }}>
          Mọi thắc mắc vui lòng liên hệ email: info@mut.edu.vn
        </p>
      </footer>
    </>
  );
}

export default Footer;