/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import Paginated from "./pagination";
import TicketTable from "./ticket_table";
import DeleteModal from "./deletemodal"
import FilterModal from "./filtermodal"

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
      isloading: true,
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
    this.state.hideLoader();
    if (res["status"]) {
      let tickets = res["data"];
      this.setState({
        tickets, totalLists: res["data"].total,
        isloading: false
      });
      this.getPageNo();

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
        this.setState({ currentLists: data.data["tickets"] })
      });
  }


  update = (newPage) => {
    // Update page number

    const { numberPerPage } = this.state;

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
        this.setState({ currentLists: data.data["tickets"] })
      });

  };

  getpageLimit = (pagelimit) => {

    this.setState({ numberPerPage: pagelimit });

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
        this.setState({ currentLists: data.data["tickets"] })
      });
  };

  ticketStatusUpdated = (e, ticket) => {
    console.log(this.state.tickets);

    const tickets = this.state.tickets.tickets.map((item) => {
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



  showdeleteModal = (ticketid) => {
    console.log(ticketid)
    const selectedTicket = this.state.tickets.tickets.find(item => item.id === ticketid);
    console.log(selectedTicket)
    this.setState({ selectedTicket });
    let modal = document.getElementById("deleteModal");
    modal.style.display = "block";
  }

  deleteModal = async () => {
    console.log("deleted")
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
    else {
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

          {!this.state.isloading &&
            (
              <div className="row w-100 ">
                <div className="col-sm-12 box1 mb-3" id="profile">
                  {this.state.totalLists === 0 ? (
                    <div className="alert alert-warning mt-5" role="alert">
                      <h6 className="text-center">No ticket records!</h6>
                    </div>
                  ) : (
                      <TicketTable
                        currentLists={this.state.currentLists}
                        role={this.state.user.role}
                        ticketStatusUpdated={this.ticketStatusUpdated}
                        showdeleteModal={this.showdeleteModal}
                      />

                    )}

                  {this.state.pageNumbers && (
                    <Paginated
                      numberPerPage={this.state.numberPerPage}
                      currentPage={this.state.currentPage}
                      totalLists={this.state.totalLists}
                      pageNumbers={this.state.pageNumbers}
                      currentLists={this.state.currentLists}
                      update={this.update}
                      getpageLimit={this.getpageLimit}
                      showdeleteModal={this.showdeleteModal}
                    />
                  )}
                </div>

                <FilterModal
                  handleInputChange={this.handleInputChange}
                  users={this.state.users}
                  clients={this.state.clients}
                  handleSearch={this.handleSearch}
                  startdate={this.state.startdate}
                  enddate={this.state.enddate}
                  on={this.state.on}
                />


              </div>
            )}
        </div>


        <DeleteModal
          selectedTicket={this.state.selectedTicket}
          deleteModal={this.deleteModal}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default withContext(Tickets);
