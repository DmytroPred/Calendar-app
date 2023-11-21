import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Layout from './components/layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/Sign-in';
import SignUp from './pages/Sign-up';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<App />}></Route>
            <Route path='/sign-in' element={<SignIn />}></Route>
            <Route path='/sign-up' element={<SignUp />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
