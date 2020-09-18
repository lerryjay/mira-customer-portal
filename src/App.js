import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch,Route} from "react-router-dom";
import { HTTPURL,APIKEY } from "./common/global_constant";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/rotating-card.css";

import { Provider } from "./common/context";
import { AdminPrivateRoute, PrivateRoute, UserPrivateRoute,NotLoggedInRoute } from './common/protected_route';

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
import UpdateAdmin from "./pages/users/UpdateAdmin/UpdateAdmin";
import UserProfile from "./pages/users/userprofile/UserProfile";
import CreateUserTicket from "./pages/users/createuserticket/createuserticket"
import ViewAdmin from "./pages/users/ViewAdmin/ViewAdmin"

import Nav from "./common/components/Nav";
import Sidebar from "./common/components/Sidebar";
import PageLoader from "./common/components/PageLoader";
import Alert from "./common/components/Alert";
import NotFound from "./common/components/NotFound";
import Forbidden from "./common/components/Forbidden";





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
        role : 'user',
        permissions : []
      },
      permissionstatus: ''
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
      data.permissions = data.permissions == null ? [] : data.permissions;
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

  showAlert = (type, messsage)=>{  
    this.setState({ alertType : type, alertMessage: messsage });
     this.setState({ alertActive : true });
     setTimeout(() => {
              this.setState({ alertActive : false});
    }, 2000)
  }

  updateAdminPermission = async (data, adminid) =>{
    const headers = new Headers();
    headers.append('API-KEY', APIKEY);

    let form = new FormData();
    form.append("userid", this.state.user.userid);
    form.append("adminid", adminid);
    form.append("permissions", data.join('|'));

    const res = await fetch(HTTPURL + "admin/updatepermission", {
      method: "POST",
      body: form,
      headers: headers,
    }).then((response) => response.json());

    this.setState({ permissionstatus: res['status'] });

    if(res['status']){
      if(adminid == this.state.user.userid){
        const { user } = this.state;
        user['permissions'] = data;
        this.setState({ user, admin: true });
        sessionStorage.setItem('user',JSON.stringify(user));
      }
    }
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
      getUsers : this.getUsers,
      updateAdminPermission : this.updateAdminPermission.bind(this),
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
    const { loggedIn, admin, user } = this.state;
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
                <div className={ loggedIn ? "content" : '' }>
                <Switch>
                 
                      <PrivateRoute exact path="/" component={Dashboard}  />
                      <PrivateRoute path="/dashboard" component={Dashboard} />
                      <PrivateRoute path="/products" permission="LISTPRODUCT" component={Products} />
                      <PrivateRoute path="/tickets" permission="LISTTICKET" component={Tickets} />
                      <PrivateRoute path="/profile" component={Profile} />
                      <PrivateRoute path="/changepassword" component={ChangePassword} />
                      <PrivateRoute path="/createticket" permission="CREATETICKET" component={CreateTicket} />
                      <PrivateRoute path="/productdetails" permission="LISTPRODUCT" component={ProductDetails} />
                      

                      <UserPrivateRoute path="/viewticket" permission="VIEWTICKET" component={ViewTicket} />
                      <UserPrivateRoute path="/clientprofile" component={ClientProfile} />
                      <UserPrivateRoute path="/clientproductdetails" component={ProductCart} />
                      <UserPrivateRoute path="/productcart" component={ViewProductCart} />
                      <UserPrivateRoute path="/clientproducts" component={ClientProducts} />


                      <AdminPrivateRoute path="/createproduct" permission="ADDPRODUCT"  component={CreateProduct} />
                      <AdminPrivateRoute path="/updateproduct" permission="UPDATEPRODUCT" component={UpdateProduct} />

                      <AdminPrivateRoute path="/clients" permission="SEARCHCLIENT" component={Clients} />
                      <AdminPrivateRoute path="/addclient" permission="CREATECLIENT" component={AddClient} />
                      <AdminPrivateRoute path="/createclient" permission="CREATECLIENT" component={CreateClient} />
                      <AdminPrivateRoute path="/createclientbyid"  permission="CREATECLIENT" component={CreateClientById} />
                      <AdminPrivateRoute path="/viewclient" permission="VIEWCLIENT" component={ViewClient} />
                      <AdminPrivateRoute path="/editclient" permission="UPDATECLIENT" component={EditClient} />
                      <AdminPrivateRoute path="/addclientproduct"  permission="ADDDEPLOYMENT" component={AddClientProduct} />
                      <AdminPrivateRoute path="/updateclientproduct" permission="UPDATEDEPLOYMENT" component={UpdateClientProduct} />
                      <AdminPrivateRoute path="/viewclientproduct" permission="VIEWDEPLOYMENT" component={ViewClientProduct} />

                      <AdminPrivateRoute path="/addadmin" permission="ADDADMIN" component={AddAdmin} />
                      <AdminPrivateRoute path="/createuser" permission="CREATEUSER" component={CreateUser} />
                      <AdminPrivateRoute path="/users" permission="LISTUSER" component={Users} />
                      <AdminPrivateRoute path="/admin" permission="LISTADMIN" component={Admin} />
                      <AdminPrivateRoute path="/createuserticket" permission="CREATETICKET" component={CreateUserTicket} />
                      <AdminPrivateRoute path="/updateadmin" permission="UPDATEADMIN" component={UpdateAdmin} />
                      <AdminPrivateRoute path="/viewadmin" permission="VIEWADMIN" component={ViewAdmin} />
                      <AdminPrivateRoute path="/userprofile" permission="VIEWUSER" component={UserProfile} />
                  
                  {<Route path="/forgot_password" component={ForgotPassword} />}
                  {<Route path="/verifytoken" component={VerifyToken} />}
                  {<Route path="/signup" component={SignUp} />}
                  {<NotLoggedInRoute path="/login" component={Login} />}
                  {<Route path="/forbidden" component={Forbidden} />}
                  <Route component={NotFound} />
                </Switch>
                </div>
              </div>
            </Router>
          </Fragment>
        </div>
      </Provider>
    );
  }
 
}

export default App;
