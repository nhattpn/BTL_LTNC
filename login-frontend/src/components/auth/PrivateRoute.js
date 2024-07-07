import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = sessionStorage.getItem('jwtToken');
  const user = useSelector(state => state.admin?.adminData || state.user?.userData);

  const path = window.location.pathname.split('/');
  const loginUrl = '/' + path[1] + '/login';

  useEffect(() => {
    const authenticateUser = async () => {
      if (!token || !user) {
        navigate(loginUrl, { replace: true });
      } else {
        if (path[1] !== user.role) {
          navigate('/' + user.role + '/dashboard');
        } else {
          setIsAuthenticated(true);
        }
      }
    };

    authenticateUser();
  }, [token, user, navigate, path, loginUrl]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Hoặc một component loading khác
  }

  return <Outlet />;
};

export default PrivateRoutes;
