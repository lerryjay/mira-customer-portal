import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../common/global_constant";
import { withContext } from "../../common/context";
import Pagination from "../../common/components/Pagination";

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
        };
      }

      componentDidMount() {
        this.getTransactions();
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
        
        this.state.showLoader();

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
        
        let clientid = this.props.location.pathname.split("/")[2];
    
        const res = await fetch(
          HTTPURL + `wallet/transactions?&userid=${this.state.user.userid}&clientid=${clientid}`,
          {
            method: "GET",
            headers: headers,
          }
        ).then((response) => response.json());
    
        if (res["status"]) {
          this.setState({ totalLists: res["data"] });
          this.getPageNo();
          
          this.state.hideLoader();
        }
        
        this.state.hideLoader();
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
            this.setState({currentLists: data.data})
          });
      }
    
    
      update = (newPage) => {   
          // Update page number
     
        const {numberPerPage} = this.state;
    
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
            this.setState({currentLists: data.data})
          });
    
      };
    
      getpageLimit (pagelimit) {  
    
        this.setState({numberPerPage: pagelimit});
    
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
            this.setState({currentLists: data.data})
          });
      };
    
    
      render() {

    return (
      <div className="container">
      <div className="row my-4 d-flex justify-content-end ">
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3  hover-effect">
          <div className="px-3 card py-4">
            <div className="row align-items-center">
              <div className="col">
              <i className=" border-radius-4 fa fa-chart-line py-3 px-4 text-white btn-primary fa-2x"></i>
              </div>
              <div className="col font-card text-right">
                <span className=" ">Total<br/> Transactions</span>
                <br />
                <span className="text-large">{this.state.totalLists.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3 hover-effect">
          <div className="px-3 card py-4">
            <div className="row align-items-center">
              <div className="col">
              <i className=" border-radius-4 fa fa-check-circle py-3 px-4 text-white bg-success fa-2x"></i>
              </div>
              <div className="col font-card text-right">
                <span className=" ">Successful<br/> Transactions</span>
                <br />
                <span className="text-large">0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3 hover-effect">
          <div className="px-3 card py-4">
            <div className="row align-items-center">
              <div className="col">
              <i className=" border-radius-4 fab fa-bandcamp py-3 px-4 text-white bg-orangered fa-2x"></i>
              </div>
              <div className="col font-card text-right">
                <span className=" ">Cancelled<br/> Transactions</span>
                <br />
                <span className="text-large">0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3 hover-effect">
          <div className="px-3 card py-4">
            <div className="row align-items-center">
              <div className="col">
              <i className=" border-radius-4 fa fa-times-circle py-3 px-4 text-white bg-danger fa-2x"></i>
              </div>
              <div className="col font-card text-right">
                <span className=" ">Failed <br/> Transactions</span>
                <br />
                <span className="text-large">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        
        <div className="row">
        <div className="col-md-9 col-sm-12 box1 mb-3" id="profile">
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

            {this.state.pageNumbers && (
              <div className="row mt-5">
                <div className="col-md-4">
                  <div className="form-group mt-1">
                    {this.state.totalLists.length > 0 && (
                      <select
                      onChange={(e) => {
                        this.getpageLimit(e.target.value);
                      }}
                        style={{ maxWidth: "180px" }}
                        name="page"
                        id="page"
                        className="custom-select custom-select-sm"
                        defaultValue="10"
                      >
                        <option value="10" >
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
            <div className="card">
                <div className="card-header bg-medium font-weight-bold text-dark">
                <i className="fa fa-filter"></i> FILTER BY
                </div>
                <div className="p-3">
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
                Product
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
                    Status Type
                  </label>
                  <select
                    onChange={this.handleInputChange}
                    name="type"
                    id="type"
                    className="custom-select custom-select-sm"
                    defaultValue=""
                    >
                    <option value="" disabled>
                      -- Select --
                    </option>
                    <option value="successful">Successful</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                <div className="form-group mt-1 text-right">
                  <button
                    type="submit"
                    className="btn btn-primary btn-md"
                    style={{ cursor: "pointer", fontSize: "16px" }}
                  >
                    Search
                  </button>
                </div>
              </form>
              </div>
            </div>
          </div>
      
        </div>
     
      </div>
    );
  }
}

export default withContext(transaction);
