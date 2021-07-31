import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from 'pages/App';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';
import Cart from 'pages/Cart';

const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* redirect to home page */}
      <Route path="/" exact component={App} />
      {/* redirect to login page */}
      <Route path="/login" component={Login} />
      {/* redirect to new user register page */}
      <Route path="/register" component={Register} />
      {/* redirect to shopping cart page */}
      <Route path="/cart" component={Cart} />
      {/* redirect to 404 page */}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
