import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch,Route,Redirect} from "react-router-dom";
import { HTTPURL,APIKEY } from "./common/global_constant";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/rotating-card.css";

import { Provider } from "./common/context";

import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import ForgotPassword from "./pages/forgot_password/forgot_password";
import Dashboard from "./pages/dashboard/dashboard";
import ChangePassword from "./pages/change_password/ChangePassword";
import Profile from "./pages/profile/Profile";
import VerifyToken from "./pages/verify_token/verify_token";

import Tickets from "./pages/tickets/Tickets";
import CreateTicket from "./pages/tickets/create_ticket/create_ticket";
import ViewTicket from "./pages/tickets/viewticket/ViewTicket";

import Products from "./pages/products/Products";
import ProductCart from "./pages/products/productcart/ProductCart";
import CreateProduct from "./pages/products/createproduct/createproduct";
import UpdateProduct from "./pages/products/updateproduct/updateproduct";
import ProductDetails from "./pages/products/product_details/product_details";

import Clients from "./pages/clients/Clients";
import AddClient from "./pages/clients/addclient/addclient";
import ViewClient from "./pages/clients/view_client/ViewClient";
import CreateClient from "./pages/clients/create_client/CreateClient";
import ClientProfile from "./pages/clients/clientprofile/ClientProfile";
import ClientProducts from "./pages/clients/clientproducts/clientproducts";
import CreateClientById from "./pages/clients/create_clientbyid/CreateClientById";
import AddClientProduct from "./pages/clients/addclientproduct/addclientproduct";
import ClientProductDetails from "./pages/clients/clientproductdetails/clientproductdetails";
import UpdateClientProduct from "./pages/clients/updateclientproduct/updateclientproduct";
import ViewClientProduct from "./pages/clients/viewclientproduct/viewclientproduct";
import ViewProductCart from "./pages/clients/viewproductcart/viewproductcart";
import EditClient from "./pages/clients/editclient/EditClient"

import CreateUser from "./pages/users/create_user/CreateUser";
import AddAdmin from "./pages/users/addadministrator/addadministrator";
import Users from "./pages/users/Users";
import Admin from "./pages/users/Admin";
import AdminProfile from "./pages/users/adminprofile/AdminProfile";
import UserProfile from "./pages/users/userprofile/UserProfile";
import CreateUserTicket from "./pages/users/createuserticket/createuserticket"
import AdminPage from "./pages/users/adminpage/AdminPage"

import Nav from "./common/components/Nav";
import Sidebar from "./common/components/Sidebar";
import PageLoader from "./common/components/PageLoader";
import Alert from "./common/components/Alert";
import NotFound from "./common/components/NotFound";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      admin: false, 
      loaderActive : false,
      alertType : '',
      alertMessage : '',
      products : [],
      users : [],
      tickets : [],
      user : {
        role : 'admin'
      }
    };
    this.loginUser  = this.loginUser.bind(this);
    this.showAlert  = this.showAlert.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getTickets = this.getTickets.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }
  
  componentDidMount(){
    this.restoreUser();
  }

  async restoreUser()
  {
    if(sessionStorage.getItem('user')){
      const user = JSON.parse(sessionStorage.getItem('user'));
      await this.setState({ loggedIn : true, user });
      this.getProducts();
      this.getTickets();
      if(user.role === 'admin'){ this.getUsers(); }
    }
  }

  loginUser = async (data) => {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(HTTPURL + "user/login", {
      method: "POST",
      body: data,
      headers: headers,
    }).then((response) => response.json()).then((json) =>json);
    if (res['status']) {
      const { data } = res;
      sessionStorage.setItem("loggedIn", true);
      sessionStorage.setItem("userId", data.userid);
      sessionStorage.setItem("user", JSON.stringify(data));
      this.getProducts();
      this.getTickets();
      if (data.role === "admin") {
        this.setState({user : data,admin: true });
        this.getUsers();
      } else {
        this.setState({ admin: false });
      }
      this.setState({ loggedIn: sessionStorage.getItem("loggedIn") });
      return { status: true, message: "Login successful" };
    }else return {status: false, message: 'Invalid Username or Password'};
  };

  signupUser = (data) => {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    let form = new FormData(data);
    return fetch(HTTPURL + "user/register", {
      method: "POST",
      body: form,
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => json);
  };

  forgotPassword = (data) => {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
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
    headers.append("API-KEY", APIKEY);
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

  logoutUser = () =>{
    this.setState({ loggedIn:  false, user : {}});
    sessionStorage.clear();
  }

  showLoader = () =>{
    this.setState({ loaderActive : true });
  }
  
  hideLoader = ()=>{
    this.setState({ loaderActive : false });
  }

  showAlert = async (type, messsage)=>{
    await this.setState({ alertActive : true });
    setTimeout(()=>this.setState({ alertActive : false },3500));
  }

  getContext = () => {
    return {
      ...this.state,
      login: this.loginUser,
      logout: this.logoutUser,
      signup: this.signupUser,
      forgotpassword: this.forgotPassword,
      changepassword: this.changePassword,
      showLoader : this.showLoader,
      hideLoader : this.hideLoader,
      showAlert : this.showAlert,
      getProducts : this.getProducts,
      getTickets : this.getTickets,
      getUsers : this.getUsers
    };
  };

  async getProducts()
  {
    const headers = new Headers();
    headers.append('API-KEY', APIKEY);
    const res = await fetch(HTTPURL + `product?userid=${ this.state.user.userid }`, { method: 'GET', headers: headers}).then(response => response.json())
    if(res['status']) this.setState({ products: res.data })
  }
  async getTickets()
  {
    const headers = new Headers();
    headers.append('API-KEY', APIKEY);
    const res = await fetch(HTTPURL + `ticket?userid=${ this.state.user.userid }`, { method: 'GET', headers: headers}).then(response => response.json())
    if(res['status']) this.setState({ tickets: res.data })
  }

  async getUsers()
  {
    const headers = new Headers();
    headers.append('API-KEY',APIKEY);
    const res = await fetch(HTTPURL + `user?userid=${ this.state.user.userid }`, { headers: headers }) .then(response => response.json());
    if(res['status']){this.setState({ users : res['data']}); }
  }

  render() {
    const { loggedIn, admin } = this.state;
    return (
      <Provider value={this.getContext()}>
        <div className="home">
          { this.state.alertActive  && <Alert type={ this.state.alertType } message={ this.state.alertMessage } />}
          { this.state.loaderActive && <PageLoader />}
          <Fragment>
            <Router>
              <Nav />
              <div className="App" id="wrapper">
                { loggedIn && <Sidebar />}
                <Switch>
                  {<Route path="/forgot_password" component={ForgotPassword} />}
                  {<Route path="/verifytoken" component={VerifyToken} />}
                  {<Route path="/signup" component={SignUp} />}
                  {<Route path="/login" component={Login} />}
                  {!loggedIn && <Route path="/" component={Login} />}
                  <div className="content">
                    {loggedIn && (
                      <Route exact path="/dashboard" component={Dashboard} />
                    )}
                    {loggedIn && (
                      <Route path="/createclient" component={() => (   <CreateClient ></CreateClient> )}
                      />
                    )}
                    {loggedIn && (
                      <Route
                        path="/createclientbyid"
                        component={() => (
                          <CreateClientById 
                          ></CreateClientById>
                        )}
                      />
                    )}
                    {loggedIn && (
                      <Route path="/createuser" component={CreateUser} />
                    )}
                    {loggedIn && (
                      <Route path="/addadmin" component={AddAdmin} />
                    )}
                    {loggedIn && (
                      <Route path="/profile" component={Profile} />
                    )}
                    {!admin && loggedIn && (
                      <Route path="/clientprofile" component={ClientProfile} />
                    )}
                    {loggedIn && (
                      <Route path="/tickets" component={Tickets} />
                    )}
                    {loggedIn && (
                      <Route path="/viewclient" component={ViewClient} />
                    )}
                    {loggedIn && (
                      <Route path="/clients" component={ Clients } />
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
                          ></CreateProduct>
                        )}
                      />
                    )}
                    {loggedIn && (
                      <Route path="/updateproduct" component={UpdateProduct} />
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
                      <Route path="/products" component={Products} />
                    )}
                    {!admin && loggedIn && (
                      <Route
                        path="/clientproducts"
                        component={ClientProducts}
                      />
                    )}
                    {!admin && loggedIn && (
                      <Route
                        path="/productcart"
                        component={ProductCart}
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
                        path="/viewclientproduct"
                        component={ViewClientProduct}
                      />
                    )}
                    {!admin && loggedIn && (
                      <Route
                        path="/viewproductcart"
                        component={ViewProductCart}
                      />
                    )}
                    {!admin && loggedIn && (
                      <Route
                        path="/clientproductdetails"
                        component={ClientProductDetails}
                      />
                    )}
                    {loggedIn && (
                      <Route
                        path="/users"
                        component={Users}
                      />
                    )}
                    {loggedIn && (
                      <Route
                        path="/admin"
                        component={Admin}
                      />
                    )}
                    {loggedIn && (
                      <Route
                        path="/editclient"
                        component={EditClient}
                      />
                    )}
                    {loggedIn && (
                      <Route
                        path="/createuserticket"
                        component={CreateUserTicket}
                      />
                    )}
                    {loggedIn && (
                      <Route path="/adminprofile" component={AdminProfile} />
                    )}
                    {loggedIn && (
                      <Route path="/adminpage" component={AdminPage} />
                    )}
                      <PrivateRoute path="/userprofile" isLoggedIn={loggedIn} component={UserProfile} />
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


const PrivateRoute = ({ isLoggedIn, permissions, ...props }) => isLoggedIn  ? <Route {...props}/>  : <Redirect to="/login"/>;


export default App;
