import React, { Component, Fragment } from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { HTTPURL } from "./common/global_constant";

// import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/rotating-card.css";

import { Provider } from "./common/context";

import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import ForgotPassword from "./pages/forgot_password/forgot_password";
import Dashboard from "./pages/dashboard/dashboard";
import ChangePassword from "./pages/change_password/ChangePassword";
import CreateTicket from "./pages/create_ticket/create_ticket";
import CreateProduct from "./pages/createproduct/createproduct";
import UpdateProduct from "./pages/updateproduct/updateproduct";
import AddPackage from "./pages/addpackage/addpackage";
import ProductDetails from "./pages/product_details/product_details";
import ViewProduct from "./pages/viewproduct/viewproduct";
import ClientViewProduct from "./pages/clientviewproduct/clientviewproduct";
import CreateClient from "./pages/create_client/CreateClient";
import CreateClientById from "./pages/create_clientbyid/CreateClientById";
import CreateUser from "./pages/create_user/CreateUser";
import Profile from "./pages/profile/Profile";
import ClientProfile from "./pages/clientprofile/ClientProfile";
import TicketList from "./pages/ticket_list/TicketList";
import ViewTicket from "./pages/viewticket/ViewTicket";
import ViewClient from "./pages/view_client/ViewClient";
import ListClient from "./pages/list_client/ListClient";
import ProductCart from "./pages/productcart/ProductCart";
import AddClientProduct from "./pages/addclientproduct/addclientproduct";
import AddClient from "./pages/addclient/addclient";
import UpdateClientProduct from "./pages/updateclientproduct/updateclientproduct";

import Nav from "./common/components/Nav";
import ClientSidebar from "./common/components/ClientSidebar";
import Sidebar from "./common/components/Sidebar";
import NotFound from "./common/components/NotFound";
import ClientProductDetails from "./pages/clientproductdetails/clientproductdetails";

const apiKey = "97899c-7d0420-1273f0-901d29-84e2f8";
const userId = "5f44ce52af9ba";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      admin: true,
    };
  }

  loginUser = (data) => {
    let form = new FormData(data);

    const headers = new Headers();
    headers.append("API-KEY", "97899c-7d0420-1273f0-901d29-84e2f8");
    fetch(HTTPURL + "user/login", {
      method: "POST",
      body: form,
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        // check if logged in
        if (json.status == true) {
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("userId", json.data.userid);
          sessionStorage.setItem("role", json.data.role);
          sessionStorage.setItem("firstname", json.data.firstname);
          sessionStorage.setItem("lastname", json.data.lastname);
          sessionStorage.setItem("email", json.data.email);
          sessionStorage.setItem("imageurl", json.data.imageurl);
          sessionStorage.setItem("telephone", json.data.telephone);

          if (json.data.role === "admin") {
            console.log("I'm an admin");
            this.setState({ admin: true });
          } else {
            console.log("I'm a user");
            this.setState({ admin: false });
          }
          this.setState({ loggedIn: sessionStorage.getItem("loggedIn") });
          console.log("Yuppie i logged ", data);
          return { status: true, message: "Login successful" };
        }

        return {status: false, message: 'Invalid Username or Password'};
      });
  };

  signupUser = (data) => {
    const headers = new Headers();
    headers.append("API-KEY", "97899c-7d0420-1273f0-901d29-84e2f8");
    let form = new FormData(data);
    return fetch(HTTPURL + "user/register", {
      method: "POST",
      body: form,
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.status == false) {
          console.log(json.message);
          return json.message;
        }
        return json;
      });

    // console.log('Registered Successfully ', username, email, password);
  };

  forgotPassword = (data) => {
    const headers = new Headers();
    headers.append("API-KEY", "97899c-7d0420-1273f0-901d29-84e2f8");
    let form = new FormData(data);
    return fetch(HTTPURL + "user/forgotpassword", {
      method: "POST",
      body: form,
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        return json;
      });
  };

  changePassword = (data) => {
    const headers = new Headers();
    headers.append("API-KEY", "97899c-7d0420-1273f0-901d29-84e2f8");
    let form = new FormData(data);
    return fetch(HTTPURL + "user/updatepassword", {
      method: "POST",
      body: form,
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        return json;
      });
  };

  logoutUser = () =>
    this.setState({ loggedIn: sessionStorage.setItem("loggedIn", false) });

  getContext = () => {
    return {
      ...this.state,
      login: this.loginUser,
      logout: this.logoutUser,
      signup: this.signupUser,
      forgotpassword: this.forgotPassword,
      changepassword: this.changePassword,
    };
  };

  render() {
    const { loggedIn, admin } = this.state;

    return (
      <Provider value={this.getContext()}>
        <div className="home">
          <Fragment>
            <Router>
              <Nav />
              <div className="App" id="wrapper">
                {this.state.admin
                  ? this.state.loggedIn && <Sidebar />
                  : this.state.loggedIn && <ClientSidebar />}

                <Switch>
                  {<Route path="/forgot_password" component={ForgotPassword} />}
                  {<Route path="/signup" component={SignUp} />}
                  {<Route path="/login" component={Login} />}
                  {!loggedIn && <Route path="/" component={Login} />}
                  <div className="content">
                    {loggedIn && (
                      <Route exact path="/dashboard" component={Dashboard} />
                    )}
                    {loggedIn && (
                      <Route
                        path="/createclient"
                        component={() => (
                          <CreateClient
                            userId={userId}
                            apiKey={apiKey}
                          ></CreateClient>
                        )}
                      />
                    )}
                    {loggedIn && (
                      <Route
                        path="/createclientbyid"
                        component={() => (
                          <CreateClientById
                            userId={userId}
                            apiKey={apiKey}
                          ></CreateClientById>
                        )}
                      />
                    )}
                    {loggedIn && (
                      <Route path="/createuser" component={CreateUser} />
                    )}
                    {admin && loggedIn && (
                      <Route path="/profile" component={Profile} />
                    )}
                    {!admin && loggedIn && (
                      <Route path="/clientprofile" component={ClientProfile} />
                    )}
                    {loggedIn && (
                      <Route path="/ticketlist" component={TicketList} />
                    )}
                    {loggedIn && (
                      <Route path="/viewclient" component={ViewClient} />
                    )}
                    {loggedIn && (
                      <Route path="/listclient" component={ListClient} />
                    )}
                    {loggedIn && (
                      <Route
                        path="/changepassword"
                        component={ChangePassword}
                      />
                    )}
                    {loggedIn && (
                      <Route
                        path="/createproduct"
                        component={() => (
                          <CreateProduct
                            userId={userId}
                            apiKey={apiKey}
                          ></CreateProduct>
                        )}
                      />
                    )}
                    {loggedIn && (
                      <Route path="/updateproduct" component={UpdateProduct} />
                    )}
                    {loggedIn && (
                      <Route
                        path="/addpackage"
                        component={() => (
                          <AddPackage
                            userId={userId}
                            apiKey={apiKey}
                          ></AddPackage>
                        )}
                      />
                    )}
                    {loggedIn && (
                      <Route
                        path="/addclientproduct"
                        component={AddClientProduct}
                      />
                    )}
                    {loggedIn && (
                      <Route path="/viewticket" component={ViewTicket} />
                    )}
                    {loggedIn && (
                      <Route path="/productcart" component={ProductCart} />
                    )}
                    {loggedIn && (
                      <Route path="/viewproduct" component={ViewProduct} />
                    )}
                    {!admin && loggedIn && (
                      <Route
                        path="/view_product"
                        component={ClientViewProduct}
                      />
                    )}
                    {loggedIn && (
                      <Route
                        path="/productdetails"
                        component={ProductDetails}
                      />
                    )}
                    {loggedIn && (
                      <Route path="/createticket" component={CreateTicket} />
                    )}
                    {loggedIn && (
                      <Route path="/addclient" component={AddClient} />
                    )}
                    {loggedIn && (
                      <Route
                        path="/updateclientproduct"
                        component={UpdateClientProduct}
                      />
                    )}
                    {loggedIn && (
                      <Route
                        path="/clientproductdetails"
                        component={ClientProductDetails}
                      />
                    )}
                  </div>
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Router>
          </Fragment>
        </div>
      </Provider>
    );
  }
}

export default App;
