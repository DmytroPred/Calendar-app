import { Route } from 'react-router-dom';
import App from '../App';
import UnAuthGuard from '../guards/UnAuthGuard';

const AuthRoutes = [
  <Route
    key='Calendar'
    path='/'
    element={
      <UnAuthGuard>
        <App />
      </UnAuthGuard>
    }
  ></Route>,
];

export default AuthRoutes;
