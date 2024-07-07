import React, { useState } from 'react';
import { useAuth } from '../../lib/useAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogginOn as userLoggin } from '../../store/feature/userReducer';
import { LogginOn as adminLoggin} from '../../store/feature/adminReducer';
import { setCurrentView } from '../../store/feature/viewReducer';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';
import { FloatLabel } from 'primereact/floatlabel';

function AuthForm({ isChangePassword = false }) {
  const path = window.location.pathname.split('/');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypepass, setRetypepass] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isChangePassword) {
        if (password !== retypepass) {
          setErrorMsg('Re-type password does not match your new password');
          setSuccessMsg(null);
          return;
        }
      }

      const response = await auth.login(email, password);

      if (response.message === "Login successful" && !isChangePassword) {
        setErrorMsg(null);
        setSuccessMsg("Login successful!");
        const data = response.userdata;
        dispatch(data.role === "admin" ? adminLoggin(data) : userLoggin(data));
        dispatch(setCurrentView(data.role === "admin" ? "ListStudent" : "InfoUser"));
        navigate('/' + path[1] + '/dashboard');
      } else if (response.message === "Default password in use. Password change required." && !isChangePassword) {
        setErrorMsg(response.message);
        setSuccessMsg(null);
        sessionStorage.clear();
        navigate('/' + path[1] + '/changepassword');
        window.location.reload();
      } else if (response.message === "Password changed successfully." && isChangePassword) {
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
    <div className="card flex justify-content-center" style={{ marginTop: '5vh', marginBottom: '5vh'}}>
      {errorMsg && <Message severity="error" text={errorMsg} />}
      {successMsg && <Message severity="success" text={successMsg} />}
      <form onSubmit={handleSubmit} className="flex flex-column gap-2">
        <FloatLabel label="Email">
          <InputText id="email" value={email} placeholder='Enter' onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <FloatLabel label="Password">
          <Password id="password" value={password} placeholder='Enter' onChange={(e) => setPassword(e.target.value) } toggleMask required />
          <label htmlFor="email">Password</label>
        </FloatLabel>
        {isChangePassword && (
          <FloatLabel label="Re-type Password">
            <Password id="retypepass" value={retypepass} onChange={(e) => setRetypepass(e.target.value)} toggleMask required />
            <label htmlFor="retypepass">Re-type Password</label>
          </FloatLabel>
        )}
        <Button type="submit" label={isChangePassword ? "Change Password" : "Login"} className="mt-2" />
      </form>
    </div>
  );
}

export function Login() {
  return <AuthForm isChangePassword={false} />;
}

export function ChangePassword() {
  return <AuthForm isChangePassword={true} />;
}