import React, { Component, Fragment } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HTTPURL } from './common/global_constant';

// import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/rotating-card.css'

import { Provider } from './common/context';

import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import ForgotPassword from "./pages/forgot_password/forgot_password";
import Dashboard from './pages/dashboard/dashboard';
import ChangePassword from './pages/change_password/ChangePassword';
import CreateTicket from './pages/create_ticket/create_ticket';
import CreateProduct from './pages/createproduct/createproduct';
import AddPackage from './pages/addpackage/addpackage';
import ProductDetails from './pages/product_details/product_details';
import ViewProduct from './pages/viewproduct/viewproduct';
import ClientViewProduct from './pages/clientviewproduct/clientviewproduct';
import CreateClient from './pages/create_client/CreateClient';
import CreateClientById from './pages/create_clientbyid/CreateClientById'
import CreateUser from './pages/create_user/CreateUser';
import Profile from './pages/profile/Profile';
import ClientProfile from './pages/clientprofile/ClientProfile';
import TicketList from './pages/ticket_list/TicketList';
import ViewTicket from './pages/viewticket/ViewTicket';
import ViewClient from './pages/view_client/ViewClient';
import ListClient from './pages/list_client/ListClient';
import ProductCart from './pages/productcart/ProductCart';
import AddClientProduct from './pages/addclientproduct/addclientproduct'

import Nav from './common/components/Nav';
import ClientSidebar from './common/components/ClientSidebar';
import Sidebar from './common/components/Sidebar';
import NotFound from './common/components/NotFound';

const apiKey = "97899c-7d0420-1273f0-901d29-84e2f8";
const userId = "5f44ce52af9ba";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      users: [],
      profile: [],
      admin: true,
      getTicket: '',
      getProduct: ''
    }
  }

  loginUser = (data) => {
    let form = new FormData(data);

    const headers = new Headers();
    headers.append('API-KEY', '97899c-7d0420-1273f0-901d29-84e2f8');
    fetch(HTTPURL + 'user/login', {
      method: 'POST',
      body: form,
      headers: headers
    })
    .then(response => response.json())
    .then(json => {
      console.log(json.data);
      // Get user data from the database
      this.state.profile.push(json.data)
      console.log(this.state.profile[0], json.data, "profile")
      if(json.data.role === "admin") {
        console.log("I'm an admin")
        this.setState({admin : true})
      } else{
        console.log("I'm a user")
        this.setState({admin : false})
      }
      return json;
    });
;
    this.setState({ loggedIn: true })
    console.log('Yuppie i logged ', data);
    return { status: true, message: 'Login successful' };
  }

  signupUser = (data) => {
    const headers = new Headers();
    headers.append('API-KEY', '97899c-7d0420-1273f0-901d29-84e2f8');
    let form = new FormData(data);
    return fetch(HTTPURL + 'user/register', {
      method: 'POST',
      body: form,
      headers: headers

    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if(json.status == false) {
        console.log(json.message)
        return json.message
      }
      return json;
    });
    
    // console.log('Registered Successfully ', username, email, password);
  }

  forgotPassword = (data) => {
    const headers = new Headers();
    headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
    let form = new FormData(data);
    return fetch(HTTPURL + 'user/forgotpassword', {
        method: 'POST',
        body: form,
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json;
    });
  }

  getProfileDetails = () => {
    console.log(this.state.profile, "Profile Info")
  }

  changePassword = (data) => {
    const headers = new Headers();
    headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
    let form = new FormData(data);
    return fetch(HTTPURL + 'user/updatepassword', {
        method: 'POST',
        body: form,
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json;
    });
  }

  createClient = (data) => {
    const headers = new Headers();
    headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
    let form = new FormData(data);
    return fetch(HTTPURL + 'company/add', {
        method: 'POST',
        body: form,
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json;
    });
  }

  createTicket = (data) => {
    const headers = new Headers();
    headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
    let form = new FormData(data);
    return fetch(HTTPURL + 'ticket/add', {
        method: 'POST',
        body: form,
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json;
    });
  }

  createProduct = (data) => {
    const headers = new Headers();
    headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
    let form = new FormData(data);
    return fetch(HTTPURL + 'product/add', {
        method: 'POST',
        body: form,
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json;
    });
  }

  addPackage = (data) => {
    const headers = new Headers();
    headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
    let form = new FormData(data);
    return fetch(HTTPURL + 'product/addmodule', {
        method: 'POST',
        body: form,
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json;
    });
  }

  sendChat = (data) => {
    const headers = new Headers();
    headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
    let form = new FormData(data);
    
    // form.append("file", file.get('file'));
    // console.log(files[0]);

    return fetch(HTTPURL + 'ticket/replyticket', {
        method: 'POST',
        body: form,
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json;
    });
  }

  handleRoute = (e) => {
    // Get Ticket by ID
   const headers = new Headers();
   headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');

       let ticketid = e.target.attributes.value.value
       // let ticketid = "5f4509c0c26d1"
       let userid = "5f3e930330e28"

   fetch(HTTPURL +`ticket/getticket?userid=${userid}&ticketid=${ticketid}`, {
       method: 'GET',
       headers: headers
   })
   .then(response => response.json())
   .then(data => {
     console.log(data.data, "data");
     this.state.getTicket = data.data
     this.setState({getTicket: data.data})
     
    //  this.state.getTickets.push(data.data)
    //  this.setState({getTicket: this.state.getTickets[0] })
    //  console.log(this.state.getTicket, "data2")
    })
}

handleProductRoute = (e) => {
  // Get Ticket by ID
 const headers = new Headers();
 headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');

     let productid = e.target.attributes.value.value
     let userid = "5f44c8e94593e"

 fetch(HTTPURL +`product/getproduct?productid=${productid}&userid=${userid}`, {
     method: 'GET',
     headers: headers
 })
 .then(response => response.json())
 .then(data => {
   console.log(data.data, "data");
   this.state.getProduct = data.data
   this.setState({getProduct: data.data})
   
  //  this.state.getTickets.push(data.data)
  //  this.setState({getTicket: this.state.getTickets[0] })
  //  console.log(this.state.getTicket, "data2")
  })
}

  logoutUser = () => this.setState({ loggedIn: false });

  getContext = () => {
    return {
       ...this.state, 
       login: this.loginUser, 
       logout: this.logoutUser, 
       signup: this.signupUser, 
       forgotpassword: this.forgotPassword,
       changepassword: this.changePassword,
       createclient: this.createClient,
       createticket: this.createTicket,
       createproduct: this.createProduct,
       profiledetails: this.getProfileDetails,
       getchat: this.sendChat,
       viewmore: this.handleRoute,
       viewmoredetails: this.handleProductRoute,
       addpackage: this.addPackage
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
                {this.state.admin ? (this.state.loggedIn && <Sidebar />)
                  :  (this.state.loggedIn && <ClientSidebar />)
                }
                
                <div className="content">
                  <Switch>
                    {<Route path="/forgot_password" component={ForgotPassword} />}
                    {<Route path="/signup" component={SignUp} />}
                    {<Route path="/login" component={Login} />}
                    {!this.state.loggedIn && <Route path="/" component={Login} />}
                    {this.state.loggedIn && <Route exact path="/dashboard" component={Dashboard} />}
                    {this.state.loggedIn && <Route path="/createclient" component={()=><CreateClient userId={userId} apiKey={apiKey}></CreateClient>} />}
                    {this.state.loggedIn && <Route path="/createclientbyid" component={() => <CreateClientById userId={userId} apiKey={apiKey}></CreateClientById>} />}
                    {this.state.loggedIn && <Route path="/createuser" component={CreateUser} />}
                    {this.state.admin && this.state.loggedIn && <Route path="/profile" component={Profile} />}
                    {!this.state.admin && this.state.loggedIn &&  <Route path="/clientprofile" component={ClientProfile} />}
                    {this.state.loggedIn && <Route path="/ticketlist" component={TicketList} />}
                    {this.state.loggedIn && <Route path="/viewclient" component={ViewClient} />}
                    {this.state.loggedIn && <Route path="/listclient" component={ListClient} />}
                    {this.state.loggedIn && <Route path="/changepassword" component={ChangePassword} />}
                    {this.state.loggedIn && <Route path="/createproduct" component={CreateProduct} />}
                    {this.state.loggedIn && <Route path="/addpackage" component={AddPackage} />}
                    {this.state.loggedIn && <Route path="/addclientproduct" component={AddClientProduct} />}
                    {this.state.loggedIn && <Route path="/viewticket" component={ViewTicket} />}
                    {this.state.loggedIn && <Route path="/productcart" component={ProductCart} />}
                    {this.state.loggedIn && <Route path="/viewproduct" component={ViewProduct} />}
                    {!this.state.admin && this.state.loggedIn && <Route path="/view_product" component={ClientViewProduct} />}
                    {this.state.loggedIn && <Route path="/productdetails" component={ProductDetails} />}
                    {this.state.loggedIn && <Route path="/createticket" component={CreateTicket} />}
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