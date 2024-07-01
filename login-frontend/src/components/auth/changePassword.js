import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth'; // Assuming useAuth hook exists
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom';
function ChangePassword(props) {
  const path = window.location.pathname.split('/');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypepass, setRetypepass] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
        if(password !== retypepass){
          setErrorMsg('Re-type password does not match your new password');
          setSuccessMsg(null);
          return;
        }
        const response = await auth.login(email, password);
        console.log("response data: ", response);
        if (response.message === "Password changed successfully.") {
          setErrorMsg(null);
          setSuccessMsg(response.message);
          sessionStorage.clear();
          navigate('/' + path[1] + '/login');
          window.location.reload();
        } else {
          setErrorMsg(response.message);
          setSuccessMsg(null);
        }
    } catch (error) {
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
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password" 
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
            placeholder="Re-type new password"
            value={retypepass}
            onChange={(e) => setRetypepass(e.target.value)}
            id="password" 
            required
          />
          <div className="valid-feedback">Valid</div>
          <div className="invalid-feedback">Please fill this field</div>
        </label>
        <button style={{padding: '5%', width: '20vh', fontWeight: 'bold', color: 'bisque', margin: '2vh'}} className="btn btn-block bg-primary" type="submit" id="login">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;

