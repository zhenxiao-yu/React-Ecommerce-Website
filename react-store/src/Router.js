import React from 'react';
//router default
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//main page
import App from 'pages/App';
//login page
import Login from 'pages/Login';
//not found page
import NotFound from 'pages/NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      {/*path to main page*/}
      <Route path="/" exact component={App} />
      {/*path to login page*/}
      <Route path="/login/:nickname" component={Login} />
      {/*direct undefined pages to not found page*/}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;