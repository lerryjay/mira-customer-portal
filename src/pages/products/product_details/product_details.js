import React, { Component } from "react";
import placeholder from "../../../assets/images/product-placeholder.gif";
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";

class product_details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      name: "",
      description: "",
      editname: "",
      editdescription: "",
      editid: "",
      packages: [],
      pkgname: "",
      pkgdescription: "",
      id: "",
      errormessage: "",
      loading: false,
      successmessage: "",
      showmodal: true,
      showdeletemodal: true,
      selectedModule: {},
      updateData: false,
    };
  }

  componentDidUpdate() {
    if (this.state.updateData) this.getModules()
  }

  async componentDidMount() {
    this.setState({ loader: true });
    await this.getProduct();
    this.getModules();
    this.setState({ loader: false });
  }

  async getProduct() {
    const productid = this.props.location.pathname.split("/")[2];

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    const result = await fetch(
      `${HTTPURL}product/getproduct?productid=${productid}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((res) => res.json())
    if (result['status']) {
      this.setState({
        name: result.data.name,
        description: result.data.description,
        id: result.data.id,
        imageurl: result.data.imageurl
      });
    }
  }

  getModules() {
    const productid = this.props.location.pathname.split("/")[2];

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    fetch(
      HTTPURL +
      `product/modules?productid=${productid}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res['status']) {
          this.setState({ packages: res['data'] });
        } else {
          this.setState({ packages: [] });
        }
      });


    this.setState({ updateData: false });
  }

  async showdeleteInfoModule(moduleid) {
    const selectedModule = this.state.packages.find(item => item.id === moduleid);
    await this.setState({ selectedModule });
    let modal = document.getElementById("deleteModal");
    modal.style.display = "block";
  }

  async deleteInfoModule() {
    this.setState({ loading: true, successmessage: false });

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(`${HTTPURL}product/deletemodule?moduleid=${this.state.selectedModule.id}&userid=${this.state.user.userid}`, {
      method: 'GET',
      headers: headers
    }).then((response) => response.json())
    this.setState({ loading: false });
    if (res.status) {
      this.getModules();
      this.state.showAlert('success', "Deleted Successfully!");
      let modal = document.getElementById("deleteModal");
      modal.style.display = "none";
    }
    else{
      this.state.showAlert('danger', res.message);
    }
  }

  async infoModal(moduleid) {

    const selectedModule = this.state.packages.find(item => item.id == moduleid);
    await this.setState({ selectedModule });
    let modal = document.getElementById("infoModal");
    modal.style.display = "block";
  }

  async updateModal(moduleid) {

    const selectedModule = this.state.packages.find(item => item.id == moduleid);
    await this.setState({
      editname: selectedModule.name,
      editdescription: selectedModule.description,
      editid: selectedModule.id
    });
    let modal = document.getElementById("updateModal");
    modal.style.display = "block";
  }

  closeinfoModal() {
    let modal = document.getElementById("infoModal");
    modal.style.display = "none";
  }
  closedeleteModal() {
    let modal = document.getElementById("deleteModal");
    modal.style.display = "none";
  }
  closeupdateModal() {
    let modal = document.getElementById("updateModal");
    modal.style.display = "none";
  }

  packageModal() {
    let modal = document.getElementById("moduleModal");
    modal.style.display = "block";
  }

  closepkgModal() {
    let modal = document.getElementById("moduleModal");
    modal.style.display = "none";
  }
  closeModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errormessage: "" });
  };

  showDeleteModal(e) {
    this.state.id = e
    let modal = document.getElementById("myModal")
    modal.style.display = "block";
}

deleteModal(e) {
    let productid = e

    const headers = new Headers();
    headers.append('API-KEY', APIKEY);

    fetch(HTTPURL + `product/delete?productid=${productid}&userid=${this.state.user.userid}`, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(async data => {
            if(data.status === true) {
                this.state.showAlert("success", data.message);
                await this.state.getProducts();
                let modal = document.getElementById("myModal")
                modal.style.display = "none";
                this.props.history.push('/products');

            } else{
                this.state.showAlert("danger",  data.message)
            }
        });
}


  saveModule = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);

        let form = new FormData();
        form.append("userid", this.state.user.userid);
        form.append("productid", this.state.id);
        form.append("name", this.state.pkgname);
        form.append("description", this.state.pkgdescription);

         fetch(HTTPURL + "product/addmodule", {
          method: "POST",
          body: form,
          headers: headers,
        }).then((response) => response.json())
          .then((res) => { 
            if (res['status']) {
              this.setState({ loading: false }); 
              this.getModules();
              this.state.showAlert("success",  res['message'])
              let modal = document.getElementById("moduleModal");
              modal.style.display = "none";
              this.setState({ pkgname: "", pkgdescription: "" });
            }
            else{
              this.setState({ loading: false }); 
              this.state.showAlert("danger",  res['message'])
            }
      });
  };

  handleUpdate = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    let form = new FormData();
    form.append("userid", this.state.user.userid);
    form.append("productid", this.state.id);
    form.append("moduleid", this.state.editid);
    form.append("name", this.state.editname);
    form.append("description", this.state.editdescription);

    const res = await fetch(HTTPURL + "product/updatemodule", {
      method: "POST",
      body: form,
      headers: headers,
    }).then((response) => response.json())
    this.setState({ loading: false });
    if (res.status) {
      this.getModules();
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

  render() {
    return (
      <div className="container-fluid mx-auto">

        {this.state.loader && (
          <div className="spin-center">
            <span className="text-primary ">
              <span
                className="spinner-grow spinner-grow-sm mr-2"
                role="status"
                aria-hidden="true"
              ></span>
              <span style={{ fontSize: "14px" }}>Loading...</span>
            </span>
          </div>
        )}

        {!this.state.loader && (
          <div>
            <div className="row mt-4 mx-5">
              <div className="col-md-5 py-3">
                {/* <img src={this.state.imageurl} onError={`this.src=${ placeholder }`} className="img-fluid" alt="" /> */}
                <div className="container">
                  <div className="container-fluid">
                    <img className="image-product px-3" src={FILEURL + this.state.imageurl} onError={(e) => { e.target.onerror = null; e.target.src = placeholder }} />
                  </div>
                </div>
              </div>
              <div className="col-md-7 py-3">
                <h4 className="text-dark">{this.state.name}</h4>
                <div className="description">
                  <p>{this.state.description}</p>
                  
                  {this.state.user.role == "admin" &&  
                  <div className="row mt-5">
                    <Link
                      className="btn mt-3 m-2 btn-primary mb-2 rounded-0 px-5"
                      to={() => `/updateproduct/${this.state.id}`}
                    >
                      <small className="newproduct" style={{ color: "#fff" }}>
                        &nbsp;Update&nbsp;
                      </small>
                    </Link>
                    <button
                      type="button" onClick={() => this.showDeleteModal(this.state.id)}
                      className="btn mt-3 m-2 btn-danger mb-2 rounded-0  px-5"
                    >
                      <small className="newproduct" style={{ color: "#fff" }}>
                        &nbsp;Delete
                      </small>
                    </button>
                  </div>
                  }
                </div>
              </div>
            </div>
            <div className="row mt-5 px-5 d-flex">
              {/* <div className="col-md-12 packages"> */}
              <h5 className="text-dark mr-auto">MODULES</h5>
              {this.state.user.role == "admin" &&  
                <button
                  type="button"
                  onClick={this.packageModal}
                  className="btn btn-sm btn-primary new_product mb-2"
                >
                  <i
                    className="fas fa-folder-plus"
                    style={{ color: "#fff" }}
                    aria-hidden="true"
                  >
                    <small className="newproduct" style={{ color: "#fff" }}>
                      &nbsp;Add&nbsp;New&nbsp;Module
                  </small>
                  </i>
                </button>
              }
              {/* </div> */}
            </div>

            <div className="col-md-12 ">

              <div className="card mb-4">
                <div className="card-body">
                  {this.state.packages.length === 0 ? (
                    <div className="alert alert-warning" role="alert">
                      Oops, Product module is empty!
                    </div>
                  ) : (
                      <div className="row">
                        {/* {this.state.packages} */}
                        {this.state.packages.map((module) => {
                          return (
                            <div key={module.id} className="col-md-4 mb-2">
                              <div className="list-group-item">
                                <div className="row">
                                  <div className="col-md-9 pr-1" style={{overflow: 'hidden', textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>
                                      <span>{module.name}</span>
                                    </div>
                                  <div className="col-md-3 pl-0">
                                {this.state.user.role == "admin" &&  
                                 <span className=" float-right">
                                  <span onClick={() => this.infoModal(module.id)}>
                                    <i value={module.id} style={{ cursor: "pointer" }}
                                      className="fa fa-info-circle mr-1 text-info"
                                    ></i>
                                  </span>
                                  <span onClick={() => this.updateModal(module.id)}>
                                    <i value={module.id} style={{ cursor: "pointer" }}
                                      className="fa fa-edit mr-1 text-primary"></i>
                                  </span>
                                  <span onClick={() => this.showdeleteInfoModule(module.id)}>
                                    <i className="fa fa-trash mr text-danger" style={{cursor: "pointer"}}></i>
                                  </span>
                                </span>
                                }
                                    </div>
                                  </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Delete Product */}
            {this.state.showmodal ?
                <div id="myModal" className="modal">
                    {/* Modal content  */}
                    <div className="modal-content text-center p-5">
                        <i className="fa fa-exclamation-triangle fa-3x dark-red mb-2" aria-hidden="true"></i>
                        <h3>Are you sure?</h3>
                        <p> Do you really want to delete this file?</p>
                        <div className="row">
                            <div className="col-md-6 mb-1">
                                <button onClick={this.closeModal} className="btn-block btn btn-outline-secondary">Cancel</button>
                            </div>
                            <div className="col-md-6">
                                <button onClick={() => this.deleteModal(this.state.id)} className="btn btn-danger btn-block">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <span></span>
            }


            {/* Add New Module Modal */}
            {this.state.showmodal ? (
              <div id="moduleModal" className="modal">
                {/* Modal content  */}
                <div className="modal-content text-center">
                  <form onSubmit={this.saveModule} id="addpackage">
                    <div className="card">
                      <div className="card-header bg-medium font-weight-bold text-dark">
                        ADD NEW MODULE
                    </div>

                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            {/* Error Message */}
                            {this.state.errormessage != null &&
                              this.state.errormessage.length > 0 ? (
                                <div className="alert alert-warning" role="alert">
                                  {this.state.errormessage}
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="alert"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                              ) : (
                                <span></span>
                              )}
                          </div>
                        </div>
                        <div className="row">

                          <div className="col-md-12 mb-1">
                            <div className="form-group">
                              <label htmlFor="" className="sr-only">
                                Package Name
                            </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="pkgname"
                                id="pkgname"
                                placeholder="Package Name"
                                value={this.state.pkgname}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="" className="sr-only">
                                Product Description
                            </label>
                              <textarea
                                type="text"
                                rows="8"
                                className="form-control form-control-sm"
                                name="pkgdescription"
                                id="pkgdescription"
                                placeholder="Package Description"
                                value={this.state.pkgdescription}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-1">
                            <button
                              type="button"
                              onClick={this.closepkgModal}
                              className="btn-block btn btn-outline-secondary"
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

            {/* Show module info */}
            {this.state.showmodal ? (
              <div id="infoModal" className="modal">
                {/* Modal content  */}
                <div className="modal-content">
                  <form>
                    <div className="card">
                      <div className="card-header bg-medium font-weight-bold text-dark text-center">
                        MODULE INFORMATION
                    </div>

                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12 mb-1"></div>

                          <div className="col-md-12 mb-1">
                            <div className="form-group">
                              <p>

                                <span className="font-weight-bold">
                                  Name:&nbsp;
                              </span>
                                {this.state.selectedModule.name}
                              </p>
                              <p>

                                <span className="font-weight-bold">
                                  Description:
                              </span>
                              <br/>
                                {this.state.selectedModule.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12 text-center">
                            <button
                              type="button"
                              onClick={this.closeinfoModal}
                              className="btn-block btn btn-primary"
                            >
                              OK
                          </button>
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
                <div className="modal-content">
                  <form onSubmit={this.handleUpdate}>
                    <div className="card">
                      <div className="card-header bg-medium font-weight-bold text-dark text-center">
                        EDIT MODULE
                    </div>

                      <div className="card-body">
                        <div className="row">

                          <div className="col-md-12 mb-1">
                            <div className="form-group">
                              <label htmlFor="" className="sr-only">
                                Package Name
                            </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="editname"
                                id="editname"
                                placeholder="Module Name"
                                value={this.state.editname}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>


                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="" className="sr-only">
                                Product Description
                            </label>
                              <textarea
                                type="text"
                                rows="8"
                                className="form-control form-control-sm"
                                name="editdescription"
                                id="editdescription"
                                placeholder="Package Description"
                                value={this.state.editdescription}
                                onChange={this.handleInputChange}
                              />
                            </div>
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
                  <p> Do you really want to delete this file?</p>
                  <div className="row">
                    <div className="col-md-6 mb-1">
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
                          <button onClick={() => this.deleteInfoModule(this.state.selectedModule.id)} className="btn btn-danger btn-block">Delete</button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              :
              <span></span>
            }

          </div>

        )}
      </div>
    );
  }
}
export default withContext(product_details);
