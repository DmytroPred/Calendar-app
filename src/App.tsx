import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { User, onAuthStateChanged } from 'firebase/auth';
import { setUser } from './store/slices/authSlice';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './config/firebase';
import Calendar from './pages/Calendar';
import CalendarEvents from './pages/CalendarEvents';
import SignIn from './pages/Sign-in';
import SignUp from './pages/Sign-up';

function App() {
  const dispath = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const authGuard = useCallback(
    (user: User | null): void => {
      if (user) {
        if (location.pathname.includes('sign-')) navigate('/');
      }

      if (!user) {
        if (
          location.pathname === '/' ||
          location.pathname.includes('/events')
        ) {
          navigate('/sign-in');
        }
      }
    },
    [location.pathname, navigate]
  );

  const updateAuthState = useCallback(
    (user: User | null): void => {
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
    },
    [dispath]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      updateAuthState(user);
      authGuard(user);
    });

    return unsubscribe;
  }, [dispath, navigate, authGuard, updateAuthState]);

  return (
    <Layout>
      <Routes>
        <Route key='Calendar' path='/' element={<Calendar />}></Route>
        <Route key='Events' path='/events/:date' element={<CalendarEvents />} />
        <Route key='Sign-in' path='/sign-in' element={<SignIn />}></Route>
        <Route key='Sign-up' path='/sign-up' element={<SignUp />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
