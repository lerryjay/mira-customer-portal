import React, { Component } from "react";
import { withContext } from "../../common/context";
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY } from "../../common/global_constant";
import Chart from "./Chart";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      ticketlist: 0,
      products: "",
      clients: "",
      id: 1,
    };
  }

  componentDidMount() {
    this.getLoader()
  }

  getLoader() {

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
        <div className="row mt-3 mx-3 text-white">
          <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3">
            <div className="p-2 card card1">
              <i className="fab fa-buffer fa-fw fa-2x mb-2"></i>
              <p className="border-top text-right py-2">
                {this.state.products}
                <br />
                <small>Products</small>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3">
            <div className="p-2 card cardd">
              <i className="fas fa-check fa-fw fa-2x mb-2"></i>
              <p className="border-top text-right py-2">
                9.823
                <br />
                <small>Resolved Tickets</small>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3">
            <div className="p-2 card carddd">
              <i className="fas fa-comments fa-fw fa-2x mb-2"></i>
              <p className="border-top text-right py-2">
                9.823
                <br />
                <small>Pending Tickets</small>
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3">
            <div className="p-2 card cardddd">
              <i className="fas fa-ticket-alt fa-fw fa-2x mb-2"></i>
              <p className="border-top text-right py-2">
                {this.state.ticketlist}
                <br />
                <small>Tickets</small>
              </p>
            </div>
          </div>
        </div>
        { this.state.user.role == 'admin' &&
          <div className="row card mt-3 mx-4 justify-content-center mx-2">
            <div className="col-12 card-body shadow home-chart">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="card-title mb-0">Welcome Back!</h4>
                  <div className="small text-muted">August 2020</div>
                </div>
              </div>
              <Chart />
            </div>
          </div>
        }
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
                    {this.state.user.role == "admin" && (
                      <th>Client&nbsp;Name</th>
                    )}
                    {this.state.user.role == "admin" && <th>Email</th>}
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
                        {this.state.user.role == "admin" && (
                          <td onClick={this.handleRoute}>
                            {ticket.clientname}
                          </td>
                        )}
                        {this.state.user.role == "admin" && (
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
    );
  }
}

export default withContext(Dashboard);
