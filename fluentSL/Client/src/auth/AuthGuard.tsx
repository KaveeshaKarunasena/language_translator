import { AuthContext } from './AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import React from 'react';

export const AuthGuard = ({ children }) => {
  let authPayload = React.useContext(AuthContext);
  const { fromStorage } = authPayload;
  const data = JSON.parse(fromStorage);

  // const [token,setToken] = useState([]);
  const navigate = useNavigate();

  try {
    console.log('auths', data);
    // setToken(authPayload.token)
    if (!data || !data.token) {
      return <>{children}</>
    }
    return <Navigate to="/user/translate" />;
  } catch (error) {
    console.log(error);
  }
};

