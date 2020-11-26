import React, { Component } from 'react'

import { withContext } from '../../../common/context';
import { HTTPURL, APIKEY } from '../../../common/global_constant';

class AddStudentCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
            paymentoption: '',
            paymentstatus: '',
            courses: [],
            course: '',

            errormessage: '',
            loading: false,
            successmessage: ''
        };
    }
    
    async componentDidMount(){
        this.state.showLoader();
        this.setState({ loading : false  });
        this.state.hideLoader();
        this.getCourses();
    }

    async getCourses() {
        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
        const res = await fetch(HTTPURL + `training/listcourses`, {
          headers: headers,
        }).then((response) => response.json());
        if (res["status"]) {
          this.setState({ courses: res["data"] });
        }
      }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value, errormessage: '' });
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({ loading: true });

            let myHeaders = new Headers();
            myHeaders.append("api-key", APIKEY);

            const studentid = this.props.location.pathname.split("/")[2];

            let formdata = new FormData();
            formdata.append("userId", this.state.user.userid);
            formdata.append("paymentoption", this.state.paymentoption);
            formdata.append("paymentstatus", this.state.paymentstatus);
            formdata.append("courseid", this.state.course);
            formdata.append("studentid", studentid);
            

            fetch(`${HTTPURL}training/addstudentcourse`, {
                method: "POST",
                headers: myHeaders,
                body: formdata
            }).then(response => response.json()).
                then(result => {
                    this.setState({ loading: false });
                        if(result.status === true) {
                            this.state.showAlert("success", result.message);
                            this.props.history.goBack();
                               
                        } else{
                            this.state.showAlert("danger",  result.message)
                        }
                })


    }

    render() {
        return (
            <div className="container justify-content-center row mt-4">

                <div className="col-md-8 ">

                        <form onSubmit={this.handleSubmit} id="createclient">

                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    ADD COURSE
                                </div>

                                <div className="card-body">

<div className="row">
                        
<div className="col-md-12 mb-4">
  
  <label
                  style={{ display: "block" }}
                  className="font-weight-bold"
                >
                  Payment Status
                </label>
  <select
                            className="custom-select custom-select-sm"
                            value={this.state.paymentstatus}onChange={(e) => {
                              this.setState({ paymentstatus: e.target.value });
                          }}
                          >
                            <option value="" disabled>-- Select --</option>
                            <option
                              className="btn btn-sm text-success"
                              value="complete"
                            >
                              {" "}
                              &#10003;&nbsp;&nbsp;Complete{" "}
                            </option>
                            <option
                              className="btn btn-sm text-warning"
                              value="incomplete"
                            >
                              &#1008;&nbsp;&nbsp;Incomplete
                            </option>
                            <option
                              className="btn btn-sm btn-light text-danger"
                              value="pending"
                            >
                              &#10070;&nbsp;&nbsp;Pending
                            </option>
                          </select>
                      
              </div>
                 
<div className="col-md-12 mb-4">
  
<label
                style={{ display: "block" }}
                className="font-weight-bold"
              >
                Payment Option
              </label>
<select
                          className="custom-select custom-select-sm"
                          value={this.state.paymentoption}onChange={(e) => {
                            this.setState({ paymentoption: e.target.value });
                        }}
                        >
                          <option value="" disabled>-- Select --</option>
                          <option
                            className="btn btn-sm"
                            value="paystack"
                          >
                            {" "}
                            Paystack{" "}
                          </option>
                          <option
                            className="btn btn-sm"
                            value="banktransfer"
                          >
                            Bank Transfer
                          </option>
                          <option
                            className="btn btn-sm"
                            value="offline"
                          >
                           Offline
                          </option>
                        </select>
                    
            </div>

            <div className="col-md-12 mb-3">
                                            <div className="form-group">

                                            <label
                style={{ display: "block" }}
                className="font-weight-bold"
              >
                Course
              </label>                                            <select
                                            name="course"
                                            id="course"
                                            className=" custom-select custom-select-sm"
                                            defaultValue=""
                                            value={this.state.course}
                                            onChange={(e) => {
                                                this.setState({ course: e.target.value });
                                            }}
                                            >
                                            <option value="" disabled> -- Select Course --</option>
                                            
                                            {this.state.courses.map((course,i) => {
                                                return (
                                                <option key={i} value={course.id}>{course.title}</option>
                                                );
                                            })}

                                            </select>
                                            </div>
                                        </div>
  
</div>

                                </div>

                                <div className="card-footer">
                                    <div className="text-center">
                                        {this.state.loading ?
                                            <button type="submit" className="btn btn-sm btn-primary px-4">
                                                <div className="spinner-border text-white" role="status" id="loader">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </button>
                                            : <button type="submit" className="btn btn-sm btn-primary px-3">
                                                <i className="fas fa-folder-open mr-2"></i>
                                        Save
                                    </button>
                                        }


                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

        )
    }
}
export default withContext(AddStudentCourse);
