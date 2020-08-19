import React, { Component, Fragment } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HTTPURL } from './common/global_constant';

// import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Provider } from './common/context';

import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import ForgotPassword from "./pages/forgot_password/forgot_password";
import Dashboard from './pages/dashboard/Dashboard';

import Nav from './common/components/Nav';
import Sidebar from './common/components/Sidebar';
import NotFound from './common/components/NotFound';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  loginUser = async (email, password) => {
    await fetch(HTTPURL + 'user/login');
    console.log('Yuppie i logged ', email, password);
  }

  logoutUser = () => this.setState({ loggedIn: false });

  signupUser = async (username, email, password) => {
    console.log('Registered Successfully ', username, email, password);
  }

  forgotPassword = async (email) => {
    console.log('Reset password link sent!', email);
  }

  getContext = () => {
    return { 
      ...this.state, 
      login: this.loginUser, 
      logout: this.logoutUser, 
      signup: this.signupUser,
      forgotpassword: this.forgotPassword
    }
  };


  render() {

    return (

      <Provider value={this.getContext()}>
        <div className="home">
          <Fragment>
            <Router>
              <Nav />
              <div className="App" id="wrapper">
                {this.state.loggedIn && <Sidebar />}
                <div className="content">
                  <Switch>
                    {!this.state.loggedIn && <Route path="/" component={Login} />}
                    {!this.state.loggedIn && <Route path="/login" component={Login} />}
                    {!this.state.loggedIn && <Route path="/signup" component={SignUp} />}
                    {!this.state.loggedIn && <Redirect from="/dashboard" to="/login" />}
                    {this.state.loggedIn && <Route exact path="/dashboard" component={Dashboard} />}
                    {this.state.loggedIn && <Route path="/forgot_password" component={ForgotPassword} />}
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </div>
            </Router>
          </Fragment>
        </div>
      </Provider>
    )
  };
}

export default App;