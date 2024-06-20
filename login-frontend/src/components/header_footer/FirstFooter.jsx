import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function FirstFooter() {
  return (
    <>
    <div className="foot" style={{ color: '#13f7ce', height: '30vh', margin: '0'}}>
      <div  className="row justify-content-center" style={{paddingTop: '12vh'}}>
        <div className ="col-md-2 justify-content-center" >
          <div style={{width: '35%', height: '50%', backgroundColor: 'blueviolet', borderRadius: '50%' }}>
            <i className="fas fa-solid fa-phone fa-2x" style={{ color: 'white' }}></i>
          </div>
          <div>
            <p style={{ color: 'white ' }}>
              (+84)123456789
            </p>
          </div>
        </div>
        <div className ="col-md-2" >
          <div style={{width: '35%', height: '50%', backgroundColor: 'blueviolet', borderRadius: '50%' }}>
            <i className="fas fa-regular fa-envelope fa-2x" style={{color: 'white' }}></i>
          </div>
          <div>
            <p style={{ color: 'white ' }}>
              info@mut.edu.vn
            </p>
          </div>
        </div>
        <div className ="col-md-2" >
          <div style={{width: '35%', height: '50%', backgroundColor: 'blueviolet', borderRadius: '50%' }}>
            <i className="fas fa-solid fa-location-dot fa-2x" style={{color: 'white' }}></i>
          </div>
          <div>
            <p style={{ color: 'white ' }}>
              xyz, Quận 1, Tp.HCM
            </p>
          </div>
        </div>

        <div className ="col-md-2 justify-content-center" >
          <div style={{width: '35%', height: '50%', backgroundColor: 'white', borderRadius: '50%' }}>
            <i className="fas fa-solid fa-paper-plane fa-2x" style={{ color: 'blueviolet' }}></i>
          </div>
          <div>
            <p style={{ color: 'white '}}>
              Contact us
            </p>
          </div>
        </div>
        <div className ="col-md-2" style={{ textAlign: 'left' }}>
          <p style={{ color: 'white' }}>ABOUT US</p>
          <p style={{ color: '#13f7ce' }}>Developed team</p>
          <p style={{ color: '#13f7ce' }}>University</p>
        </div>
      </div>
      <div className='row justify-content-center'>
        <h5 style={{ color: 'white', padding: '1vh', margin: '0'}}>
          Copyright &copy; 2024
        </h5>
      </div>
    </div>
    </>
  );
}

export default FirstFooter;