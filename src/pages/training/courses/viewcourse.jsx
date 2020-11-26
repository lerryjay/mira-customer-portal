import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import avatar from "../../../assets/images/addstudent.png";
import Pagination from "../../../common/components/Pagination";
import placeholder from '../../../assets/images/product-placeholder.gif'

const FILEURL = "https://www.miratechnologies.com.ng/training-portal/public";


class viewcourse extends Component {
    state = {
      ...this.props,
      courses: [],
      title: '',
      description: '',
      cost: '',
      date:'',
      durations:'',
      imageurl: '',
      courseid: '',
      showmodal: true,
      students: [],
      currentPage: 1,
      numberPerPage: 10,
      totalLists: [],
      pageNumbers: [],
      currentLists: [],
    }

    componentDidMount() {
        this.props.user.role === "admin" && this.getCourse();
        this.getParticipants();
    }
    
    async getParticipants() {
  
      const courseid = this.props.location.pathname.split("/")[2];

      const headers = new Headers();
      headers.append("API-KEY", APIKEY);
      const res = await fetch(HTTPURL + `training/filter?userid=${this.state.user.userid}&courseid=${courseid}`, {
        headers: headers,
      }).then((response) => response.json());
      
      if (res["status"]) {
        this.setState({ students: res["data"], totalLists: res["data"].length });
        console.log(res["data"].length,res["data"] )
        this.getPageNo();
        
      }
    }
  
    async getPageNo() {
      const { currentPage, numberPerPage } = this.state;
  
      const courseid = this.props.location.pathname.split("/")[2];
  
      const headers = new Headers();
      headers.append("API-KEY", APIKEY);
      await fetch(
        HTTPURL +
          `training/filter?userid=${this.state.user.userid}&courseid=${courseid}&pageno=${currentPage}&limit=${numberPerPage}`,
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
  
      const courseid = this.props.location.pathname.split("/")[2];
  
      const headers = new Headers();
      headers.append("API-KEY", APIKEY);
       fetch(
        HTTPURL +
          `training/filter?userid=${this.state.user.userid}&courseid=${courseid}&pageno=${newPage}&limit=${numberPerPage}`,
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
  
      this.setState({numberPerPage: pagelimit})
      const courseid = this.props.location.pathname.split("/")[2];

      const headers = new Headers();
      headers.append("API-KEY", APIKEY);
      fetch(
        HTTPURL +
          `training/filter?userid=${this.state.user.userid}&courseid=${courseid}&limit=${pagelimit}`,
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



    async getCourse() {
      this.state.showbtmLoader();

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
        const res = await fetch(HTTPURL + `training/listcourses`, {
            headers: headers,
        }).then((response) => response.json());
        if (res["status"]) {
            this.setState({ courses: res["data"]});

            const courseid = this.props.location.pathname.split("/")[2];
    
            const selectedCourse = this.state.courses.find(course => course.id == courseid);
            await this.setState({
              title: selectedCourse.title,
              description: selectedCourse.description,
              cost: selectedCourse.cost,
              date: selectedCourse.createdat,
              durations: selectedCourse.durations,
              imageurl: selectedCourse.imageurl,
              courseid: selectedCourse.id
            });
        }
        this.state.hidebtmLoader();
    }

    closedeleteModal() {
      let modal = document.getElementById("suspendModal");
      modal.style.display = "none";
    }
  
     showdeleteModal(courseid) {
      let modal = document.getElementById("suspendModal")
      modal.style.display = "block";
    }
  
    deleteCourse = async () => {
     
    const headers = new Headers();
    headers.append('API-KEY', APIKEY);

    fetch(HTTPURL + `training/deletecourse?userid=${this.state.user.userid}&courseid=${this.state.courseid}`, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(async data => {
            if(data.status === true) {
                this.state.showAlert("success", data.message);
                let modal = document.getElementById("suspendModal")
                modal.style.display = "none";
                this.props.history.push('/courses');

            } else{
                this.state.showAlert("danger",  data.message)
            }
        });
          
    }
  
  
    
    render() {
        return (
            <div className="container-fluid row mx-auto">
                
                <div className="row">
               <div className="col-md-12 mb-3 mt-4" id="profile">
          <div className="w-100 text-center">
            <h3>COURSE INFORMATION </h3>
          </div>

          </div>
        
          {!this.state.loaderActive && <div className="col-md-4 mb-3">
          <div className="card">
          {this.state.imageurl 
                  ?<img
                  src={FILEURL + this.state.imageurl }
                  alt=""
                  className="card-img-top"
                  style={{height:'250px', objectFit:'cover'}}
                  />
                :<img
                src={avatar}
                alt=""
                className="card-img-top"
                style={{height:'250px', objectFit:'cover'}}
                // height="170px"
                // width="170px"
                // style={{ marginTop: "-80px" }}
              />
                }
            <div className="card-body">
              <h5 className="card-title">
                {this.state.title}
                </h5>
            </div>
          </div>
        </div>
    }

            {!this.state.loaderActive && <div className="col-md-8 mb-3">
                <div className="card pb-4">
                  <div className="card-body">
                    <h4>Course Description</h4>
                    <p>
                    {this.state.description}
                    </p>
            <ul className="list-group list-group-flush">
                    <li className="list-group-item"><i className="fa fa-calendar text-purple mr-3"></i> Duration <span className="float-right"> {this.state.duration}</span> </li>
                    <li className="list-group-item"><i className="fa fa-credit-card text-purple mr-3"></i> Fees <span className="float-right">&#8358; {this.state.cost}</span> </li>
                    <li className="list-group-item"><i className="fa fa-users text-purple mr-3"></i> Participants <span className="float-right"> {this.state.participant}</span> </li>
                  
            </ul>
            </div>
                  <div className="col-md-12">

                      <Link to={() => `/editcourse/${this.state.courseid}`}>
                        <button
                          type="button"
                          className="btn mt-3 m-2 btn-primary mb-2"
                        >
                          <small className="newproduct" style={{ color: "#fff" }}>
                            &nbsp;Edit&nbsp;Course&nbsp;
                          </small>
                        </button>
                      </Link>
                      <button
                        onClick={() =>
                          this.showdeleteModal(
                            this.state.courseid
                          )
                        }
                        type="button"
                        className="btn mt-3 m-2 btn-danger mb-2"
                      >
                        <small
                          className="newproduct"
                          style={{ color: "#fff" }}
                        >
                          &nbsp;Delete Course&nbsp;
                        </small>
                      </button>
                </div>

                </div>
          </div>
    }

            
{!this.state.loaderActive && <div className="col-md-12 box1 mb-3" id="profile">
            {!this.state.loaderActive && this.state.totalLists === 0 ? (
              <div className="alert alert-warning mt-5" role="alert">
                <h6 className="text-center">No student records!</h6>
              </div>
            ) : (
              <div>
                <div id="table" className="card pt-2 mt-3 justify-content-center shadow px-2">
                <div className="card-header bg-medium font-weight-bold text-dark">
                    PARTICIPANTS
                </div>
                  <div className="table-responsive">
                    <table
                      data-show-export="true"
                      className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart"
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
                          <th>Payment Status</th>
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
                              <td>
                                {new Date(
                                  student.created_at
                                ).toLocaleDateString()}
                              </td>
                              <td>{student.lastname} {student.firstname}</td>
                              <td>{student.email}</td>
                              <td>{student.telephone}</td>
                              <td>{student.gender}</td>
                              <td>
                                {student.paymentstatus}
                              </td>
                              <td
                                className="align-middle"
                                style={{ cursor: "pointer" }}
                              >
                              <Link to={() => `/viewstudent/${student.user_id}`}>
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
                  <div className="form-group mt-1">
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
    }
    
                </div>

                {/* Delete Course */}
              {this.state.showmodal ? (
                <div id="suspendModal" className="modal">
                  {/* Modal content  */}
                  <div className="modal-content modal-del text-center p-5">
                    {/* <div className="delete-icon">
                          &times;
                      </div> */}
                    <i
                      className="fa fa-exclamation-triangle fa-3x dark-red mb-2"
                      aria-hidden="true"
                    ></i>
                    <h3>Are you sure?</h3>
                    <p> Do you really want to delete this course?</p>
                    <div className="row">
                      <div className="col-md-6">
                        <button
                          onClick={this.closedeleteModal}
                          className="btn-block btn btn-outline-secondary mb-2"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-md-6">
                        {this.state.loading ? (
                          <button
                            type="submit"
                            className="btn btn-block btn-danger"
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
                            onClick={() =>
                              this.deleteCourse(this.state.courseid)
                            }
                            className="btn btn-danger btn-block"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <span></span>
              )}
            </div>
        )
    }
}
export default withContext(viewcourse);