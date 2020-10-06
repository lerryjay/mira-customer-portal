import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import avatar from "../../../assets/images/addstudent.png";


class viewcourse extends Component {
    state = {
      courses: [],
      title: '',
      description: '',
      cost: '',
      date:'',
      durations:'',
      imageurl: '',
      courseid: '',
      showmodal: true
    }

    componentDidMount() {
        this.props.user.role === "admin" && this.getCourse();
    }
    
    async getCourse() {
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
    }

    closedeleteModal() {
      let modal = document.getElementById("suspendModal");
      modal.style.display = "none";
    }
  
     showdeleteModal(courseid) {
      const selectedCourse = this.state.courses.find(
        (course) => course.id === courseid
      );
      this.setState({
        title: selectedCourse.title,
        description: selectedCourse.description,
        cost: selectedCourse.cost,
        date: selectedCourse.createdat,
        durations: selectedCourse.durations,
        imageurl: selectedCourse.imageurl,
        courseid: selectedCourse.id
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
            <h3>COURSE INFORMATION </h3>
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
                    <span className="font-weight-bold">Description:</span>{" "}
                    {this.state.description}
                  </h6>
                  <h6>
                    {" "}
                    <span className="font-weight-bold">Duration:</span>{" "}
                    {this.state.duration}
                  </h6>
                  <h6>
                    {" "}
                    <span className="font-weight-bold">Particiant:</span>{" "}
                    {this.state.participant}
                  </h6>
                  <h6>
                    {" "}
                    <span className="font-weight-bold">Cost:</span>{" "}
                    {this.state.cost}
                  </h6>
                  <div className="row">

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
                        &nbsp;Delete Course&nbsp;
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