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
      totalLists: [],
      pageNumbers: [],
      currentLists: [],
      tickets: [],
      showmodal: true,
      selectedTicket: {},
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
    this.state.showLoader();
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
      this.setState({tickets , totalLists: res["data"].total });
      this.getPageNo();
      
      this.state.hideLoader();
    }
  }

  async getPageNo() {
    const { currentPage, numberPerPage } = this.state;

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    await fetch(
      HTTPURL +
        `ticket?userid=${this.state.user.userid}&pageno=${currentPage}&limit=${numberPerPage}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({currentLists: data.data["tickets"]})
      });
  }


  update = (newPage) => {   
      // Update page number
 
    const {numberPerPage} = this.state;

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
     fetch(
      HTTPURL +
        `ticket?userid=${this.state.user.userid}&pageno=${newPage}&limit=${numberPerPage}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({currentLists: data.data["tickets"]})
      });

  };

  getpageLimit (pagelimit) {  

    this.setState({numberPerPage: pagelimit});

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    fetch(
      HTTPURL +
        `ticket?userid=${this.state.user.userid}&limit=${pagelimit}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({currentLists: data.data})
      });
  };

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
    await fetch(HTTPURL + `ticket/updatestatus`, {
      method: "POST",
      headers: headers,
      body: form,
    }).then((response) => response.json())
    .then(data => {
      this.getTickets();
      this.state.showAlert("success", data.message)
    })
  }

  handleSearch = async (e) => {
    e.preventDefault();

    const { user, userid, type, startdate, enddate, on } = this.state;

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    await fetch(
      HTTPURL +
        `ticket?userid=${user.userid}&clientid=${userid}&on=${on}&startdate=${startdate}&enddate=${enddate}&type=${type}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status) this.setState({ tickets: data.data.tickets });
      });
  };

  closedeleteModal() {
    let modal = document.getElementById("deleteModal");
    modal.style.display = "none";
  }

  async showdeleteModal(ticketid) {
    const selectedTicket = this.state.tickets.tickets.find(item => item.id === ticketid);
    await this.setState({ selectedTicket });
    let modal = document.getElementById("deleteModal");
    modal.style.display = "block";
  }

  async deleteModal() {
    this.setState({ loading: true });
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    const res = await fetch(HTTPURL + `ticket/delete?userid=${this.state.user.userid}&ticketid=${this.state.selectedTicket.id}`, {
      method: "GET",
      headers: headers,
    }).then((response) => response.json())
    this.setState({ loading: false });
    if (res.status) {
      this.getTickets();
      this.state.showAlert('success', "Deleted Successfully!");
      let modal = document.getElementById("deleteModal");
      modal.style.display = "none";
    }
    else{
      this.state.showAlert('danger', res.message);
    }
    this.setState({ updateData: true });
    return res;
  }


  render() {
    return (
      <div className="container-fluid px-5">
        <div className="row mt-4">
          <div className="w-100 text-center">
            <h3>TICKETS </h3>
          </div>

          <div className="col-md-9 col-sm-12 box1 mb-3" id="profile">
            {  !this.state.loaderActive && this.state.totalLists === 0 ? (
              <div className="alert alert-warning mt-5" role="alert">
                <h6 className="text-center">No ticket records!</h6>
              </div>
            ) : (
              !this.state.loaderActive && 
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
                                
                              <span                                     
                              className="btn btn-sm ml-2 btn-danger"
                              style={{ cursor: "pointer" }}
                              onClick={() => this.showdeleteModal(ticket.id)}>
                                <i className="fa fa-trash  text-white"></i>
                              </span>
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
                    {this.state.totalLists > 0 && (
                      <select
                        onChange={(e) => {
                          this.getpageLimit(e.target.value);
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
                      totalLists={this.state.totalLists}
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
        
            {/* Delete Module Info */}
            {this.state.showmodal ?
              <div id="deleteModal" className="modal">
                {/* Modal content  */}
                <div className="modal-content modal-del text-center p-5">
                  {/* <div className="delete-icon">
                          &times;
                      </div> */}
                  <i className="fa fa-exclamation-triangle fa-3x dark-red mb-2" aria-hidden="true"></i>
                  <h3>Are you sure?</h3>
                  <p> Do you really want to delete this ticket?</p>
                  <div className="row">
                    <div className="col-md-6">
                      <button onClick={this.closedeleteModal} className="btn-block btn btn-outline-secondary mb-2">Cancel</button>
                    </div>
                    <div className="col-md-6">
                      {this.state.loading ? (
                        <button
                          type="submit"
                          className="btn btn-block btn-danger"
                        >
                          <div
                            className="spinner-border "
                            role="status"
                            id="loader"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </button>
                      ) : (
                          <button onClick={() => this.deleteModal(this.state.selectedTicket.id)} className="btn btn-danger btn-block">Delete</button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              :
              <span></span>
            }
      </div>
    );
  }
}

export default withContext(Tickets);
