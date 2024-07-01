import React, { useEffect, useState } from 'react';
import { AuthProvider } from '../context/authContext';
import Login from '../components/auth/login';
import ChangePassword from './../components/auth/changePassword';

const authBG = "https://i.ibb.co/9YFh3Tn/lhuEjVn.jpg";
const logo = "https://i.ibb.co/CMwkBmw/lSgDz8N.png";

function App() {
  const [authType, setAuthType] = useState('Login');

  useEffect(() => {
    const pathname = window.location.pathname;
    
    const regex = /\/(login|changepassword)/g;
    const match = pathname.match(regex);
    if(match[0] === '/login'){
      setAuthType('Login');
    }
    else if(match[0] === '/changepassword'){
      setAuthType('ChangePassword');
    }
  }, []);
  const switchToChangePassword = () => {
    switch (authType){
      case 'Login': return <Login/>;
      case 'ChangePassword': return <ChangePassword />;
    }
  }
  return (<>
    <AuthProvider>
      <div
        className="container-fluid text-center"
        style={{
          margin: '0',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          webkitFontSmoothing: 'antialiased',
          mozOsxFontSmoothing: 'grayscale',
          backgroundImage: `url(${authBG})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="row">
          <div
            style={{ width: '25%', height: '100vh', backgroundColor: 'rgb(62, 161, 168)' }}
          >
            <div>
              <a href='/'><img className="img-thumbnail no-gutter" id="logo" alt="" src={logo} /></a>
              <h1 style={{marginTop: '5vh'}}>Welcome</h1>
              {switchToChangePassword()}
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
    </>
  );
}

export default App;

