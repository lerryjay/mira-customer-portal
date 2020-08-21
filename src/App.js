import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HTTPURL } from './common/global_constant';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Provider } from './common/context';

import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import ForgotPassword from "./pages/forgot_password/forgot_password";

import Nav from './common/components/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  loginUser = async (email, password) => {
    await fetch(HTTPURL+'user/login');
    console.log('Yuppie i logged ', email, password);
  }

  logoutUser = () => this.setState({ loggedIn: false });

  getContext = () => {
    return { ...this.state, login: this.loginUser, logout: this.logoutUser }
  };

  render() {
    return (
      <Provider value={this.getContext()}>
        <Router>
          <div className="bg-img">
            <Nav />
              <Switch>
                <Route exact path='/' component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/forgot_password" component={ForgotPassword} />
              </Switch>
          </div>
        </Router>
      </Provider>
    )
  };
}

export default App;