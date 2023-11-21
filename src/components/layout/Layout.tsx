import { PropsWithChildren, useCallback, useEffect } from 'react';
import Header from './Header';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/auth/authSlice';

const Layout = ({ children }: PropsWithChildren) => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const authGuard = useCallback(
    (user: User | null): void => {
      user ? navigate('/') : navigate('/sign-in');
    },
    [navigate]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispath(
          setUser({
            uid: user.uid,
            isAuthenticated: user.uid,
            email: user.email,
          })
        );
      } else {
        dispath(setUser(null));
      }

      authGuard(user);
    });

    return unsubscribe;
  }, [authGuard, dispath]);

  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
