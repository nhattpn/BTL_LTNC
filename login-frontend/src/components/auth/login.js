import React, { useState } from 'react';
import { useAuth } from '../../lib/useAuth'; // Assuming useAuth hook exists
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import { setUserData } from '../../store/feature/userReducer';

function Login(props) {
  const path = window.location.pathname.split('/');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Gọi hàm auth.login() và chờ phản hồi
      const response = await auth.login(email, password);
      if (response.message === "Login successful") {
        setErrorMsg(null);
        setSuccessMsg("Login successful!");
        dispatch(setUserData(response.userdata));
        navigate('/' + path[1] + '/dashboard');

      } else if(response.message === "Default password in use. Password change required."){
        setErrorMsg(response.message);
        setSuccessMsg(null);
        sessionStorage.clear();
        navigate('/' + path[1] + '/changepassword');
        window.location.reload();

      } else{
        setErrorMsg(response.message);
        setSuccessMsg(null);
      }
    } catch (error) {
      // Xử lý các lỗi xảy ra trong quá trình gọi auth.login()
      setErrorMsg(error?.message || "Error");
      console.error('Login error:', error.message);
    }
};

  return (
    <div className='login' style={{marginTop: '5vh'}}>
    {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
    {successMsg && <Alert severity="success">{successMsg}</Alert>}
      <form className='was-validated' onSubmit={handleLogin}>
        <label htmlFor="email">
          <input
            className="form-control"
            style={{ width: '40vh', height: '6vh'}}
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email" 
            required
          />
          <div className="valid-feedback">Valid</div>
          <div className="invalid-feedback">Please fill this field</div>
        </label>
        <label htmlFor="password">
          <input
            className="form-control"
            style={{ width: '40vh', height: '6vh'}} 
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password" 
            required
          />
          <div className="valid-feedback">Valid</div>
          <div className="invalid-feedback">Please fill this field</div>
        </label>
        <button style={{padding: '5%', width: '20vh', fontWeight: 'bold', color: 'bisque', margin: '2vh'}} className="btn btn-block bg-primary" type="submit" id="login">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

