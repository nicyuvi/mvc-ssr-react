import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const serverSideProps = window.__HYDRATION_DATA__;

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <App serverSideProps={serverSideProps} />
    </BrowserRouter>
  </StrictMode>
);
