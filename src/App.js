import React, { Component, Fragment } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HTTPURL } from './common/global_constant';

// import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Provider } from './common/context';

import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import ForgotPassword from "./pages/forgot_password/forgot_password";
<<<<<<< HEAD
import Dashboard from './pages/dashboard/Dashboard.jsx';
=======
import Dashboard from './pages/dashboard/dashboard';
>>>>>>> auth
import ChangePassword from './pages/change_password/ChangePassword';
import CreateTicket from './pages/create_ticket/create_ticket'
import CreateClient from './pages/create_client/CreateClient';
import CreateUser from './pages/create_user/CreateUser';
import Profile from './pages/profile/Profile';
import TicketList from './pages/ticket_list/TicketList';
import ViewClient from './pages/view_client/ViewClient';
import ListClient from './pages/list_client/ListClient'
import Chat from './pages/chat/Chat'

import Nav from './common/components/Nav';
import Sidebar from './common/components/Sidebar';
import NotFound from './common/components/NotFound';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    }
  }
  loginUser = async (email, password) => {
    // await fetch(HTTPURL + 'user/login');
    this.setState({ loggedIn: true });
    console.log('Yuppie i logged ', email, password);
    return { status: true, message: 'Login successful' };
  }

  changePassword = async (currentpwd, newpwd, confirmnewpwd) => {
    console.log('Changed Successfully ', currentpwd,newpwd, confirmnewpwd);
  }

  logoutUser = () => this.setState({ loggedIn: false });

  getContext = () => {
    return { ...this.state, login: this.loginUser, logout: this.logoutUser, changepassword: this.changePassword }
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
                    {this.state.loggedIn && <Route path="/createClient" component={CreateClient} />}
                    {this.state.loggedIn && <Route path="/creatUser" component={CreateUser} />}
                    {this.state.loggedIn && <Route path="/profile" component={Profile} />}
                    {this.state.loggedIn && <Route path="/ticketList" component={TicketList} />}
                    {this.state.loggedIn && <Route path="/viewClient" component={ViewClient} />}
                    {this.state.loggedIn && <Route path="/listClient" component={ListClient} />}
                    {this.state.loggedIn && <Route path="/ticketChat" component={Chat} />}
                    {this.state.loggedIn && <Route path="/changePassword" component={ChangePassword} />}
                    {this.state.loggedIn && <Route path="/create_ticket" component={CreateTicket} />}
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