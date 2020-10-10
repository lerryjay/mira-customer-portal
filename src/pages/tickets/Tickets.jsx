/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../common/global_constant";
import { withContext } from "../../common/context";
import { Link } from "react-router-dom";
import Pagination from "../../common/components/Pagination";

class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      userid: "",
      startdate: "",
      enddate: "",
      type: "",
      on: "",
      searchUser: "",
      clients: [],
      currentPage: 1,
      numberPerPage: 10,
      totalLists: this.props.tickets,
      pageNumbers: [],
      currentLists: [],
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchUser") {
      let client = this.state.users.find(
        (item) => item.firstname + " " + item.lastname == value
      );
      if (client == null)
        client = this.state.clients.find((item) => item.businessname == value);
      if (client) this.state.userid = client.userid || client.user_id;
    }
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.props.user.role === "admin" && this.getClients();
    this.getTickets();
  }

  async getUsers() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(HTTPURL + `user?userid=${this.props.user.userid}`, {
      headers: headers,
    }).then((response) => response.json());
    if (res["status"]) {
      this.setState({ users: res["data"] });
    }
  }

  async getClients() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(
      HTTPURL + `clients/?userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((response) => response.json());

    if (res["status"]) this.setState({ clients: res["data"] });
  }

  async getTickets() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(
      HTTPURL + `ticket/?userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((response) => response.json());
    if (res["status"]) {
      let tickets = res["data"];
      // for (let i = 0; i < this.state.tickets.length; i++) {
      //   tickets.push(this.state.tickets[i]);
      // }
      this.setState({ tickets });
    }
  }

  ticketStatusUpdated(e, ticket) {
    const tickets = this.state.tickets.map((item) => {
      if (item.id == ticket.id) {
        item.ticketstatus = e.target.value;
        this.updateTicketStatus(ticket.id, e.target.value);
      }
      return item;
    });

    this.setState({ tickets });
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
    // res.status && this.state.getTickets() && this.getTickets();
  }

  handleSearch = async (e) => {
    e.preventDefault();

    const { user, userid, type, startdate, enddate, on } = this.state;

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(
      HTTPURL +
        `ticket?userid=${user.userid}&clientid=${userid}&on=${on}&startdate=${startdate}&enddate=${enddate}&type=${type}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status) this.setState({ tickets: data.data });
      });
  };

  handleClick(event) {
    const paginatedbuttons = document.querySelectorAll("a");

    this.setState({
      currentPage: event.target.id,
    });

    paginatedbuttons.forEach((btn) => {
      if (btn.id == event.target.id) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  update = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const { numberPerPage, currentPage, totalLists } = this.state;

    // Logic for displaying current lists
    const indexOfLastList = currentPage * numberPerPage;
    const indexOfFirstList = indexOfLastList - numberPerPage;
    const currentLists = totalLists.slice(indexOfFirstList, indexOfLastList);
    this.state.currentLists = currentLists;

    return (
      <div className="container-fluid px-5">
        <div className="row mt-4">
          <div className="w-100 text-center">
            <h3>TICKETS </h3>
          </div>

          <div className="col-md-9 col-sm-12 box1 mb-3" id="profile">
            {this.state.tickets.length === 0 ? (
              <div className="alert alert-warning mt-5" role="alert">
                <h6 className="text-center">No ticket records!</h6>
              </div>
            ) : (
              <div>
                <div id="table" className="card pt-2 mt-3 justify-content-center shadow px-2">
                  <div className="table-responsive">
                    <table
                      className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart"
                      id="myTable"
                    >
                      {/* <caption>Hello World!</caption> */}
                      <thead>
                        <tr>
                          <th>ID</th>
                          {this.state.user.role == "admin" && (
                            <th>Client&nbsp;Name</th>
                          )}
                          <th>Type</th>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.currentLists.map((ticket, index) => {
                          return (
                            <tr key={index}>
                              <td>#{ticket.id}</td>
                              {this.state.user.role == "admin" && (
                                <td onClick={this.handleRoute}>
                                  {ticket.clientname}
                                </td>
                              )}
                              <td>{ticket.type}</td>
                              <td>{ticket.title}</td>
                              <td>
                                {new Date(
                                  ticket.createdat
                                ).toLocaleDateString()}
                              </td>
                              <td
                                style={{ minWidth: "100px", maxWidth: "100px" }}
                              >
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
                                    className="btn btn-sm btn-primary"
                                    value={ticket.id}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i className="fas fa-eye fa-fw "></i>
                                  </span>
                                </Link>
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

            {this.state.pageNumbers && (
              <div className="row mt-5">
                <div className="col-md-4">
                  <div className="form-group mt-1">
                    {this.state.tickets.length > 0 && (
                      <select
                        onChange={(e) => {
                          this.setState({ numberPerPage: e.target.value });
                        }}
                        style={{ maxWidth: "180px" }}
                        name="page"
                        id="page"
                        className="custom-select custom-select-md"
                        >
                        <option value="10" defaultValue>
                          10
                        </option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                      </select>
                    )}
                  </div>
                </div>

                <div className="col-md-8 ">
                  <div className="row  justify-content-center text-center">
                    <Pagination
                      numberPerPage={this.state.numberPerPage}
                      currentPage={this.state.currentPage}
                      totalLists={this.state.tickets}
                      pageNumbers={this.state.pageNumbers}
                      currentLists={this.state.currentLists}
                      update={this.update}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-3 col-sm-12 box2 mt-3 mb-3">
            <div className="card p-3">
              <label
                htmlFor="customer"
                style={{ display: "block" }}
                className="font-weight-bold"
              >
                Customer
              </label>
              <input
                list="customers"
                name="searchUser"
                id="searchUser"
                onChange={this.handleInputChange}
                placeholder="Search..."
                className="form-control"
              />
              <datalist id="customers">
                {this.state.users.map((user,i) => (
                  <option key={i} value={user.firstname + " " + user.lastname} />
                ))}
                {this.state.clients.map((client,i) => (
                  <option key={i} value={client.businessname} />
                ))}
              </datalist>

              <label
                htmlFor="ticketid"
                style={{ display: "block" }}
                className="mt-3 font-weight-bold"
              >
                Ticket ID
              </label>
              <input
                className="form-control"
                type="text"
                id="myInput"
                onChange={this.handleInputChange}
                placeholder="Search..."
                title="Type in something"
              />

              <form onSubmit={this.handleSearch}>
                <div className="form-group mt-3">
                  <label
                    htmlFor="startdate"
                    style={{ display: "block" }}
                    className="font-weight-bold"
                  >
                    Start Date
                  </label>
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control alt alt_right"
                      name="startdate"
                      id="startdate"
                      placeholder="Start Date"
                      value={this.state.startdate}
                      onChange={this.handleInputChange}
                    />
                    <span className="input-group-text bg-white alt">
                      <i className="fas fa-calendar fa-fw"></i>
                    </span>
                  </div>
                </div>

                <div className="form-group mt-1">
                  <label
                    htmlFor="startdate"
                    style={{ display: "block" }}
                    className="font-weight-bold"
                  >
                    End Date
                  </label>
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control alt alt_right"
                      name="enddate"
                      id="enddate"
                      placeholder="End Date"
                      value={this.state.enddate}
                      onChange={this.handleInputChange}
                    />
                    <span className="input-group-text bg-white alt">
                      <i className="fas fa-calendar fa-fw"></i>
                    </span>
                  </div>
                </div>

                <div className="form-group mt-1">
                  <label
                    htmlFor="exactdate"
                    style={{ display: "block" }}
                    className="font-weight-bold"
                  >
                    Created On
                  </label>
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control alt alt_right"
                      name="on"
                      id="on"
                      placeholder="Exact Date"
                      value={this.state.on}
                      onChange={this.handleInputChange}
                    />
                    <span className="input-group-text bg-white alt">
                      <i className="fas fa-calendar fa-fw"></i>
                    </span>
                  </div>
                </div>

                <div className="form-group mt-1">
                  <label
                    htmlFor="type"
                    style={{ display: "block" }}
                    className="font-weight-bold"
                  >
                    Ticket Type
                  </label>
                  <select
                    onChange={this.handleInputChange}
                    name="type"
                    id="type"
                    className="custom-select custom-select-md"
                    defaultValue=""
                    >
                      <option value="">
                      -- Select --
                    </option>
                    <option value="complaint">Complaint</option>
                    <option value="enquiry">Enquiry</option>
                    <option value="support">Support</option>
                  </select>
                </div>

            <div className="form-group mt-1 text-right">
              <button type="submit" className="btn btn-outline-dark btn-sm rounded-0 btn-md" style={{cursor:"pointer", fontSize:'16px'}}>Search</button>
            </div>
            </form>                  
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withContext(Tickets);
