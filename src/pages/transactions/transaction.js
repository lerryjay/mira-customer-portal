import React, { Component } from "react";
import { withContext } from "../../common/context";
import Paginated from "./pagination";
import { HTTPURL, APIKEY } from "../../common/global_constant";
import TransactionTable from "./transaction_table";
import DisplayCards from "./displaycards";
import FilterModal from "./filtermodal"

class transaction extends Component {
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
      isloading: true,
    };
  }

  async componentDidMount() {
    this.state.showLoader();
    await this.getTransactions();
    this.state.hideLoader();
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

  async getTransactions() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    let clientid = this.props.location.pathname.split("/")[2];

    const res = await fetch(
      HTTPURL +
        `wallet/transactions?&userid=${this.state.user.userid}&clientid=${clientid}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((response) => response.json());
    if (res["status"]) {
      this.setState({
        totalLists: res["data"].total,
        isloading: false,
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
        `wallet/transactions?userid=${this.state.user.userid}&pageno=${currentPage}&limit=${numberPerPage}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ currentLists: data.data.transactions });
      });
  }

  update = (newPage) => {
    // Update page number

    const { numberPerPage } = this.state;

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    fetch(
      HTTPURL +
        `wallet/transactions?userid=${this.state.user.userid}&pageno=${newPage}&limit=${numberPerPage}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ currentLists: data.data.transactions });
      });
  };

  getpageLimit = (pagelimit) => {
    this.setState({ numberPerPage: pagelimit });

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    fetch(
      HTTPURL +
        `wallet/transactions?userid=${this.state.user.userid}&limit=${pagelimit}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ currentLists: data.data.transactions });
      });
  };

  render() {
    return (
      <div className="container">
        {!this.state.isloading && (
          <div>
            <DisplayCards totalLists={this.state.totalLists} />

            <div className="row">
              <div className="col-sm-12 box1 mb-3" id="profile">
                {!this.state.loaderActive && this.state.totalLists === 0 ? (
                  <div className="alert alert-warning mt-5" role="alert">
                    <h6 className="text-center">No transaction records!</h6>
                  </div>
                ) : (
                  <TransactionTable
                    currentLists={this.state.currentLists}
                    role={this.state.user.role}
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
                  />
                )}
              </div>

              <FilterModal
              handleInputChange={this.handleInputChange}
              users={this.state.users}
              clients={this.state.clients}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withContext(transaction);
