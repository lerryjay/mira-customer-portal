import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import avatar from "../../../assets/images/addstudent.png";


class viewcourse extends Component {
    state = {
      students: [],
      lastname: '',
      firstname: '',
      othername: '',
      telephone: '',
      email: '',
      showmodal: true
    }

    componentDidMount() {
        this.props.user.role === "admin" && this.getStudent();
    }
    
    async getStudent() {
        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
        const res = await fetch(HTTPURL + `training/liststudents`, {
            headers: headers,
        }).then((response) => response.json());
        if (res["status"]) {
            this.setState({ students: res["data"]});

            const studentid = this.props.location.pathname.split("/")[2];
    
            const selectedStudent = this.state.students.find(student => student.userid == studentid);
            await this.setState({
              lastname: selectedStudent.lastname,
              firstname: selectedStudent.firstname,
              othername: selectedStudent.othername,
              telephone: selectedStudent.telephone,
              email: selectedStudent.email
            });
        }
    }
    closedeleteModal() {
      let modal = document.getElementById("suspendModal");
      modal.style.display = "none";
    }
  
     showdeleteModal(studentid) {
      const selectedStudent = this.state.students.find(
        (student) => student.userid === studentid
      );
      this.setState({
        lastname: selectedStudent.lastname,
        firstname: selectedStudent.firstname,
        othername: selectedStudent.othername,
        telephone: selectedStudent.telephone,
        email: selectedStudent.email
      });

      let modal = document.getElementById("suspendModal")
      modal.style.display = "block";
    }
  
    deleteCourse = async () => {
     
          
    }
    
    render() {
        return (
            <div className="container-fluid mx-auto">
                
                <div className="row">
                {!this.state.loader &&  <div className="col-md-12 mb-3 mt-4" id="profile">
          <div className="w-100 text-center">
            <h3>STUDENT INFORMATION </h3>
          </div>

          <div className="row mt-4">
            <div className="col-md-4 text-center mb-3" id="profilePix">
              <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                {this.state.imageurl 
                  ?<img
                  src={FILEURL + this.state.imageurl }
                  alt=""
                  className="image_sidebar"
                  height="170px"
                  width="170px"
                  style={{ marginTop: "-80px" }}
                />
                :<img
                src={avatar}
                alt=""
                className="image_sidebar"
                height="170px"
                width="170px"
                style={{ marginTop: "-80px" }}
              />
                }
                </div>
              </div>
            </div>

            <div className="col-md-8 ">
              <h3 className="text-dark">
                {this.state.title}
              </h3>
              
              <div className="row mt-3">
                <div className="col-md-12">
                <h6>
                    {" "}
                    <span className="font-weight-bold">Lastname:</span>{" "}
                    {this.state.lastname}
                  </h6>
                  <h6>
                    {" "}
                    <span className="font-weight-bold">Firstname:</span>{" "}
                    {this.state.firstname}
                  </h6>
                  <h6>
                    {" "}
                    <span className="font-weight-bold">Othername:</span>{" "}
                    {this.state.othername}
                  </h6>
                  <h6>
                    {" "}
                    <span className="font-weight-bold">Telephone:</span>{" "}
                    {this.state.telephone}
                  </h6>
                  <h6>
                    {" "}
                    <span className="font-weight-bold">Email:</span>{" "}
                    {this.state.email}
                  </h6>
                  <div className="row">

                    <Link to={() => `/editstudent/${this.state.courseid}`}>
                      <button
                        type="button"
                        className="btn mt-3 m-2 btn-primary mb-2"
                      >
                        <small className="newproduct" style={{ color: "#fff" }}>
                          &nbsp;Edit&nbsp;Student&nbsp;
                        </small>
                      </button>
                    </Link>
                    <Link
                      onClick={() =>
                        this.showdeleteModal(
                          this.state.courseid
                        )
                      }
                    >
                    <button
                      type="button"
                      className="btn mt-3 m-2 btn-danger mb-2"
                    >
                      <small
                        className="newproduct"
                        style={{ color: "#fff" }}
                      >
                        &nbsp;Delete Student&nbsp;
                      </small>
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
           
            </div>
          </div>
         </div>

                }
                </div>

                 {/* Delete Course */}
              {this.state.showmodal ? (
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
                    <p> Do you really want to delete this account?</p>
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