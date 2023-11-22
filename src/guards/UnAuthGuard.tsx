import { PropsWithChildren, useEffect } from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UnAuthGuard = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authReducer.user);

  useEffect(() => {
    if (!user) navigate('/sign-in');
  }, [user, navigate]);

  return <>{children}</>;
};

export default UnAuthGuard;
