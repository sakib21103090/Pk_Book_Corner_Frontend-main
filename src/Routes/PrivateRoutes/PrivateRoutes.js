
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../features/UserPannel/User/UserSlice';

const PrivateRoute = ({children}) => {
    const user = useSelector(selectUserInfo);

    if (!user) {
      return <Navigate to="/login" replace={true}></Navigate>;
    }
    return children;
  }
  

export default PrivateRoute;