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
import VerifyLinkToken from "./pages/verifylinktoken/verifylinktoken";
import ResetPassword from "./pages/resetpassword/resetpassword";

import Tickets from "./pages/tickets/Tickets";
import CreateTicket from "./pages/tickets/create_ticket/create_ticket";
import ViewTicket from "./pages/tickets/viewticket/ViewTicket";

import Products from "./pages/products/Products";
import CreateProduct from "./pages/products/createproduct/createproduct";
import UpdateProduct from "./pages/products/updateproduct/updateproduct";
import ProductDetails from "./pages/products/product_details/product_details";

import Clients from "./pages/clients/Clients";
import AddClient from "./pages/clients/addclient/addclient";
import ViewClient from "./pages/clients/view_client/ViewClient";
import CreateClient from "./pages/clients/create_client/CreateClient";
import CreateClientById from "./pages/clients/create_clientbyid/CreateClientById";
import AddDeployment from "./pages/clients/adddeployment/adddeployment";
import UpdateDeployment from "./pages/clients/updatedeployment/updatedeployment";
import ViewDeployment from "./pages/clients/viewdeployment/viewdeployment";
import ClientViewDeployment from "./pages/clients/clientviewdeployment/clientviewdeployment";
import EditClient from "./pages/clients/editclient/EditClient"
import ClientProducts from "./pages/clients/clientproducts/clientproducts";

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
import ScrollToTop from "./common/components/ScrollToTop";

import UserApiLogs from "./pages/api_logs/UserApi/api_logs";

import Transactions from "./pages/transactions/transaction"





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
      if (data.role === "admin") {
        this.setState({admin: true });
        this.getUsers();
      } 
      this.getTickets();
      this.getProducts();
      sessionStorage.setItem("loggedIn", true);
      sessionStorage.setItem("userId", data.userid);
      sessionStorage.setItem("user", JSON.stringify(data));
      data.permissions = data.permissions == null ? [] : data.permissions;
      this.setState({ loggedIn: true,user : data });
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

  forgotPassword =  (data) => {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    let form = new FormData(data);
    return  fetch(HTTPURL + "user/forgotpassword", {
      method: "POST",
      body: form,
      headers: headers,
    }).then((response) => response.json())

  };

  changePassword =  (data) => {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    let form =  FormData(data);
    return  fetch(HTTPURL + "user/updatepassword", {
      method: "POST",
      body: form,
      headers: headers,
    }).then((response) => response.json())
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
    }, 5000)
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
    if(res['status']){
      if(adminid === this.state.user.userid){
        const { user } = this.state;
        user['permissions'] = data;
        this.setState({ user });
        sessionStorage.setItem('user',JSON.stringify(user));
      }
    }
    return res;
  }
  updateProfile = async(data, myform) =>{
    const headers = new Headers();
    headers.append('API-KEY', APIKEY);

    let form = new FormData(myform);
    form.append("userid", this.state.user.userid);

    const res = await fetch(HTTPURL + 'user/updateprofile', {
      method: "POST",
      body: form,
      headers: headers,
    }).then((response) => response.json());
    if(res['status']){
        const { user } = this.state;
        user['lastname'] = data.lastname;
        user['firstname'] = data.firstname;
        user['email'] = data.email;
        user['telephone'] = data.telephone;
        user['country'] = data.country;
        user['state'] = data.state;
        this.setState({ user });
        sessionStorage.setItem('user',JSON.stringify(user));
    }
    return res;
  }

  updateProfileImage = async(data, myimage) =>{
    const headers = new Headers();
    headers.append('API-KEY', APIKEY);

    let form = new FormData(myimage);
    form.append("userid", this.state.user.userid);

    const res = await fetch(HTTPURL + 'user/updateimage', {
      method: "POST",
      body: form,
      headers: headers,
    }).then((response) => response.json());
    if(res['status']){
        const { user } = this.state;
        user['imageurl'] = res.data;
        this.setState({ user });
        sessionStorage.setItem('user',JSON.stringify(user));
    }
    return res;
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
      updateProfile : this.updateProfile,
      updateProfileImage: this.updateProfileImage
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
    const res = await fetch(HTTPURL + `user?userid=${ this.state.user.userid }`, { headers: headers }).then(response => response.json());
    if(res['status']){this.setState({ users : res['data']}); }
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <Provider value={this.getContext()}>
        <div className="home">
          { this.state.alertActive  && <Alert type={ this.state.alertType } message={ this.state.alertMessage } />}
          { this.state.loaderActive && <PageLoader />}
          <Fragment>
            <Router basename="/customer-portal" > 
            <ScrollToTop />
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
                      <PrivateRoute path="/viewticket" permission="VIEWTICKET" component={ViewTicket} />
                      <PrivateRoute path="/apilogs"  component={UserApiLogs} />
                      <PrivateRoute path="/transactions"  component={Transactions} />
                      

                      <UserPrivateRoute path="/clientproducts" component={ClientProducts} />
                      <UserPrivateRoute path="/clientviewdeployment" component={ClientViewDeployment} />


                      <AdminPrivateRoute path="/createproduct" permission="ADDPRODUCT"  component={CreateProduct} />
                      <AdminPrivateRoute path="/updateproduct" permission="UPDATEPRODUCT" component={UpdateProduct} />

                      <AdminPrivateRoute path="/clients" permission="SEARCHCLIENT" component={Clients} />
                      <AdminPrivateRoute path="/addclient" permission="CREATECLIENT" component={AddClient} />
                      <AdminPrivateRoute path="/createclient" permission="CREATECLIENT" component={CreateClient} />
                      <AdminPrivateRoute path="/createclientbyid"  permission="CREATECLIENT" component={CreateClientById} />
                      <AdminPrivateRoute path="/viewclient" permission="VIEWCLIENT" component={ViewClient} />
                      <AdminPrivateRoute path="/editclient" permission="UPDATECLIENT" component={EditClient} />
                      <AdminPrivateRoute path="/adddeployment"  permission="ADDDEPLOYMENT" component={AddDeployment} />
                      <AdminPrivateRoute path="/updatedeployment" permission="UPDATEDEPLOYMENT" component={UpdateDeployment} />
                      <AdminPrivateRoute path="/viewdeployment" permission="VIEWDEPLOYMENT" component={ViewDeployment} />

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
                  {<Route path="/verifylinktoken" component={VerifyLinkToken} />}
                  {<Route path="/resetpassword" component={ResetPassword} />}
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
