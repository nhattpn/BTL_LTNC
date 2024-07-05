import { useEffect, useState } from 'react';
import { AuthProvider } from '../lib/authContext';
import { Login, ChangePassword } from '../components/auth/authForm';
import { logo } from '../components/image';
import { authBG } from '../components/image';
import { Image } from 'primereact/image';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
      default: return;
    }
  }
  return (<>
    <AuthProvider>
      <div className="h-screen flex justify-content-center align-items-center" style={{ backgroundImage: `url(${authBG})`, backgroundSize: 'cover' }}> 
        <Card className="col-3 fadeindown animation-duration-1000 h-auto bg-white-alpha-40 flex justify-content-center align-items-center border-double border-4 border-primary">
            <div className="bg-white-100">
              <Link to="/">
                <Image src={logo} alt="Logo" width="350"  />
              </Link>
            </div>
            <h1 className="text-3xl mt-4 font-bold text-center">Welcome</h1>
            {switchToChangePassword()}
        </Card>
      </div>
    </AuthProvider>
    </>
  );
}

export default App;

