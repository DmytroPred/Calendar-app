import { Route } from 'react-router-dom';
import SignIn from '../pages/Sign-in';
import SignUp from '../pages/Sign-up';
import AuthGuard from '../guards/AuthGuard';

const UnAuthRoutes = [
  <Route
    key='Sign-in'
    path='/sign-in'
    element={
      <AuthGuard>
        <SignIn />
      </AuthGuard>
    }
  ></Route>,
  <Route
    key='Sign-up'
    path='/sign-up'
    element={
      <AuthGuard>
        <SignUp />
      </AuthGuard>
    }
  ></Route>,
];

export default UnAuthRoutes;
