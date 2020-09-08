import React, { Component } from "react";
import placeholder from "../../../assets/images/product-placeholder.gif";
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY,FILEURL } from "../../../common/global_constant";
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
      selectedModule : {},
      updateData: false,
    };
    console.log(this.props);
  }

  componentDidMount() {
    this.getProduct();
    this.getModules();
  }
  componentDidUpdate(){
    if(this.state.updateData) this.getModules()

 // Automatically scroll down to new messages
    // var objDiv = document.getElementById("chatscroll");
    // objDiv.scrollTop = objDiv.scrollHeight;

 }
  getProduct() {
    const productid = this.props.location.pathname.split("/")[2];

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    fetch(
      `${HTTPURL}product/getproduct?productid=${productid}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status == true) {
          this.setState({
            name: result.data.name,
            description: result.data.description,
            id: result.data.id,
            imageurl : result.data.imageurl
          });
        }
      });
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
        if(res['status']){
          this.setState({ packages: res['data'] });
        } else {
          this.setState({ packages: [] });
        }
      });

      
      this.setState({updateData: false});
  }

  async showdeleteInfoModule(moduleid)
  {
    const selectedModule = this.state.packages.find(item=>item.id == moduleid);
    await this.setState({selectedModule});
    let modal = document.getElementById("deleteModal");
    modal.style.display = "block";
  }
  
  async deleteInfoModule()
  {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res  = await fetch(`${HTTPURL}product/deletemodule?moduleid=${this.state.selectedModule.id}&userid=${this.state.user.userid}`, {
      method: 'GET',
      headers: headers
    })
    console.log('edit module response',res);
    //display success here
  }


  async showdeleteInfoModule(moduleid)
  {
    const selectedModule = this.state.packages.find(item=>item.id == moduleid);
    await this.setState({selectedModule});
    let modal = document.getElementById("deleteModal");
    modal.style.display = "block";
  }
  
  async deleteInfoModule()
  {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res  = await fetch(`${HTTPURL}product/deletemodule?moduleid=${this.state.selectedModule.id}&userid=${this.state.user.userid}`, {
      method: 'GET',
      headers: headers
    })
    console.log('delete module response',res);
    //display success here
  }

  async infoModal(moduleid) {

    const selectedModule = this.state.packages.find(item=>item.id == moduleid);
    await this.setState({selectedModule});
    let modal = document.getElementById("infoModal");
    modal.style.display = "block";
  }

  async updateModal(moduleid) {

    const selectedModule = this.state.packages.find(item=>item.id == moduleid);
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
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  closeModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errormessage: "" });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // this.setState({loading : true});
    setTimeout(() => {
      this.setState({ loading: false });
      this.setState({ successmessage: "Added Successfully!" });
      setTimeout(() => {
        this.setState({ successmessage: false });

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
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            return json;
          });
        console.log("submitting");
        this.setState({ pkgname: "", pkgdescription: "" });
      }, 5000);
    }, 3000);
  };

  handleUpdate = async (e) => {
    e.preventDefault();
    // this.setState({loading : true});
    setTimeout(() => {
      this.setState({ loading: false });
      this.setState({ successmessage: "Updated Successfully!" });
      setTimeout(() => {
        this.setState({ successmessage: false });

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);

        let form = new FormData();
        form.append("userid", this.state.user.userid);
        form.append("productid", this.state.id);
        form.append("moduleid", this.state.editid);
        form.append("name", this.state.editname);
        form.append("description", this.state.editdescription);

        fetch(HTTPURL + "product/updatemodule", {
          method: "POST",
          body: form,
          headers: headers,
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            let modal = document.getElementById("updateModal");
            modal.style.display = "none";
            return json;
          });
        console.log("submitting");
      }, 5000);
    }, 3000);

    
    this.setState({updateData: true});
  };

  render() {
    return (
      <div className="container-fluid mx-auto">
        <div className="row product_details mt-4">
          <div className="col-md-6">
            {/* <img src={this.state.imageurl} onError={`this.src=${ placeholder }`} className="img-fluid" alt="" /> */}
            <img className="img-product" src={FILEURL+this.state.imageurl} onError={(e)=>{e.target.onerror = null; e.target.src= placeholder}}/>
          </div>
          <div className="col-md-6">
            <h4 className="text-dark">{this.state.name}</h4>
            <div className="description">
              <p>{this.state.description}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12 packages">
            <h5 className="text-dark text-center">MODULES</h5>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-10 offset-1">
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
            <div className="card">
              <div className="card-body">
                {this.state.packages === "" ? (
                  <div class="alert alert-warning" role="alert">
                    Oops, Product module is empty!
                  </div>
                ) : (
                  <div className="row">
                    {/* {this.state.packages} */}
                    {this.state.packages.map((module) => {
                      return (
                        <div className="col-md-4">
                          <p className="list-group-item">
                            {module.name}
                            <label class=" float-right">
                            <Link onClick={() => this.infoModal(module.id)}>
                            <i value={module.id} style={{ cursor: "pointer" }}
                                className="fa fa-info-circle mr-1 text-info"
                              ></i>
                            </Link>
                            <Link onClick={() => this.updateModal(module.id)}>
                            <i value={module.id} style={{ cursor: "pointer" }}
                               className="fa fa-edit mr-1 text-primary"></i>
                              </Link>
                            <Link onClick={() => this.showdeleteInfoModule(module.id)}>
                                <i className="fa fa-trash mr-1 text-danger"></i>
                              </Link>
                            </label>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Add New Module Modal */}
          {this.state.showmodal ? (
            <div id="myModal" class="modal">
              {/* Modal content  */}
              <div class="modal-content text-center p-5">
                <form onSubmit={this.handleSubmit} id="addpackage">
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
                        <div className="col-md-6">
                          <button
                            type="button"
                            onClick={this.closeModal}
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
            <div id="infoModal" class="modal">
              {/* Modal content  */}
              <div class="modal-content p-5">
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
                                Name:
                              </span>
                              {this.state.selectedModule.name}
                            </p>
                            <p>
                              
                              <span className="font-weight-bold">
                                Description:
                              </span>
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
            <div id="updateModal" class="modal">
              {/* Modal content  */}
              <div class="modal-content p-5">
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

                      

                      <div className="row">
                        <div className="col-md-6">
                          <button
                            type="button"
                            onClick={this.closeupdateModal}
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
              <div id="deleteModal" class="modal">
                  {/* Modal content  */}
                  <div class="modal-content text-center p-5">
                      {/* <div className="delete-icon">
                          &times;
                      </div> */}
                      <i class="fa fa-exclamation-triangle fa-3x dark-red mb-2" aria-hidden="true"></i>
                      <h3>Are you sure?</h3>
                      <p> Do you really want to delete this file?</p>
                      <div className="row">
                          <div className="col-md-6">                            
                              <button onClick={this.closedeleteModal} className="btn-block btn btn-outline-secondary">Cancel</button>
                          </div>
                          <div className="col-md-6">
                              <button onClick={() => this.deleteInfoModule(this.state.selectedModule.id)} className="btn btn-danger btn-block">Delete</button>
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
export default withContext(product_details);
