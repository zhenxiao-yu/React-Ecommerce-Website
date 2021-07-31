import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'commons/auth';
import 'css/app.scss'; 
import 'css/style.scss';


ReactDOM.render(
  <div>
    <ToastContainer
      position="top-right"
      autoClose={5000} //close after 5 seconds
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
    <Router />
  </div>,
  document.getElementById('root')
);

