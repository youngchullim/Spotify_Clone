import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute }from '../util/route_util';

import GreetingContainer from './greeting/greeting_container';
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import Modal from './modal/modal';

import UnauthComponent from './unauth';
import AuthComponent from './auth';

const App = () => {
  return (
    <div className="app-comp">
      <Modal />
      
      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <Route path="/" component={GreetingContainer}/>
      </Switch>
    </div>
  )
};

export default App;
