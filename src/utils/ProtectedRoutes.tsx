import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const ProtectedRoutes = () => {
  const user = useAppSelector((state) => state.user.value);
  return user ? <Outlet /> : <Navigate to='signin' />;
};

export default ProtectedRoutes;
