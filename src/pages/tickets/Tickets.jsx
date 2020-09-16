import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../common/global_constant";
import { withContext } from "../../common/context";
import { Link } from "react-router-dom";

class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      currentPage: 1,
      numberPerPage: 10,
      id: 1,
      currentList: [],
    };
  }

  componentDidMount() {
  
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
      for (let i = 0; i < this.state.tickets.length; i++) {
        tickets.push(this.state.tickets[i]);
      }
      this.setState({ tickets });
    }
  }

  ticketStatusUpdated(e, ticket) {
    const tickets = this.state.tickets.map((item) => {
      console.log(e.target.value);
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
    if (res["status"]) {
    }
  }

  handleSearch() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        console.log(td, td.textContent, td.innerText, "td")
        txtValue = td.textContent || td.innerText;
        if (txtValue.indexOf(filter) !== '') {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="w-100 text-center">
            <h3>TICKET LIST </h3>
          </div>

          <div className="col-md-12 mb-3" id="profile">
            { this.state.tickets.length === 0 ? (
              <div className="card-body">
                <div className="alert alert-warning" role="alert">
                  <h6 className="text-center">No ticket records!</h6>
                </div>
              </div>
            ) : (
            (
              <div>
                <div className="row mt-2">
                  <div className="col-md-5">
                    <input className="form-control" type="text" id="myInput" onKeyUp={this.handleSearch} placeholder="Search for ticket..." title="Type in something"/>
                  </div>
                </div>
                <div
                  id="table"
                  className="card pt-2 mt-3 justify-content-center shadow px-2"
                >
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart" id="myTable">
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
                        {this.state.tickets.map((ticket,index) => {
                          return (
                            <tr>
                            <td>{ index + 1}</td>
                              <td>
                                {
                                  ticket.createdat
                                }
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
                  </div>
                </div>
              </div>
              )
            )}
          </div>
        </div>

        {/* <div className="row justify-content-center text-center">
                <div className="pagination">
                        <a href="#">&laquo;</a>
                        <a href="#">1</a>
                        <a className="active" href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#">6</a>
                        <a href="#">&raquo;</a>
                    </div> 
               </div> */}
      </div>
    );
  }
}

export default withContext(Tickets);
