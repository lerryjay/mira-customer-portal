import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

  getContext = () => {
    return { ...this.state, login: this.loginUser, logout: this.logoutUser }
  };


  render() {
    
    return (

      <Provider value={this.getContext()}>
        <div className="home">
          <Fragment>
            <Router>
              <Nav />
              <div className="" id="wrapper">
                <Sidebar />
                <div className="content">
                  <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/forgot_password" component={ForgotPassword} />
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