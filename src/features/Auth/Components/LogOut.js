import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoginInUser, signOutAsync } from './AuthSlice';
import { clearCart } from '../../Cart/CartSlice';



function Logout() {
  const dispatch = useDispatch();
const user = useSelector(selectLoginInUser);

  useEffect(() => {
    dispatch(signOutAsync());
    dispatch(clearCart());
  });

  // but useEffect runs after render, so we have to delay navigate part
  return <>{!user && <Navigate to="/" replace={true}></Navigate>}</>;
}

export default Logout;
