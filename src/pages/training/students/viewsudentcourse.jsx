import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import avatar from "../../../assets/images/addstudent.png";


class viewstudentcourse extends Component {
    state = {
      course: [],
      showmodal: true
    }

    componentDidMount() {
        this.props.user.role === "admin" && this.getCourse();
    }
    
    async getCourse() {
       
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    const studentid = this.props.location.pathname.split("/")[3];
    const courseid = this.props.location.pathname.split("/")[2];

    const res = await fetch(HTTPURL + `training/studentprofile?studentid=${studentid}&userid=${this.props.user.userid}`, {
      headers: headers,
    }).then((response) => response.json());
    if (res["status"]) {
         const courses = res["data"].courses
         const selectedCourse = courses.find(
          (course) => course.id === courseid
        );
        this.setState({
          course : selectedCourse
        });
  }
    }

    closedeleteModal() {
      let modal = document.getElementById("suspendModal");
      modal.style.display = "none";
    }
  
     showdeleteModal(courseid) {
      const selectedCourse = this.state.course.courses.find(
        (course) => course.id === courseid
      );

      let modal = document.getElementById("suspendModal")
      modal.style.display = "block";
    }
  
    deleteCourse = async () => {
     
          
    }
  
  
    
    render() {
        return (
            <div className="container-fluid mx-auto">
                
                <div className="row">
               <div className="col-md-12 mb-3 mt-4" id="profile">
          <div className="w-100 text-center">
            <h3>COURSE INFORMATION </h3>
          </div>

          </div>
        
   <div className="col-md-4">
          <div className="card">
          {this.state.course.imageurl 
                  ?<img
                  src={FILEURL + this.state.course.imageurl }
                  alt=""
                  className="image_sidebar"
                  height="170px"
                  width="170px"
                  style={{ marginTop: "-80px" }}
                />
                :<img
                src={avatar}
                alt=""
                className="card-img-top"
                // height="170px"
                // width="170px"
                // style={{ marginTop: "-80px" }}
              />
                }
            <div className="card-body">
              <h5 className="card-title">
                {this.state.course.title}
                </h5>
            </div>
          </div>
        </div>

          <div className="col-md-8">
                <div className="card pb-4">
                  <div className="card-body">
                    <h4>Course Description</h4>
                    <p>
                    {this.state.course.description}
                    </p>
            <ul className="list-group list-group-flush">
                    <li className="list-group-item"><i className="fa fa-credit-card text-purple mr-3"></i> Fees <span className="float-right">&#8358;{this.state.course.cost}</span> </li>
                    <li className="list-group-item"><i className="fa fa-wallet text-purple mr-3"></i> Payment Status <span className="float-right">{this.state.course.paymentstatus}</span> </li>
                    <li className="list-group-item"><i className="fab fa-cc-paypal text-purple mr-3"></i>Pay Option <span className="float-right">{this.state.course.payoption}</span> </li>
                    <li className="list-group-item"><i className="fa fa-calendar-alt text-purple mr-3"></i> Payment Date <span className="float-right">{this.state.course.paymentdate}</span> </li>
                  
            </ul>
            </div>
                  <div className="col-md-12">


                        <button
                          type="button"
                          className="btn mt-3 m-2 btn-primary mb-2"
                        >
                          <small className="newproduct" style={{ color: "#fff" }}>
                            &nbsp;Edit&nbsp;Course&nbsp;
                          </small>
                        </button>
                        
                      <button
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


                
                </div>

                {/* Delete Course */}
              {this.state.course.showmodal ? (
                <div id="suspendModal" class="modal">
                  {/* Modal content  */}
                  <div class="modal-content modal-del text-center p-5">
                    {/* <div className="delete-icon">
                          &times;
                      </div> */}
                    <i
                      class="fa fa-exclamation-triangle fa-3x dark-red mb-2"
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
                        {this.state.course.loading ? (
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
                              this.deleteCourse(this.state.course.courseid)
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
export default withContext(viewstudentcourse);