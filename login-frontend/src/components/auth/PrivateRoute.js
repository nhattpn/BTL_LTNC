import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('jwtToken');
  const user = useSelector(state => state.admin?.adminData || state.user?.userData);

  const path = window.location.pathname.split('/');
  const loginUrl = '/' + path[1] + '/login';
  useEffect(() => {    
    if(!token || !user){
      navigate(loginUrl, {replace: true });
    }
    else{
      if(path[1] !== user.role){
        navigate('/' + user.role + '/dashboard');
      }
    }
  }, []);
  return(
    <Outlet/>
  )
}

export default PrivateRoutes