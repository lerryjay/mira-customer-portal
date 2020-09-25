import React, { Component } from "react";
import { withContext } from "../../common/context";
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY } from "../../common/global_constant";
import Chart from "./Chart";
import Tabs from "./Tabs";
import Maincards from "./maincards";
import Minicards from "./minicards";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      clients: "",
      id: 1,
      pending: '',
      resolved: '',
      cancelled: ''
    };
  }

componentDidMount(){
  this.getResolvedTickets();
  this.getPendingTickets();
  this.getCancelledTickets();
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


  render() {
    return (
      <div>
      <Tabs>
        <div title="General">
          <div className="row mt-3 mx-3 text-white">
            <Maincards title="Products" total={this.state.products.length} icon="fa fa-database" iconBackground="btn-primary" />
            <Maincards title="Tickets" total={this.state.tickets.length} icon="fab fa-buffer" iconBackground="bg-primary" />
            <Maincards title="Clients" total={this.state.users.length} icon="fa fa-users" iconBackground="bg-orangered" />
            <Maincards title="API" total="987" icon="fa fa-chart-line" iconBackground="bg-success" />
          </div>
     
       
          <div className="row  mt-3 mx-4 justify-content-center mx-2">
          <div className="col-md-8  mt-2 card-body shadow home-chart">
            <Chart chartTitle="Ticket Statistics"/>
          </div>
            <div className="col-md-4">
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
                {/* <caption>Hello World!</caption> */}
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


        <div title="Ticket">
          <div className="row mt-3 mx-3 text-white">
              <Maincards title="Products" total={this.state.products.length} icon="fa fa-database" iconBackground="btn-primary" />
              <Maincards title="Tickets" total={this.state.tickets.length} icon="fab fa-buffer" iconBackground="bg-primary" />
              <Maincards title="Clients" total={this.state.users.length} icon="fa fa-users" iconBackground="bg-orangered" />
              <Maincards title="API" total="987" icon="fa fa-chart-line" iconBackground="bg-success" />
          </div>

     
          <div className="row  mt-3 mx-4 justify-content-center mx-2">
          <div className="col-md-8  mt-2 card-body shadow home-chart">
            <Chart chartTitle="Ticket Statistics"/>
          </div>
            <div className="col-md-4">
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
              <Maincards title="Clients" total={this.state.users.length} icon="fa fa-users" iconBackground="bg-orangered" />
              <Maincards title="API" total="987" icon="fa fa-chart-line" iconBackground="bg-success" />
          </div>

        { this.state.user.role ==='admin' &&
          <div className="row  mt-3 mx-4 justify-content-center mx-2">
          <div className="col-md-8  mt-2 card-body shadow home-chart">
            <Chart chartTitle="Client Statistics"/>
          </div>
            <div className="col-md-4">
              <div className="row">
                <Minicards title="Total Clients" total={this.state.tickets.length} icon="fa fa-users" iconBackground="text-orangered" />
                <Minicards title="Active Clients" total={this.state.resolved} icon="fa fa-check-circle" iconBackground="text-orangered" />
                <Minicards title="Suspended Clients" total={this.state.pending} icon="fa fa-arrow-circle-up" iconBackground="text-orangered" />
                <Minicards title="Deleted Clients" total={this.state.cancelled} icon="fa fa-times-circle" iconBackground="text-orangered" />
              </div>
            </div>
          </div>
        }
        </div>


        <div title="API">
          <div className="row mt-3 mx-3 text-white">
              <Maincards title="Products" total={this.state.products.length} icon="fa fa-database" iconBackground="btn-primary" />
              <Maincards title="Tickets" total={this.state.tickets.length} icon="fab fa-buffer" iconBackground="bg-primary" />
              <Maincards title="Clients" total={this.state.users.length} icon="fa fa-users" iconBackground="bg-orangered" />
              <Maincards title="API" total="987" icon="fa fa-chart-line" iconBackground="bg-success" />
          </div>
  
          <div className="row  mt-3 mx-4 justify-content-center mx-2">
          <div className="col-md-8  mt-2 card-body shadow home-chart">
            <Chart chartTitle="API Statistics"/>
          </div>
            <div className="col-md-4">
              <div className="row">
                <Minicards title="Total APIs" total={this.state.tickets.length} icon="fa fa-chart-line" iconBackground="text-success" />
                <Minicards title="Bulk SMS" total={this.state.resolved} icon="fa fa-comments" iconBackground="text-success" />
                <Minicards title="BVN" total={this.state.pending} icon="fab fa-bandcamp" iconBackground="text-success" />
                <Minicards title="Location" total={this.state.cancelled} icon="fa fa-map-marker-alt" iconBackground="text-success" /> </div>
            </div>
          </div>
        
        </div>
      </Tabs>
 </div>
    );
  }
}

export default withContext(Dashboard);

