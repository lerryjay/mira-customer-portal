/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import { Link } from "react-router-dom";
import Pagination from "../../../common/components/Pagination";
import placeholder from '../../../assets/images/product-placeholder.gif'

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      showmodal: true,
      title:'',
      description: '',
      cost: '',
      courseid: '',
      students: [],
      currentPage: 1,
      numberPerPage: 10,
      totalLists: [],
      pageNumbers: [],
      currentLists: [],
      courses: [],
      startdate: "",
      enddate: "",
      on: "",
      isloading: true,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  async componentDidMount() {
    this.state.showLoader();
    this.props.user.role === "admin" && await this.getStudents();
    await this.getCourses();
    this.state.hideLoader();
    
  }

  async getCourses() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(HTTPURL + `training/listcourses`, {
      headers: headers,
    }).then((response) => response.json());
    if (res["status"]) {
      this.setState({ courses: res["data"]});
    }
  }

  async getStudents() {

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(HTTPURL + `training/liststudents`, {
      headers: headers,
    }).then((response) => response.json());
    if (res["status"]) {
      this.setState({ students: res["data"].students, totalLists: res["data"].total, 
      isloading: false });
      this.getPageNo();
      
    }
  }

  async getPageNo() {
    const { currentPage, numberPerPage } = this.state;

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    await fetch(
      HTTPURL +
        `training/liststudents?userid=${this.state.user.userid}&pageno=${currentPage}&limit=${numberPerPage}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({currentLists: data.data["students"]})
      });
  }

  async getPageNoFilter() {
    const { currentPage, numberPerPage } = this.state;

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    await fetch(
      HTTPURL +
        `training/filter?userid=${this.state.user.userid}&pageno=${currentPage}&limit=${numberPerPage}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({currentLists: data.data["students"]})
      });
  }

  update = (newPage) => {   
      // Update page number
 
    const {numberPerPage} = this.state;

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
     fetch(
      HTTPURL +
        `training/liststudents?userid=${this.state.user.userid}&pageno=${newPage}&limit=${numberPerPage}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({currentLists: data.data["students"]})
      });

  };

  getpageLimit (pagelimit) {  

    this.setState({numberPerPage: pagelimit})
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    fetch(
      HTTPURL +
        `training/liststudents?userid=${this.state.user.userid}&limit=${pagelimit}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({currentLists: data.data["students"]})
      });
  };

  async updateModal(id) {

    const selectedStudent = this.state.totalLists.find(item => item.id == id);
    await this.setState({
      firstname: selectedStudent.firstname,
      description: selectedStudent.description,
      cost: selectedStudent.cost,
      courseid: selectedStudent.id,
    });
    let modal = document.getElementById("updateModal");
    modal.style.display = "block";
  }

  closeupdateModal() {
    let modal = document.getElementById("updateModal");
    modal.style.display = "none";
  }
  exportData() {
    let data = JSON.stringify(this.state.totalLists);
}

showFilter() {
  var filter = document.getElementById("filter-modal")
  var element = document.getElementsByClassName("main-table")

  if (filter.style.display === "none") {
    console.log("opening sidebar");
    filter.style.display = "block";
    // console.log(element[0].classList, element);
      element[0].classList.remove("col-md-12");
       element[0].classList.add("col-md-9")
  } else {
    console.log("closing sidebar");
       element[0].classList.remove("col-md-9")
      element[0].classList.add("col-md-12");
    filter.style.display = "none";
  }
}

handleSearch = async (e) => {
  e.preventDefault();

  const { user, courseid, startdate, enddate, on } = this.state;

  const headers = new Headers();
  headers.append("API-KEY", APIKEY);
  await fetch(
    HTTPURL +
      `training/filter?userid=${user.userid}&on=${on}&startdate=${startdate}&enddate=${enddate}&courseid=${courseid}`,
    {
      method: "GET",
      headers: headers,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status) this.setState({ currentLists: data.data["students"] });
      // else this.setState({totalLists: "",currentLists: [] })
    });
    
};

  render() {
   const {user} = this.state;

    return (
      <div className="container-fluid">
        {!this.state.isloading && 
          <div>
            <div className="w-100 text-center">
            <h3>Students </h3>
          </div>
          {user.role === "admin"
         ? <div className="row mt-4 mb-3 mr-2 ml-2" >
            <div className="col-md-6 d-flex justify-content-start">
            <button onClick={this.exportData()} id="exportButton" className="btn btn-sm btn-danger new_product mr-2">
              <i className="fa fa-file-excel"></i> 
              <small>Export to Excel</small>
            </button>

              <Link to="/addstudent">
                <button type="button" className="btn btn-sm btn-primary new_product mr-2">
                    <i className="fas fa-plus" aria-hidden="true">
                        <small style={{ color: '#fff' }}>&nbsp;Add&nbsp;Student</small>
                    </i>
                </button>
              </Link>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
          <button onClick={this.showFilter} type="button" className="btn btn-sm btn-primary  mr-2">
            <i className="fas fa-search" id="search-icon" aria-hidden="true">
            </i>
          </button>
            </div>
          </div> 
          : <span></span>
        }
<div className="row">
  
<div className="col-md-12 box1 mb-3 main-table" id="profile main-table">
            {this.state.totalLists === 0 ? (
              <div className="alert alert-warning mt-5" role="alert">
                <h6 className="text-center">No student records!</h6>
              </div>
            ) : (
              <div>
                <div id="table" className="mt-3 justify-content-center shadow">
                  <div className="table-responsive">
                    <table
                      data-show-export="true"
                      className="table table-hover table-bordered table-md text-center align-middle mb-0 text-dark home-chart"
                      id="myTable"
                    >
                      {/* <caption>Hello World!</caption> */}
                      <thead>
                        <tr>
                        <th>Image</th>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Telephone</th>
                          <th>Gender</th>
                          <th>Company Role</th>
                          <th>Source</th>
                          <th>Availability</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.currentLists.map((student, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                  <img style={{width: '50px'}} src={FILEURL + student.imageurl} onError={(e) => { e.target.onerror = null; e.target.src = placeholder }} />
                              </td>
                              <td>{student.createdat}</td>
                              <td>{student.lastname} {student.firstname}</td>
                              <td>{student.email}</td>
                              <td>{student.telephone}</td>
                              <td>{student.gender}</td>
                              <td>
                                {student.companyrole}
                              </td>
                              <td>
                                {student.source}
                              </td>
                              <td>
                                {student.availability}
                              </td>
                              <td
                                className="align-middle"
                                style={{ cursor: "pointer" }}
                              >
                              <Link to={() => `/viewstudent/${student.userid}`}>
                                <span
                                  className="btn btn-sm btn-primary"
                                  value={student.id}
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
                  <div className="form-group mt-totalLists1">
                    {this.state.totalLists > 0 && (
                      <select
                      onChange={(e) => {
                        this.getpageLimit(e.target.value);
                      }}
                        style={{ maxWidth: "180px" }}
                        name="page"
                        id="page"
                        className="custom-select custom-select-sm "
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

                <div className="col ">
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
                    <div className="col text-dark font-weight-bold text-right">
                      {/* <span>Showing 1 of 3 entries</span> */}
                    </div>
              </div>
            )}

          </div>
      
      
        
        
          <div className="col-md-3 col-sm-12 box2 mt-3 mb-3  filter-modal" id="filter-modal">
            <div className="card">
                <div className="card-header bg-medium font-weight-bold text-dark">
                <i className="fa fa-filter"></i> FILTER BY
                </div>
                <div className="p-3">

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
                    Course
                  </label>
                  <select
                    onChange={this.handleInputChange}
                    name="courseid"
                    id="courseid"
                    className="custom-select custom-select-sm"
                    defaultValue=""
                    >
                    <option value="" disabled>
                      -- Select --
                    </option>
                  {this.state.courses.map((course,i) => {
                    return (
                      <option key={i} value={course.id}>{course.title}</option>
                    );
                  })}
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
        }
          
      </div>
    );
  }
}

export default withContext(Students);
