import { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authReducer.user);

  useEffect(() => {
    if (user?.uid) navigate('/');
  }, [user, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
