import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './components/layout/Layout';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import AuthRoutes from './routes/AuthRoutes';
import UnAuthRoutes from './routes/UnAuthRoutes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            {AuthRoutes}
            {UnAuthRoutes}
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
