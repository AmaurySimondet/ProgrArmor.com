import { React, useState, useEffect } from 'react';
import API from '../utils/API.js';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
  const [auth, setAuth] = useState();

  async function handleAuth() {
    const res = await API.isAuth();
    setAuth(res);
  }

  useEffect(() => {
    setTimeout(handleAuth(), 50);
  }, []);

  if (auth === true) {
    return <Outlet />;
  }
  if (auth === false) {
    return <Navigate to="/" />;
  }
}

export default PrivateRoute;
