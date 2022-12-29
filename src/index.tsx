import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MetamaskContextProvider from './contexts/Wallet';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'index.css';
import classes from 'App.module.scss';

toast.configure({ theme: 'colored', className: classes.toastContainer });

ReactDOM.render(
  <React.StrictMode>
    <MetamaskContextProvider>
      <App />
    </MetamaskContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
