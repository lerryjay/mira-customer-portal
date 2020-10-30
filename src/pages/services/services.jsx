/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../common/global_constant";
import { withContext } from "../../common/context";
import { Link } from "react-router-dom";
import Pagination from "../../common/components/Pagination";

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      showmodal: true,
      clients: [],
      currentPage: 1,
      numberPerPage: 10,
      totalLists: [],
      pageNumbers: [],
      currentLists: [],
      serviceid:'',
      selectedService: '',
      title: '',
      code: '',
      cost: '',
      edittitle: '',
      editcode: '',
      editcost: '',
    };
  }
  
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errormessage: "" });
  };

  componentDidMount() {
    this.getServices();
  }

  async getServices() {
    this.state.showLoader();

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(
      HTTPURL + `service/list`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((response) => response.json());
    this.state.hideLoader();

    if (res["status"]) {
      this.setState({ totalLists: res['data'] });
    }
  }

  async updateModal(id) {

    const selectedService = this.state.totalLists.find(item => item.id == id);
    await this.setState({
      edittitle: selectedService.title,
      editcode: selectedService.code,
      editcost: selectedService.cost,
      serviceid: id
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

    let form = new FormData();
    form.append("userid", this.props.user.userid);
    form.append("clientid", this.props.user.userid);
    form.append("serviceid", this.state.serviceid);
    form.append("title", this.state.edittitle);
    form.append("code", this.state.editcode);
    form.append("cost", this.state.editcost);

    const res = await fetch(HTTPURL + "service/update", {
      method: "POST",
      body: form,
      headers: headers,
    }).then((response) => response.json())
    this.setState({ loading: false });
    if (res.status) {
      this.getServices();
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


  async showaddService() {
    let modal = document.getElementById("addServiceModal");
    modal.style.display = "block";
  }

  closeaddModal() {
    let modal = document.getElementById("addServiceModal");
    modal.style.display = "none";
  }

  addService = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    let form = new FormData();
    form.append("userid", this.props.user.userid);
    form.append("clientid", this.props.user.userid);
    form.append("title", this.state.title);
    form.append("code", this.state.code);
    form.append("cost", this.state.cost);

    const res = await fetch(HTTPURL + "service/add", {
      method: "POST",
      body: form,
      headers: headers,
    }).then((response) => response.json())
    this.setState({ loading: false });
    if (res.status) {
      this.getServices();
      this.state.showAlert('success', res.message);
      let modal = document.getElementById("addServiceModal");
      modal.style.display = "none";
      this.setState({ title: "", cost: "", code: "" });
    }
    else{
      this.state.showAlert('danger', res.message);
    }
    this.setState({ updateData: true });
    return res;
  };




  closedeleteModal() {
    let modal = document.getElementById("deleteModal");
    modal.style.display = "none";
  }

  async showdeleteModal(moduleid) {
    const selectedService = this.state.totalLists.find(item => item.id === moduleid);
    await this.setState({ selectedService });
    let modal = document.getElementById("deleteModal");
    modal.style.display = "block";
  }

  async deleteModal() {
    this.setState({ loading: true });
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    let form = new FormData();
    form.append("userid", this.props.user.userid);
    form.append("clientid", this.props.user.userid);
    form.append("serviceid", this.state.selectedService.id);
    form.append("title", this.state.selectedService.title);
    form.append("code", this.state.selectedService.code);
    form.append("cost", this.state.selectedService.cost);

    const res = await fetch(HTTPURL + "service/delete", {
      method: "POST",
      body: form,
      headers: headers,
    }).then((response) => response.json())
    this.setState({ loading: false });
    if (res.status) {
      this.getServices();
      this.state.showAlert('success', "Deleted Successfully!");
      let modal = document.getElementById("deleteModal");
      modal.style.display = "none";
    }
    else{
      this.state.showAlert('danger', res.message);
    }
    this.setState({ updateData: true });
    return res;
  }

  update = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const { numberPerPage, currentPage, totalLists } = this.state;

    // Logic for displaying current lists
    const indexOfLastList = currentPage * numberPerPage;
    const indexOfFirstList = indexOfLastList - numberPerPage;
    const currentLists = totalLists.slice(indexOfFirstList, indexOfLastList);
    this.state.currentLists = currentLists;

    return (
      <div className="container-fluid px-5">
        <div className="row mt-4">
          <div className="w-100 text-center">
            <h3>SERVICES </h3>
          </div>
          
         <div className="col-md-12">
         <div className="row mt-4 d-flex justify-content-end mr-3" >
            <span onClick={() => this.showaddService()}>
                  <button type="button" className="btn btn-sm btn-primary new_product">
                      <i className="fas fa-plus" aria-hidden="true">
                          <small className="newproduct" style={{ color: '#fff' }}>&nbsp;Add&nbsp;Service</small>
                      </i>
                  </button>
              </span>
          </div>
         </div>
          
          <div className="col-md-12 col-sm-12 box1 mb-3" id="profile">
            {this.state.totalLists.length === 0 ? (
              <div className="alert alert-warning mt-5" role="alert">
                <h6 className="text-center">Unable to retrieve services no records found!</h6>
              </div>
            ) : (
              <div>
                <div
                  id="table"
                  className="card pt-2 mt-3 justify-content-center shadow px-2"
                >
                  <div className="table-responsive">
                    <table
                      className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart"
                      id="myTable"
                    >
                      {/* <caption>Hello World!</caption> */}
                      <thead>
                        <tr>
                          <th>S/N</th>
                          <th>Code</th>
                          <th>Title</th>
                          <th>Date Added</th>
                          <th>Cost</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.currentLists.map((service, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{service.code}</td>
                              <td>{service.title}</td>
                              <td>
                                {service.date_added}
                              </td>
                              <td
                                style={{ minWidth: "100px", maxWidth: "100px" }}
                              >
                                {service.cost}
                              </td>
                              <td
                                className="align-middle"
                                style={{ cursor: "pointer" }}
                              >
                              <span onClick={() => this.updateModal(service.id)}>
                                <i value={service.id} style={{ cursor: "pointer" }}
                                  className="fa fa-edit mr-3 text-primary"></i>
                              </span>
                              <span onClick={() => this.showdeleteModal(service.id)}>
                                <i className="fa fa-trash mr-2 text-danger"></i>
                              </span>
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

          </div>

{/* Add Services modal */}
{this.state.showmodal ? (
              <div id="addServiceModal" className="modal">
                {/* Modal content  */}
                <div className="modal-content pt-5 pb-2">
                  <form onSubmit={this.addService}>
                    <div className="card">
                      <div className="card-header bg-medium font-weight-bold text-dark text-center">
                        ADD SERVICE
                    </div>

                      <div className="card-body">
                        <div className="row">

                        <div className="col-md-12 mb-1">
                            <div className="form-group">
                              <label htmlFor="" className="sr-only">
                                Title
                            </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="title"
                                id="title"
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>

                          
                          <div className="col-md-12 mb-1">
                            <div className="form-group">
                              <label htmlFor="" className="sr-only">
                                Code
                            </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="code"
                                id="code"
                                placeholder="Code"
                                value={this.state.code}
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
                              onClick={this.closeaddModal}
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
                                  className="spinner-border text-secondary"
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
                              Save
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


            {/* Update module info */}
            {this.state.showmodal ? (
              <div id="updateModal" className="modal">
                {/* Modal content  */}
                <div className="modal-content pt-5 pb-2">
                  <form onSubmit={this.handleUpdate}>
                    <div className="card">
                      <div className="card-header bg-medium font-weight-bold text-dark text-center">
                        EDIT SERVICE
                    </div>

                      <div className="card-body">
                        <div className="row">


                        <div className="col-md-12 mb-1">
                            <div className="form-group">
                              <label htmlFor="" className="sr-only">
                                Code
                            </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="editcode"
                                id="editcode"
                                placeholder="Code"
                                value={this.state.editcode}
                                onChange={this.handleInputChange}
                                disabled
                              />
                            </div>
                          </div>

                          
                        <div className="col-md-12 mb-1">
                            <div className="form-group">
                              <label htmlFor="" className="sr-only">
                                Title
                            </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="edittitle"
                                id="edittitle"
                                placeholder="Title"
                                value={this.state.edittitle}
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
                                name="editcost"
                                id="editcost"
                                placeholder="Cost"
                                value={this.state.editcost}
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
                                  className="spinner-border text-secondary"
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
                          <button onClick={() => this.deleteModal(this.state.selectedService.id)} className="btn btn-danger btn-block">Delete</button>
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

export default withContext(Services);
