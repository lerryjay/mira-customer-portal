import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HTTPURL } from './common/global_constant';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Provider } from './common/context';

import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import ForgotPassword from "./pages/forgot_password/forgot_password";
<<<<<<< Updated upstream
=======
import Dashboard from './pages/dashboard/Dashboard.jsx';
import ChangePassword from './pages/change_password/ChangePassword';
import CreateTicket from './pages/create_ticket/create_ticket'
>>>>>>> Stashed changes

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

  changePassword = async (currentpwd, newpwd, confirmnewpwd) => {
    console.log('Changed Successfully ', currentpwd,newpwd, confirmnewpwd);
  }

  logoutUser = () => this.setState({ loggedIn: false });

  getContext = () => {
    return { ...this.state, login: this.loginUser, logout: this.logoutUser }
  };

  render() {
    return (
      <Provider value={this.getContext()}>
<<<<<<< Updated upstream
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
=======
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
                    {this.state.loggedIn && <Route path="/changePassword" component={ChangePassword} />}
                    {this.state.loggedIn && <Route path="/create_ticket" component={CreateTicket} />}
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </div>
            </Router>
          </Fragment>
        </div>
>>>>>>> Stashed changes
      </Provider>
    )
  };
}

export default App;