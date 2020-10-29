import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import placeholder from "../../../assets/images/addstudent.png";
import avatar from "../../../assets/images/avatar.png";


class viewcourse extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      students: [],
      imageurl: '',
      lastname: '',
      firstname: '',
      othername: '',
      telephone: '',
      email: '',
      courses: [],
      showmodal: true
    }
}

  componentDidMount() {
    this.props.user.role === "admin" && this.getStudent();
    this.getStudents();
  }

  async getStudents() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(HTTPURL + `training/liststudents`, {
      headers: headers,
    }).then((response) => response.json());
    if (res["status"]) {
      this.setState({ students: res["data"], totalLists: res["data"] });
    }
  }

  async getStudent() {
    
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    const studentid = this.props.location.pathname.split("/")[2];

    const res = await fetch(HTTPURL + `training/studentprofile?studentid=${studentid}&userid=${this.props.user.userid}`, {
      headers: headers,
    }).then((response) => response.json());
    if (res["status"]) {
         const selectedStudent = res["data"]
      await this.setState({
        lastname: selectedStudent.lastname,
        firstname: selectedStudent.firstname,
        othername: selectedStudent.othername,
        telephone: selectedStudent.telephone,
        email: selectedStudent.email,
        age: selectedStudent.age,
        gender: selectedStudent.gender,
        companyrole: selectedStudent.companyrole,
        organization: selectedStudent.organization,
        experience: selectedStudent.experience,
        state: selectedStudent.state,
        country: selectedStudent.country,
        courses: selectedStudent.courses,
        studentid: selectedStudent.userid
      
    })
  }
  }
  closesuspendModal() {
    let modal = document.getElementById("suspendModal");
    modal.style.display = "none";
  }

  showsuspendStudent(studentid) {

    let modal = document.getElementById("suspendModal")
    modal.style.display = "block";
  }

  suspendStudent = async () => {

    this.setState({ loading: true });

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
        const res = await fetch(
          `${HTTPURL}training/suspendstudent?studentid=${this.state.studentid}&userid=${this.state.user.userid}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        if (res.status) {
          this.setState({ loading: false });
          this.state.showAlert("success", 'Suspend Successfully!')
          let modal = document.getElementById("suspendModal");
          modal.style.display = "none";
        } 
        else{
          this.setState({ loading: false });
          let modal = document.getElementById("suspendModal");
          modal.style.display = "none";
        }

  }

  closedeleteModal() {
    let modal = document.getElementById("deleteModal");
    modal.style.display = "none";
  }

  showdeleteStudent(studentid) {

    let modal = document.getElementById("deleteModal")
    modal.style.display = "block";
  }

  deleteStudent = async () => {

    this.setState({ loading: true });

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
        const res = await fetch(
          `${HTTPURL}training/deletestudent?studentid=${this.state.studentid}&userid=${this.state.user.userid}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        if (res.status) {
          this.setState({ loading: false });
          this.state.showAlert("success", 'Deleted Successfully!')
          let modal = document.getElementById("deleteModal");
          modal.style.display = "none";
          this.props.history.push("/students");
        } 
        else{
          this.setState({ loading: false });
          let modal = document.getElementById("deleteModal");
          modal.style.display = "none";
        }

  }

  show(){
    let accordion = document.getElementById("profiledetails")
    accordion.classList.toggle("show");
 }

  render() {
    return (
      <div className="container mx-auto">
        
        <div className="col-md-12 mb-3 mt-4" id="profile">
            <div className="w-100 text-center">
              <h3>STUDENT INFORMATION </h3>
            </div>
          </div>

          <div className="co-md-12">
         <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                        <Link to="/students">
                          All Students
                          </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">Student profile</li>
            </ol>
          </nav>
         </div>

        <div className="row">
          

          <div className="col-md-3 text-center mb-3" id="studentPix">
            <div className="card">
              <div className="card-header"></div>
              <div className="card-body">
                {this.state.imageurl
                  ? <img
                    src={FILEURL + this.state.imageurl}
                    alt=""
                    className="image_sidebar"
                    height="170px"
                    width="170px"
                    style={{ marginTop: "-80px" }}
                  />
                  : <img
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

            <div className="" id="headingOne">
                <h5 className="mb-0">
                  <button 
                   className="btn btn-primary custom-show rounded-0 btn-block text-left " 
                   data-toggle="collapse" 
                   data-target="#collapseOne" 
                   aria-expanded="true" 
                   aria-controls="collapseOne"
                   >
                     {this.state.lastname}&nbsp;{this.state.firstname}&nbsp;{this.state.othername}
        </button>
                </h5>
              </div>
              
          

          </div>



          <div className="col-md-9">
          <div className="card">
          <div className="row">
<div className="col-md-6">
  
<div id="profiledetails" aria-labelledby="headingOne" >
                <div className="card-body ">
                  <div className="text-left">
                    <p><i className="fa fa-envelope text-purple mr-3"></i>  {this.state.email}  </p>
                    <p><i className="fa fa-phone text-purple mr-3"></i> {this.state.telephone} </p>
                    <p><i className="fa fa-child text-purple mr-3"></i> {this.state.age} Years</p>
                    <p><i className="fa fa-user text-purple mr-3"></i>  {this.state.gender} </p>
                    <p><i className="fa fa-building text-purple mr-3"></i> {this.state.companyrole}, {this.state.organization} </p>
                    <p><i className="fa fa-arrow-up text-purple mr-3"></i> {this.state.experience} experience </p>
                    <p><i className="fa fa-map-marker-alt text-purple mr-3"></i> {this.state.state}, {this.state.country}</p>

                  </div>


                </div>
              </div>
            
</div>
            <div className="col-md-6">
                                
<div className="col-md-12">

<Link to={() => `/addstudentcourse/${this.state.studentid}`}>
  <button
    type="button"
    className="btn btn-sm mt-3 m-2 btn-primary mb-2"
  >
    <small className="newproduct" style={{ color: "#fff" }}>
      &nbsp;Add&nbsp;Course&nbsp;
</small>
  </button>
</Link>
  <button
  onClick={() =>
    this.showsuspendStudent(
      this.state.studentid
    )
  }
    type="button"
    className="btn btn-sm mt-3 m-2 btn-danger mb-2"
  >
    <small
      className="newproduct"
      style={{ color: "#fff" }}
    >
      &nbsp;Suspend Student&nbsp;
</small>
  </button>
  <button
  onClick={() =>
    this.showdeleteStudent(
      this.state.studentid
    )
  }
    type="button"
    className="btn btn-sm mt-3 m-2 btn-danger mb-2"
  >
    <small
      className="newproduct"
      style={{ color: "#fff" }}
    >
      &nbsp;Delete Student&nbsp;
</small>
  </button>
</div>
            </div>
            </div>
        

          </div>
         
          </div>

<div className="col-md-12">
<div className="mt-4">

  <h3> Course</h3>


{this.state.courses.length === 0 
          ? <div className="col-md-12 w-100 h-50 alert alert-warning mt-4" role="alert">
              <h6 className="text-center">No courses has been registered yet</h6>
          </div>
          :
<div className="row mt-4">
{/* <table className="table d-flex"> */}



            {this.state.courses.map((course, i) => {
            return (

              <div className="col-md-4" key={i}>
    <div className="card bg-white">
      {this.state.imageurl
        ? <img
          src={FILEURL + course.imageurl}
          alt=""
          className="image_sidebar"
          height="120px"
          width="120px"
          style={{ marginTop: "-80px" }}
        />
        : <img
          src={placeholder}
          alt=""
          className="card-img-top"
          height="120px"
          width="120px"
          style={{objectFit: 'cover'}}
        // height="170px"
        // width="170px"
        // style={{ marginTop: "-80px" }}
        />
      }
      <div className="card-body hover btn-link">
        <Link to={() => `/viewstudentcourse/${course.id}`} className="text-white">
        <h6 className="card-title text-secondary font-weight-bold text-center" style={{cursor: 'pointer'}}>{course.title}</h6>
        </Link>
      </div>
    </div>
  </div>
    )})}


{/* 
</table> */}
</div>
}
</div>
</div>
        
        </div>

        {/* Suspend Student */}
        {this.state.showmodal ? (
          <div id="suspendModal" className="modal">
            {/* Modal content  */}
            <div className="modal-content modal-del text-center p-5">
              <i
                className="fa fa-exclamation-triangle fa-3x dark-red mb-2"
                aria-hidden="true"
              ></i>
              <h3>Are you sure?</h3>
              <p> Do you really want to suspend this account?</p>
              <div className="row">
                <div className="col-md-6">
                  <button
                    onClick={this.closesuspendModal}
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
                          this.suspendStudent(this.state.studentid)
                        }
                        className="btn btn-danger btn-block"
                      >
                        Suspend
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        ) : (
            <span></span>
          )}


          {/* Delete Student */}
        {this.state.showmodal ? (
          <div id="deleteModal" className="modal">
            {/* Modal content  */}
            <div className="modal-content modal-del text-center p-5">
              <i
                className="fa fa-exclamation-triangle fa-3x dark-red mb-2"
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
                          this.deleteStudent(this.state.studentid)
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