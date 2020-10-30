import React, { Component } from "react";
import { withContext } from "../../common/context";
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY } from "../../common/global_constant";
import Chart from "./Chart";
import Tabs from "./Tabs";
import Maincards from "./maincards";
import Minicards from "./minicards";
import Pagination from "../../common/components/Pagination";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      clients: "",
      id: 1,
      pending: '',
      resolved: '',
      cancelled: '',
      currentPage: 1,
      numberPerPage: 10,
      totalLists: [],
      pageNumbers: [],
      currentLists: [],
      todaytickets: [],
      servicesStatistics: [],
      clients: [],
      suspendedclient: '',
      deletedclient: '',
      totalapi : 0 ,
      errorapi : 0,
      sucessapi : 0,
      cancelledapi : 0,
      smscalls:0
    };
  }

componentDidMount(){
  this.getResolvedTickets();
  this.getPendingTickets();
  this.getCancelledTickets();
  this.getTransactions();
  this.todayTickets();
  this.getActiveClients();
  this.getSuspendedClients();
  this.getDeletedClients();
  this.getApiStatistics();
  this.getServiceStatistics();
  this.getClients()
}

formatDate(date){
  var dd = date.getDate();
  var mm = date.getMonth()+1;
  var yyyy = date.getFullYear();
  if(dd<10) {dd='0'+dd}
  if(mm<10) {mm='0'+mm}
  date = yyyy+'-'+mm+'-'+dd;
  return date
}



Last7Days () {
  var result = [];
  for (var i=0; i<7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push( this.formatDate(d) )
  }

  return(result);
}

shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


async getApiStatistics()
{
  const headers = new Headers();
  headers.append('API-KEY', APIKEY);
  const res = await fetch(HTTPURL + `log/statistics?userid=${this.state.user.userid}`, {
      method: 'GET',
      headers: headers
  }).then(response => response.json());

  if (res['status']) this.setState({ totalapi: res['data']['total'],errorapi: res['data']['error'],cancelledapi :  res['data']['cancelled'],sucessapi : res['data']['success']});
}

async getServiceStatistics()
{
  const headers = new Headers();
  headers.append('API-KEY', APIKEY);
  const res = await fetch(HTTPURL + `service/list?userid=${this.state.user.userid}`, { method: 'GET',headers: headers }).then(response => response.json());
  let servicetypes =  res.status ? this.shuffle(res['data']) : [];

  let servicesStatistics = [];

  if(servicetypes.length > 0){
    const dates  = this.Last7Days();
    servicetypes = servicetypes.filter((item,index)=>index < 3);
    const res = await fetch(HTTPURL + `log/statistics?userid=${this.state.user.userid}&enddate=${dates[0]}&startdate=${dates[6]}`, { method: 'GET',headers: headers }).then(response => response.json());
    res.status && servicesStatistics.push({code : 'Last 7 days',count : res['data']['total']})

    for (let index = 0; index < servicetypes.length; index++) {
      const res = await fetch(HTTPURL + `log/statistics?userid=${this.state.user.userid}&servicecode=${servicetypes[index]['code']}&enddate=${dates[0]}&startdate=${dates[6]}`, { method: 'GET',headers: headers }).then(response => response.json());
      res.status && servicesStatistics.push({code : servicetypes[index]['code'],count : res['data']['total']});
      !res.status && servicesStatistics.push({code : servicetypes[index]['code'],count : 0});
    }
    
    this.setState({servicesStatistics})
  }
  
}

async getClients() {
  const headers = new Headers();
  headers.append('API-KEY', APIKEY);
  const res = await fetch(HTTPURL + `clients/?userid=${this.state.user.userid}`, {
      method: 'GET',
      headers: headers
  }).then(response => response.json());

  if (res['status']) this.setState({ clients: res['data'] })
}




  getResolvedTickets(){
    const resolved = this.state.tickets.filter(ticket => ticket.ticketstatus === 'resolved' )
    this.setState({resolved: resolved.length})
  }

  getPendingTickets(){
    const pending = this.state.tickets.filter(ticket => ticket.ticketstatus === "pending" )
    this.setState({pending: pending.length})

  }

  getCancelledTickets(){
    const cancelled = this.state.tickets.filter(ticket => ticket.ticketstatus === "cancelled" )
    this.setState({cancelled: cancelled.length})

  }

  getActiveClients(){
    const activeclient = this.state.clients.filter(user => user.status === 'active' )
    this.setState({activeclient: activeclient.length})
  }

  getSuspendedClients(){
    const suspendedclient = this.state.clients.filter(user => user.status === 'suspended' )
    this.setState({suspendedclient: suspendedclient.length})
  }

  getDeletedClients(){
    const deletedclient = this.state.clients.filter(user => user.status === 'deleted' )
    this.setState({deletedclient: deletedclient.length})
  }



  ticketStatusUpdated(e, ticket) {

  }

  async updateTicketStatus(ticketid, status) {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const form = new FormData();

    form.append("ticketid", ticketid);
    form.append("status", status);
    form.append("userid", this.state.user.userid);
    const res = await fetch(HTTPURL + `ticket/updatestatus`, {
      method: "POST",
      headers: headers,
      body: form,
    }).then((response) => response.json());
    if (res["status"]) {
    }
  }

  async getTransactions() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    const { user} = this.state;

    let tdate = new Date().toLocaleDateString();

    const res = await fetch(
      HTTPURL + `wallet/transactions?userid=${user.userid}&on=${tdate}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((response) => response.json());

    if (res["status"]) {

      this.setState({ totalLists: res["data"] });
    }
  
  }

  async todayTickets() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    const { user} = this.state;

    let on = new Date().toLocaleDateString();

    const res = await fetch(
      HTTPURL + `ticket?userid=${user.userid}&on=${on}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((response) => response.json());

    if (res["status"]) {
      this.setState({ todaytickets: res["data"] });
    }
  
  }


  update = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const { numberPerPage, currentPage, totalLists } = this.state;

    // Logic for displaying current lists
    // const indexOfLastList = currentPage * numberPerPage;
    // const indexOfFirstList = indexOfLastList - numberPerPage;
    // const currentLists = totalLists.slice(indexOfFirstList, indexOfLastList);
    // this.state.currentLists = currentLists;

    return (
      <div>
      <Tabs>
        <div title="General">
          <div className="row mt-3 mx-3 text-white">
            <Maincards title="Products" total={this.state.products.length} icon="fa fa-database" iconBackground="btn-primary" />
            <Maincards title="Tickets" total={this.state.ticketslength || 0} icon="fab fa-buffer" iconBackground="bg-primary" />
            <Maincards title="Clients" total={this.state.clients.length} icon="fa fa-users" iconBackground="bg-orangered" />
            <Maincards title="API" total={this.state.totalapi} icon="fa fa-chart-line" iconBackground="bg-success" />
          </div>
     
       
          <div className="row  mt-3 mx-4 justify-content-center mx-2">
          <div className="col-md-8  box1 mt-2 card-body shadow home-chart">
              {/* <progress max="100"  value="100"></progress> */}
            <Chart chartTitle="Ticket Statistics"/>
          </div>
            <div className="col-md-4 box2">
              <div className="row">
                <Minicards title="Total Tickets" total={this.state.tickets.length} icon="fab fa-buffer" iconBackground="textprimary" />
                <Minicards title="Resolved Tickets" total={this.state.resolved} icon="fa fa-check-circle" iconBackground="textprimary" />
                <Minicards title="Pending Tickets" total={this.state.pending} icon="fa fa-arrow-circle-up" iconBackground="textprimary" />
                <Minicards title="Cancelled Tickets" total={this.state.cancelled} icon="fa fa-times-circle" iconBackground="textprimary" />
              </div>
            </div>
          </div>

               
          <div className="col-md-12 mb-3" id="profile">
          <div id="table" className="card pt-2 mt-3 justify-content-center shadow px-2">
            <h6 className="h6 text-left mt-2 mb-3 pr-3 font-weight-bold">Tickets&nbsp;</h6>
            <div className="table-responsive">
              <table className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Date&nbsp;&&nbsp;Time</th>
                    {this.state.user.role === "admin" && (
                      <th>Client&nbsp;Name</th>
                    )}
                    {this.state.user.role === "admin" && <th>Email</th>}
                    <th>Ticket&nbsp;Type</th>
                    <th>Status</th>
                    <th>View&nbsp;Ticket</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.todaytickets.map((ticket, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {new Date(
                            ticket.createdat
                          ).toLocaleDateString()}
                        </td>
                        {this.state.user.role === "admin" && (
                          <td onClick={this.handleRoute}>
                            {ticket.clientname}
                          </td>
                        )}
                        {this.state.user.role === "admin" && (
                          <td>{ticket.email}</td>
                        )}
                        <td>{ticket.type}</td>
                        <td style={{ maxWidth: "150px" }}>
                          <select
                            className="custom-select custom-select-sm"
                            value={ticket.ticketstatus}
                            onChange={(e) =>
                              this.ticketStatusUpdated(e, ticket)
                            }
                          >
                            <option
                              className="btn btn-sm text-success"
                              value="resolved"
                            >
                              {" "}
                                    &#10003;&nbsp;&nbsp;Resolved{" "}
                            </option>
                            <option
                              className="btn btn-sm text-danger"
                              value="cancelled"
                            >
                              &#1008;&nbsp;&nbsp;Cancelled
                                  </option>
                            <option
                              className="btn btn-sm btn-light text-warning"
                              value="pending"
                            >
                              &#10070;&nbsp;&nbsp;Pending
                                  </option>
                          </select>
                        </td>
                        <td
                          className="align-middle"
                          style={{ cursor: "pointer" }}
                        >
                          <Link to={() => `/viewticket/${ticket.id}`}>
                            <span
                              className="badge px-3 py-2 badge-primary"
                              value={ticket.id}
                              style={{ cursor: "pointer" }}
                            >
                              View
                                  </span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {
                this.state.todaytickets.length === 0 &&
                <div className="card-body">
                  <div className="alert alert-warning" role="alert">
                    <h6 className="text-center">No ticket records!</h6>
                  </div>
                </div>

              }
            </div>
          </div>
        </div>
     
      <div className="col-md-12 mb-3" id="profile">
            {this.state.totalLists.length === 0 ? (
              <div className="alert alert-warning mt-5" role="alert">
                <h6 className="text-center">No transaction records!</h6>
              </div>
            ) : (
              <div>
                <div
                  id="table"
                  className="card pt-2 mt-3 justify-content-center shadow px-2"
                >
                <div className="card-header bg-medium font-weight-bold text-dark">
                    TRANSACTION HISTORY
                </div>
                  <div className="table-responsive">
                    <table
                      className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart"
                      id="myTable"
                    >
                      {/* <caption>Hello World!</caption> */}
                      <thead>
                        <tr>
                          <th className="table-padding">Date</th>
                          <th>Customer</th>
                          <th>Description</th>
                          <th>Credit</th>
                          <th>Transaction Log</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.currentLists.map((transaction, index) => {
                          return (
                            <tr key={index}>
                            <td className="table-padding">
                              {transaction.tdate}
                            </td>
                              {this.state.user.role == "admin" && (
                                <td onClick={this.handleRoute}
                                className="table-padding">
                                  {transaction.clientname}
                                </td>
                              )}
                              <td className="table-padding">{transaction.description}</td>
                              <td className="table-padding">&#8358;{transaction.credit}</td>
                              <td className="table-padding">
                                <span className={transaction.status == 'Successful' ? 'text-success' : 'text-danger'} >{transaction.tlog}</span>
                              </td>
                              </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

  
        </div>


        <div title="Ticket">
          <div className="row mt-3 mx-3 text-white">
              <Maincards title="Products" total={this.state.products.length} icon="fa fa-database" iconBackground="btn-primary" />
              <Maincards title="Tickets" total={this.state.tickets.length} icon="fab fa-buffer" iconBackground="bg-primary" />
              <Maincards title="Clients" total={this.state.clients.length} icon="fa fa-users" iconBackground="bg-orangered" />
              <Maincards title="API" total={this.state.totalapi} icon="fa fa-chart-line" iconBackground="bg-success" />
          </div>

     
          <div className="row  mt-3 mx-4 justify-content-center mx-2">
          <div className="col-md-8 box1  mt-2 card-body shadow home-chart">
            <Chart chartTitle="Ticket Statistics"/>
          </div>
            <div className="col-md-4 box2">
              <div className="row">
                <Minicards title="Total Tickets" total={this.state.tickets.length} icon="fab fa-buffer" iconBackground="text-primary" />
                <Minicards title="Resolved Tickets" total={this.state.resolved} icon="fa fa-check-circle" iconBackground="text-primary" />
                <Minicards title="Pending Tickets" total={this.state.pending} icon="fa fa-arrow-circle-up" iconBackground="text-primary" />
                <Minicards title="Cancelled Tickets" total={this.state.cancelled} icon="fa fa-times-circle" iconBackground="text-primary" />
              </div>
            </div>
          </div>
        
           <div className="col-md-12 mb-3" id="profile">
          <div id="table" className="card pt-2 mt-3 justify-content-center shadow px-2">
            <h6 className="h6 text-left mt-2 mb-3 pr-3 font-weight-bold">Tickets&nbsp;</h6>
            <div className="table-responsive">
              <table className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Date&nbsp;&&nbsp;Time</th>
                    {this.state.user.role === "admin" && (
                      <th>Client&nbsp;Name</th>
                    )}
                    {this.state.user.role === "admin" && <th>Email</th>}
                    <th>Ticket&nbsp;Type</th>
                    <th>Status</th>
                    <th>View&nbsp;Ticket</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tickets.map((ticket, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {new Date(
                            ticket.createdat
                          ).toLocaleDateString()}
                        </td>
                        {this.state.user.role === "admin" && (
                          <td onClick={this.handleRoute}>
                            {ticket.clientname}
                          </td>
                        )}
                        {this.state.user.role === "admin" && (
                          <td>{ticket.email}</td>
                        )}
                        <td>{ticket.type}</td>
                        <td style={{ maxWidth: "150px" }}>
                          <select
                            className="custom-select custom-select-sm"
                            value={ticket.ticketstatus}
                            onChange={(e) =>
                              this.ticketStatusUpdated(e, ticket)
                            }
                          >
                            <option
                              className="btn btn-sm text-success"
                              value="resolved"
                            >
                              {" "}
                                    &#10003;&nbsp;&nbsp;Resolved{" "}
                            </option>
                            <option
                              className="btn btn-sm text-danger"
                              value="cancelled"
                            >
                              &#1008;&nbsp;&nbsp;Cancelled
                                  </option>
                            <option
                              className="btn btn-sm btn-light text-warning"
                              value="pending"
                            >
                              &#10070;&nbsp;&nbsp;Pending
                                  </option>
                          </select>
                        </td>
                        <td
                          className="align-middle"
                          style={{ cursor: "pointer" }}
                        >
                          <Link to={() => `/viewticket/${ticket.id}`}>
                            <span
                              className="badge px-3 py-2 badge-primary"
                              value={ticket.id}
                              style={{ cursor: "pointer" }}
                            >
                              View
                                  </span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {
                this.state.tickets.length === 0 &&
                <div className="card-body">
                  <div className="alert alert-warning" role="alert">
                    <h6 className="text-center">No ticket records!</h6>
                  </div>
                </div>

              }
            </div>
          </div>
        </div>
        </div>

        <div title="Client">
          <div className="row mt-3 mx-3 text-white">
              <Maincards title="Products" total={this.state.products.length} icon="fa fa-database" iconBackground="btn-primary" />
              <Maincards title="Tickets" total={this.state.tickets.length} icon="fab fa-buffer" iconBackground="bg-primary" />
              <Maincards title="Clients" total={this.state.clients.length} icon="fa fa-users" iconBackground="bg-orangered" />
              <Maincards title="API" total={this.state.totalapi} icon="fa fa-chart-line" iconBackground="bg-success" />
          </div>

        { this.state.user.role ==='admin' &&
          <div className="row  mt-3 mx-4 justify-content-center mx-2">
          <div className="col-md-8 box1 mt-2 card-body shadow home-chart">
            <Chart chartTitle="Client Statistics"/>
          </div>
            <div className="col-md-4 box2">
              <div className="row">
                <Minicards title="Total Clients" total={this.state.clients.length} icon="fa fa-users" iconBackground="text-orangered" />
                <Minicards title="Active Clients" total={this.state.activeclient} icon="fa fa-check-circle" iconBackground="text-orangered" />
                <Minicards title="Suspended Clients" total={this.state.suspendedclient} icon="fa fa-arrow-circle-up" iconBackground="text-orangered" />
                <Minicards title="Deleted Clients" total={this.state.deletedclient} icon="fa fa-times-circle" iconBackground="text-orangered" />
              </div>
            </div>
          </div>
        }
        </div>


        <div title="API">
          <div className="row mt-3 mx-3 text-white">
              <Maincards title="Total" total={this.state.totalapi} icon="fa fa-database" iconBackground="btn-primary" />
              <Maincards title="Success" total={this.state.sucessapi} icon="fa fa-check" iconBackground="bg-success" />
              <Maincards title="Error" total={this.state.errorapi} icon="fa fa-exclamation-triangle" iconBackground="bg-orangered" />
              <Maincards title="Cancelled" total={ this.state.cancelledapi} icon="fa fa-times" iconBackground="bg-danger" />
          </div>
  
          <div className="row  mt-3 mx-4 justify-content-center mx-2">
          <div className="col-md-8 box1 mt-2 card-body shadow home-chart">
            <Chart chartTitle="API Statistics"/>
          </div>
            <div className="col-md-4 box2">
              <div className="row">
                {
                  this.state.servicesStatistics.map((item,i)=><Minicards title={item.code} total={item.count} key={i} icon="fa fa-comments" iconBackground="text-success" />)
                }
                </div>
            </div>
          </div>
        
        </div>
      </Tabs>
 </div>
    );
  }
}

export default withContext(Dashboard);

