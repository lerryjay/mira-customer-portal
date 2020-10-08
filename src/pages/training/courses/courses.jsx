/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import { Link } from "react-router-dom";
import Pagination from "../../../common/components/Pagination";
import placeholder from '../../../assets/images/product-placeholder.gif'

class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      showmodal: true,
      title:'',
      description: '',
      cost: '',
      courseid: '',
      courses: [],
      currentPage: 1,
      numberPerPage: 10,
      totalLists: [],
      pageNumbers: [],
      currentLists: [],
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.props.user.role === "admin" && this.getCourses();
  }

  async getCourses() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(HTTPURL + `training/listcourses`, {
      headers: headers,
    }).then((response) => response.json());
    if (res["status"]) {
      this.setState({ courses: res["data"], totalLists: res["data"] });
    }
  }

  async updateModal(id) {

    const selectedCourse = this.state.totalLists.find(item => item.id == id);
    await this.setState({
      title: selectedCourse.title,
      description: selectedCourse.description,
      cost: selectedCourse.cost,
      courseid: selectedCourse.id,
    });
    let modal = document.getElementById("updateModal");
    modal.style.display = "block";
  }

  closeupdateModal() {
    let modal = document.getElementById("updateModal");
    modal.style.display = "none";
  }

  handleUpdate = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    let formdata = new FormData();
    formdata.append("title", this.state.title);
    formdata.append("description", this.state.description);
    formdata.append("cost", this.state.cost);
    formdata.append("userid", this.state.user.userid);
    formdata.append("courseid", this.state.courseid);

    const res = await fetch(HTTPURL + "training/updatecourse", {
      method: "POST",
      body: formdata,
      headers: headers,
    }).then((response) => response.json())
    this.setState({ loading: false });
    if (res.status) {
      this.getCourses();
      this.state.showAlert('success',res.message)
      let modal = document.getElementById("updateModal");
      modal.style.display = "none";
    }
    else{
      this.state.showAlert('danger', res.message);
    }
    this.setState({ updateData: true });
    return res;
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
    const { numberPerPage, currentPage, totalLists ,user} = this.state;

    // Logic for displaying current lists
    const indexOfLastList = currentPage * numberPerPage;
    const indexOfFirstList = indexOfLastList - numberPerPage;
    const currentLists = totalLists.slice(indexOfFirstList, indexOfLastList);
    this.state.currentLists = currentLists;

    return (
      <div className="container-fluid px-5">
          <div className="w-100 text-center">
            <h3>Courses </h3>
          </div>

          {user.role === "admin"
         ? <div className="row mt-4 d-flex justify-content-end mb-3 mr-2" >
              <Link to="/addcourse">
                <button type="button" className="btn btn-sm btn-primary new_product">
                    <i className="fas fa-plus" aria-hidden="true">
                        <small className="newproduct" style={{ color: '#fff' }}>&nbsp;Add&nbsp;Course</small>
                    </i>
                </button>
              </Link>
          </div> 
          : <span></span>
        }

          <div className="col-md-12 col-sm-12 box1 mb-3" id="profile">
            {this.state.totalLists.length === 0 ? (
              <div className="alert alert-warning mt-5" role="alert">
                <h6 className="text-center">No course records!</h6>
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
                          <th>Image</th>
                          <th>Course</th>
                          <th>Cost</th>
                          <th>Participant</th>
                          <th>Duration</th>
                          <th>Date Added</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.currentLists.map((course, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                  <img style={{width: '50px'}} src={FILEURL + course.imageurl} onError={(e) => { e.target.onerror = null; e.target.src = placeholder }} />
                              </td>
                              <td>{course.title}</td>
                              <td>{course.cost}</td>
                              <td>{course.participant}</td>
                              <td>{course.duration}</td>
                              <td>
                                {new Date(
                                  course.createdat
                                ).toLocaleDateString()}
                              </td>
                              <td
                                className="align-middle"
                                style={{ cursor: "pointer" }}
                              >
                              <Link to={() => `/viewcourse/${course.id}`}>
                                <span
                                  className="btn btn-sm btn-primary"
                                  value={course.id}
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
                    {this.state.totalLists.length > 0 && (
                      <select
                        onChange={(e) => {
                          this.setState({ numberPerPage: e.target.value });
                        }}
                        style={{ maxWidth: "180px" }}
                        name="page"
                        id="page"
                        className=" form-control form-select form-select-sm"
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

             {/* Update module info */}
             {this.state.showmodal ? (
              <div id="updateModal" className="modal">
                {/* Modal content  */}
                <div className="modal-content pt-5 pb-2">
                  <form onSubmit={this.handleUpdate}>
                    <div className="card">
                      <div className="card-header bg-medium font-weight-bold text-dark text-center">
                        EDIT COURSE
                    </div>

                      <div className="card-body">
                        <div className="row">

                        <div className="col-md-12 mb-1">
                            <div className="form-group">
                              <label htmlFor="" className="sr-only">
                                Course Title
                            </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="title"
                                id="title"
                                placeholder="Course Title"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>

                          
                          <div className="col-md-12 mb-1">
                            <div className="form-group">
                              <label htmlFor="" className="sr-only">
                                Course Description
                            </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="description"
                                id="description"
                                placeholder="Course Description"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>

                          
                          <div className="col-md-12 mb-1">
                            <div className="form-group">
                              <label htmlFor="" className="sr-only">
                                Cost
                            </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="cost"
                                id="cost"
                                placeholder="Cost"
                                value={this.state.cost}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>


                        </div>



                        <div className="row">
                          <div className="col-md-6">
                            <button
                              type="button"
                              onClick={this.closeupdateModal}
                              className="btn-block btn btn-outline-secondary mb-2"
                            >
                              Cancel
                          </button>
                          </div>
                          <div className="col-md-6">
                            {this.state.loading ? (
                              <button
                                type="submit"
                                className="btn btn-block btn-primary"
                              >
                                <div
                                  className="spinner-border text-white"
                                  role="status"
                                  id="loader"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </button>
                            ) : (
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-block"
                                >
                                  <i className="fas fa-folder-open mr-2"></i>
                              Update
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
                <span></span>
              )}

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
                  <p> Do you really want to delete this service?</p>
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
                          <button onClick={() => this.deleteModal(this.state.selectedCourse.id)} className="btn btn-danger btn-block">Delete</button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              :
              <span></span>
            }
          </div>
      </div>
    );
  }
}

export default withContext(Tickets);
