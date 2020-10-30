import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import avatar from "../../../assets/images/addstudent.png";
import pdf_placeholder from "../../../assets/images/pdf.png";



class viewstudentcourse extends Component {
    state = {
      ...this.props,
      course: [],
      paymentstatus: '',
      paymentoption: '',
      amount: '',
      rpaymentstatus: '',
      rpaymentoption: '',
      ramount: '',
      trainingid: '',
      showmodal: true
    }

    componentDidMount() {
        this.props.user.role === "admin" && this.getStudentCourse();
        
    }
    
    async getStudentCourse() {
      const headers = new Headers();
      headers.append("API-KEY", APIKEY);

      const id = this.props.location.pathname.split("/")[2];

      const res = await fetch(HTTPURL + `training/studentcourse?trainingid=${id}`, {
        headers: headers,
      }).then((response) => response.json());
      if (res["status"]) {
        this.setState({ course: res["data"]});
      }
    }

    handleInputChange = e => {
      const { name, value } = e.target
      this.setState({ [name]: value, errormessage: '' });
  }

    closedeleteModal() {
      let modal = document.getElementById("deleteModal");
      modal.style.display = "none";
    }
  
     showDeleteModal(courseid) {
      // const selectedCourse = this.state.course.courses.find(
      //   (course) => course.id === courseid
      // );

      let modal = document.getElementById("deleteModal")
      modal.style.display = "block";
    }
  
    deleteCourse = async () => {
     
    const courseid = this.props.location.pathname.split("/")[2];

      const headers = new Headers();
      headers.append('API-KEY', APIKEY);
  
      fetch(HTTPURL + `training/deletestudentcourse?userid=${this.state.user.userid}&trainingid=${courseid}`, {
          method: 'GET',
          headers: headers
      })
          .then(response => response.json())
          .then(async data => {
              if(data.status === true) {
                  this.state.showAlert("success", data.message);
                  let modal = document.getElementById("deleteModal")
                  modal.style.display = "none";
                  this.props.history.push('/students');
  
              } else{
                  this.state.showAlert("danger",  data.message)
              }
          });
    }

  async updateModal() {

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

    const trainingid = this.props.location.pathname.split("/")[2];

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    let form = new FormData();
    form.append("userid", this.state.user.userid);
    form.append("paymentstatus", this.state.paymentstatus);
    form.append("paymentoption", this.state.paymentoption);
    form.append("amount", this.state.amount);
    form.append("trainingid", trainingid);

    const res = await fetch(HTTPURL + "training/updatepaymentstatus", {
      method: "POST",
      body: form,
      headers: headers,
    }).then((response) => response.json())
    this.setState({ loading: false });
    if (res.status) {  
      this.getStudentCourse();
      this.state.showAlert('success', res.message);
      let modal = document.getElementById("updateModal");
      modal.style.display = "none";
    }
    else{
      this.state.showAlert('danger', res.message);
    }
    this.setState({ updateData: true });
    return res;
  };

  async showModal() {

    let modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  
  closeReceipt() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  

  sendReceipt = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const trainingid = this.props.location.pathname.split("/")[2];

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    let form = new FormData();
    form.append("userid", this.state.user.userid);
    form.append("paymentstatus", this.state.rpaymentstatus);
    form.append("paymentoption", this.state.rpaymentoption);
    form.append("amount", this.state.ramount);
    form.append("trainingid", trainingid);

    const res = await fetch(HTTPURL + "training/sendreciept", {
      method: "POST",
      body: form,
      headers: headers,
    }).then((response) => response.json())
    this.setState({ loading: false });

    if (res.status) {        
      this.getStudentCourse();
      this.state.showAlert('success', res.message);
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
    else{
      this.state.showAlert('danger', res.message);
    }
    this.setState({ updateData: true });
    return res;
  };

    render() {
        return (
            <div className="container mx-auto">
                
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
                    <li className="list-group-item"><i className="fa fa-wallet text-purple mr-3"></i> Payment Status 
                      <span className="float-right">
                        {this.state.course.paymentstatus}
                       </span> 
                    </li>
                    <li className="list-group-item"><i className="fab fa-cc-paypal text-purple mr-3"></i>Pay Option <span className="float-right">{this.state.course.payoption}</span> </li>
                    <li className="list-group-item"><i className="fa fa-calendar-alt text-purple mr-3"></i> Payment Date <span className="float-right">{this.state.course.paymentdate || this.state.course.created_at}</span> </li>
                  
            </ul>
            </div>
                  <div className="col-md-12">

                        <button
                          type="button"
                          className="btn mt-3 m-2 btn-primary mb-2"
                          onClick={() => this.showModal()}
                        >
                          <small className="newproduct" style={{ color: "#fff" }}>
                            &nbsp;Send&nbsp;Receipt&nbsp;
                          </small>
                        </button>

                        <button
                          type="button"
                          className="btn mt-3 m-2 btn-primary mb-2"
                          onClick={() => this.updateModal()}
                        >
                          <small className="newproduct" style={{ color: "#fff" }}>
                            &nbsp;Update Payment Status
                          </small>
                        </button>
                        
                      <button
                        type="button"
                        className="btn mt-3 m-2 btn-danger mb-2"
                        onClick={() => this.showDeleteModal(this.state.courseid)}
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
              {this.state.showmodal ? (
                <div id="deleteModal" className="modal">
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


  {/* Update payment status */}
  {this.state.showmodal ? (
              <div id="updateModal" className="modal">
                {/* Modal content  */}
                <div className="modal-content">
                  <form onSubmit={this.handleUpdate}>
                    <div className="card">
                      <div className="card-header bg-medium font-weight-bold text-dark text-center">
                        UPDATE PAYMENT STATUS 
                    </div>

                      <div className="card-body">
                        <div className="row">

                          <div className="col-md-12 mb-1">
                            <div className="form-group">
              <label
                style={{ display: "block" }}
                className="font-weight-bold"
              >
                Amount
              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="amount"
                                id="amount"
                                placeholder="Amount"
                                value={this.state.amount}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>


                     
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
  
                        </div>

                        <div className="d-flex justify-content-center">
                            <button
                              type="button"
                              onClick={this.closeupdateModal}
                              className="btn btn-outline-secondary m-1 w-50"
                            >
                              Cancel
                          </button>
                            {this.state.loading ? (
                              <button
                                type="submit"
                                className="btn btn-sm btn-primary m-1 w-50"
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
                                  className="btn btn-sm btn-primary m-1 w-50"
                                >
                                  <i className="fas fa-folder-open"></i>&nbsp;
                              Update
                                </button>
                              )}
                        </div>
                      </div>
                    </div>
                  </form>
                
                </div>
              </div>
            ) : (
                <span></span>
              )}
              

  {/* Send Receipt */}
  {this.state.showmodal ? (
  <div id="myModal" className="modal">

<div className="modal-content">
  <form onSubmit={this.sendReceipt}>
                    <div className="card">
                      <div className="card-header bg-medium font-weight-bold text-dark text-center">
                        SEND RECEIPT
                    </div>

                      <div className="card-body">
                        <div className="row">

                          <div className="col-md-12 mb-1">
                            <div className="form-group">
              <label
                style={{ display: "block" }}
                className="font-weight-bold"
              >
                Amount
              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="ramount"
                                id="ramount"
                                placeholder="Amount"
                                value={this.state.ramount}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>


                     
<div className="col-md-12 mb-4">
  
<label
                style={{ display: "block" }}
                className="font-weight-bold"
              >
                Payment Status
              </label>
<select
                          className="custom-select custom-select-sm"
                          value={this.state.rpaymentstatus}onChange={(e) => {
                            this.setState({ rpaymentstatus: e.target.value });
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
                          value={this.state.rpaymentoption}onChange={(e) => {
                            this.setState({ rpaymentoption: e.target.value });
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
  
                        </div>

                        <div className="d-flex justify-content-center">
                            <button
                              type="button"
                              onClick={this.closeReceipt}
                              className="btn btn-outline-secondary m-1 w-50"
                            >
                              Cancel
                          </button>
                            {this.state.loading ? (
                              <button
                                type="submit"
                                className="btn btn-sm btn-primary m-1 w-50"
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
                                  className="btn btn-sm btn-primary m-1 w-50"
                                >
                                  <i className="fas fa-folder-open"></i>&nbsp;
                              Send
                                </button>
                              )}
                        </div>
                      </div>
                    </div>
                  </form>
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