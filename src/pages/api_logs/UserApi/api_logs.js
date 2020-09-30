import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import Pagination from "../../../common/components/Pagination";

class api_logs extends Component {
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
          totalLists: [
            {
                createdat: "20/07/2020 10:03pm",
                client: 'Ada Obi',
                url: 'www.url.com',
                code: 200,
                status: 'Successful'

            },
            {
                createdat: "20/07/2020 10:03pm",
                client: 'Ada Obi',
                url: 'www.url.com',
                code: 403,
                status: 'Cancelled'

            },
            {
                createdat: "20/07/2020 10:03pm",
                client: 'Ada Obi',
                url: 'www.url.com',
                code: 404,
                status: 'Failed'

            },
            {
                createdat: "20/07/2020 10:03pm",
                client: 'Ada Obi',
                url: 'www.url.com',
                code: 200,
                status: 'Successful'

            },
            {
                createdat: "20/07/2020 10:03pm",
                client: 'Ada Obi',
                url: 'www.url.com',
                code: 200,
                status: 'Successful'

            },
            {
                createdat: "20/07/2020 10:03pm",
                client: 'Ada Obi',
                url: 'www.url.com',
                code: 403,
                status: 'Cancelled'

            },
            {
                createdat: "20/07/2020 10:03pm",
                client: 'Ada Obi',
                url: 'www.url.com',
                code: 404,
                status: 'Failed'

            },
            {
                createdat: "20/07/2020 10:03pm",
                client: 'Ada Obi',
                url: 'www.url.com',
                code: 200,
                status: 'Successful'

            },
            {
                createdat: "20/07/2020 10:03pm",
                client: 'Ada Obi',
                url: 'www.url.com',
                code: 200,
                status: 'Successful'

            },
            {
                createdat: "20/07/2020 10:03pm",
                client: 'Ada Obi',
                url: 'www.url.com',
                code: 403,
                status: 'Cancelled'

            },
            {
                createdat: "20/07/2020 10:03pm",
                client: 'Ada Obi',
                url: 'www.url.com',
                code: 404,
                status: 'Failed'

            },
            {
                createdat: "20/07/2020 10:03pm",
                client: 'Ada Obi',
                url: 'www.url.com',
                code: 200,
                status: 'Successful'

            },
          ],
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
      <div>
        <div className="row m-4 d-flex justify-content-end ">
          <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3  hover-effect">
            <div className="px-3 card py-4">
              <div className="row align-items-center">
                <div className="col">
                <i className=" border-radius-4 fa fa-chart-line py-3 px-4 text-white btn-primary fa-2x"></i>
                </div>
                <div className="col font-card text-right">
                  <span className=" ">Total Api Logs</span>
                  <br />
                  <span className="text-large">230</span>
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
                  <span className=" ">Successful</span>
                  <br />
                  <span className="text-large">230</span>
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
                  <span className=" ">Cancelled</span>
                  <br />
                  <span className="text-large">230</span>
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
                  <span className=" ">Failed</span>
                  <br />
                  <span className="text-large">230</span>
                </div>
              </div>
            </div>
          </div>
        </div>

     
      <div className="container-fluid row">
      <div className="col-md-9 col-sm-12 box1 mb-3" id="profile">
            {this.state.totalLists.length === 0 ? (
              <div className="alert alert-warning mt-5" role="alert">
                <h6 className="text-center">No API logs records!</h6>
              </div>
            ) : (
              <div>
                <div
                  id="table"
                  className="card pt-2 mt-3 justify-content-center shadow px-2"
                >      
                <div className="card-header bg-medium font-weight-bold text-dark">
                    API USAGE STATISTICS
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
                          <th>Client</th>
                          <th>Request</th>
                          <th>Status code</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.currentLists.map((request, index) => {
                          return (
                            <tr>
                            <td className="table-padding">
                              {request.createdat}
                            </td>
                              {this.state.user.role == "admin" && (
                                <td onClick={this.handleRoute}
                                className="table-padding">
                                  {request.client}
                                </td>
                              )}
                              <td className="table-padding">{request.url}</td>
                              <td className="table-padding">
                                <span className={request.code == '200' ? 'text-success' : 'text-danger'} >{request.code}</span>
                              </td>
                              <td className="table-padding"
                                style={{ minWidth: "100px", maxWidth: "100px" }}
                              >
                                <span className={request.code == '200' ? 'text-success' : 'text-danger' }>{request.status}</span>
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
                          this.setState({ numberPerPage: e.target.value });
                        }}
                        style={{ maxWidth: "180px" }}
                        name="page"
                        id="page"
                        className=" form-control form-select form-select-sm"
                      >
                        <option value="10" selected>
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
                <i class="fa fa-filter"></i> FILTER BY
                </div>
                <div className="p-3">
                <label
                htmlFor="customer"
                style={{ display: "block" }}
                className="font-weight-bold"
              >
                Client
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
                {this.state.users.map((user) => (
                  <option value={user.firstname + " " + user.lastname} />
                ))}
                {this.state.clients.map((client) => (
                  <option value={client.businessname} />
                ))}
              </datalist>

              <label
                htmlFor="ticketid"
                style={{ display: "block" }}
                className="mt-3 font-weight-bold"
              >
                Request
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
                    className=" form-control form-select form-select-sm"
                  >
                    <option value="" disabled selected>
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

export default withContext(api_logs);
