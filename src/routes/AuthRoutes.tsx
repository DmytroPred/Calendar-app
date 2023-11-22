import { Route } from 'react-router-dom';
import UnAuthGuard from '../guards/UnAuthGuard';
import Calendar from '../pages/Calendar';

const AuthRoutes = [
  <Route
    key='Calendar'
    path='/'
    element={
      <UnAuthGuard>
        <Calendar />
      </UnAuthGuard>
    }
  ></Route>,
];

export default AuthRoutes;
