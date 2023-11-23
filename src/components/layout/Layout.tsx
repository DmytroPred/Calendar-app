import { PropsWithChildren, useEffect } from 'react';
import Header from './Header';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';

const Layout = ({ children }: PropsWithChildren) => {
  const dispath = useDispatch();

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
    });

    return unsubscribe;
  }, [dispath]);

  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
