import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';
import FirstHeader from './../components/header_footer/FirstHeader';
import FirstFooter from '../components/header_footer/FirstFooter';
import { firstBG } from '../components/image';

function FirstPage() {
  return (
    <>
      <div className='container-fluid' >
        <FirstHeader />
        <div style={{backgroundColor: 'rgb(58, 35, 35)'}}>
        <div style={{ height: '80vh', width: '188vh', backgroundImage: `url(${firstBG})`,backgroundRepeat: 'no-repeat', backgroundPositionX: 'center'}}>
          <div className="row justify-content-center" >
            <div className="col-md-12" style={{ justifyContent: 'center', width: '40%', paddingTop: '4%'}}>
              <h3 style={{ color: '#fff', justifyContent: 'center', fontWeight: 'bold' , textShadow: '2px 2px 5px black'}}>
                <p>QUALITY PROGRAM WITH DIVERSITY OF INDUSTRY</p>
              </h3>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div style={{ width: '22%', padding: '0%', borderColor: '#ebff00', borderStyle: 'solid', borderWidth: '1px', borderRadius: '20px' }}>
              <h4 style={{ color: '#ebff00', textAlign: 'center', padding: '1%'}}>
                Training Program
              </h4>
            </div>
          </div>
        </div> 
        </div>
        <FirstFooter/>
      </div>
    </>
  );
}

export default FirstPage;
