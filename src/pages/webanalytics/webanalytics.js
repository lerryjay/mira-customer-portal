import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../common/global_constant";
import { withContext } from "../../common/context";
import Pagination from "../../common/components/Pagination";

class webanalytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ...this.props,
          limit: "",
          startdate: "",
          enddate: "",
          pageno: "",
          on: "",
          searchUser: "",
          clients: [],
          currentPage: 1,
          numberPerPage: 10,
          totalLists: [],
          pageNumbers: [],
          isloading: true,
          currentLists: [],
        };
      }

      
      async  componentDidMount() {
        this.state.showLoader();
        await this.getAnalytics();
        this.state.hideLoader();
      }

      async getAnalytics() {
        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
                
        const res = await fetch(
          HTTPURL + `weblog/filter?userid=${this.state.user.userid}`,
          {
            method: "GET",
            headers: headers,
          }
        ).then((response) => response.json());
    
        if (res["status"]) {
        this.setState({ totalLists: res["data"], isloading: false });
        this.getPageNo();

      }
    }
  
    async getPageNo() {
      const { currentPage, numberPerPage } = this.state;
  
      const headers = new Headers();
      headers.append("API-KEY", APIKEY);
      await fetch(
        HTTPURL +
          `weblog/filter?userid=${this.state.user.userid}&pageno=${currentPage}&limit=${numberPerPage}`,
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
          `weblog/filter?userid=${this.state.user.userid}&pageno=${newPage}&limit=${numberPerPage}`,
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
          `weblog/filter?userid=${this.state.user.userid}&limit=${pagelimit}`,
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
  

      handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };
    
      handleSearch = async (e) => {
        e.preventDefault();
    
        const { user, startdate, enddate, on } = this.state;
    
        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
         await fetch(
          HTTPURL +
            `weblog/fliter?userid=${user.userid}&on=${on}&startdate=${startdate}&enddate=${enddate}`,
          {
            method: "GET",
            headers: headers,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.status) this.setState({ course: data.data });
          });
      };
    
      render() {
    return (
      <div className="container">
          <div className="w-100 text-center">
                <h3  className="text-uppercase">Web Analytics </h3>
              </div>
              
           {!this.state.isloading &&
        <div className="row">
        <div className="col-md-12 col-sm-12 box1 mb-3" id="profile">
        {this.state.totalLists.length === 0 ? (
              <div className="alert alert-warning mt-5" role="alert">
                <h6 className="text-center">There are currently no logs available!</h6>
              </div>
            ) : (
              <div>
                  <div className="row">
                  <div className="col-md-12 col-sm-12 mt-3 mb-3">
            {/* <div className="card"> */}
                {/* <div className="card-header bg-medium font-weight-bold text-dark">
                <i className="fa fa-filter"></i> FILTER BY
                </div> */}
                <div className=" py-2">
                <form onSubmit={this.handleSearch}>

                <div className="row">
                    

                <div className="col-md-3">
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
                      className="form-control form-control-sm alt alt_right"
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
                </div>

               <div className="col-md-3">
               <div className="form-group mt-3">
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
                      className="form-control form-control-sm alt alt_right"
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

               </div>
               
               <div className="col-md-3">
               <div className="form-group mt-3">
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
                      className="form-control form-control-sm alt alt_right"
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
               </div>
               
               <div className="col-md-3">
          <label
                htmlFor="ticketid"
                style={{ display: "block" }}
                className="mt-3 font-weight-bold"
              >
                Search
              </label>
              <input
                className="form-control form-control-sm"
                type="text"
                id="myInput"
                onChange={this.handleInputChange}
                placeholder="Search..."
                title="Type in something"
              />
              </div>

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
            {/* </div> */}
          </div>
                  </div>
                <div
                  id="table"
                  className="card pt-2 justify-content-center shadow px-2"
                >
                <div className="card-header bg-medium font-weight-bold text-dark">
                    WEB ANALYTICS
                    <span className="float-right" id='download' style={{ cursor: 'pointer' }} ><i className="fas fa-download "></i>
                    </span>
                </div>
                  <div className="table-responsive">
                    <table
                      className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart"
                      id="myTable"
                    >
                      {/* <caption>Hello World!</caption> */}
                      <thead>
                        <tr>
                          <th className="table-padding">Date & Time</th>
                          <th>URL</th>
                          <th>Page</th>
                          <th>Session ID</th>
                          <th>Device</th>
                          <th>Browser</th>
                          <th>Location</th>
                          <th>IP Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.currentLists.map((analytic, index) => {
                          return (
                            <tr key={index}>
                            <td className="table-padding">
                              {analytic.created_at}
                            </td>
                              <td className="table-padding">{analytic.url}</td>
                              <td className="table-padding">{analytic.page}</td>
                              <td className="table-padding">{analytic.sessionid}</td>
                              <td className="table-padding">{analytic.device}</td>
                              <td className="table-padding">{analytic.browser}</td>
                              {this.state.user.role == "admin" && (
                                <td
                                className="table-padding">
                                  {analytic.location}
                                </td>
                              )}
                              <td className="table-padding">{analytic.ip}</td>
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

        </div>
      }
      </div>
    );
  }
}

export default withContext(webanalytics);
