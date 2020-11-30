import React, { Component } from "react";
import placeholder from "../../../assets/images/product-placeholder.gif";
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import pdf_placeholder from "../../../assets/images/pdf.png";

class viewclientproduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      productname: "",
      productdescription: "",
      remarks: "",
      modules: [],
      productmodules: [],
      cost: "",
      imageurl: "",
      expirydate:"",
      paymentdate: "",
      trainingdate: "",
      deploymentdate: "",
      paymentstatus: "",
      trainingstatus: "",
      licenseduration: "",
      deploymentstatus: "",
      clientproductid: "",
      previewFile: "",
      product_id: '',
      files: [],
      showmodal: true,
      isloading: true,
      loading: false,
      deleting: false,
    };
  }

  
  async getClientProduct() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(
      `${HTTPURL}deployment/info?userid=${this.state.user.userid}&deploymentid=${this.state.clientproductid}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((res) => res.json());
    if (res["status"]) {
      this.state.hideLoader();
      const {
        name,
        description,
        expirydate,
        paymentstatus,
        paymentdate,
        licenseduration,
        deploymentdate,
        deploymentstatus,
        cost,
        trainingdate,
        trainingstatus,
        files,
        imageurl,
        remarks,
        modules,
        product_id
      } = res.data;
      this.setState({
        productname: name,
        productdescription: description,
        paymentstatus,
        paymentdate,
        expirydate,
        licenseduration,
        deploymentdate,
        deploymentstatus,
        cost,
        trainingdate,
        trainingstatus,
        files,
        imageurl,
        remarks,
        modules,
        product_id,
        isloading: false,
      });
      this.getModule(product_id);
    }
  }

  
   async showdeleteModal(clientproductid) {
     const selectedProduct = this.state.products.find(
      (item) => item.id === clientproductid
    );
    await this.setState({ selectedProduct });
    let modal = document.getElementById("deleteModal");
    modal.style.display = "block";
    
  }
  closedeleteModal() {
    let modal = document.getElementById("deleteModal");
    modal.style.display = "none";
  }
   deleteProduct = async () => {
    this.setState({ loading: true });;

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
        const result = await fetch(
          `${HTTPURL}deployment/delete?deploymentid=${this.state.clientproductid}&userid=${this.state.user.userid}`,
          {
            method: "GET",
            headers: headers,
          }
        ).then((response) => response.json());
          if(result.status === true){
            this.setState({ loading: false });
            this.state.showAlert("success", result.message)
            // let modal = document.getElementById("deleteModal");
            // modal.style.display = "none";
            // window.history.go("-1");
            this.props.history.goBack();
          }else{
            this.setState({ loading: false });
            this.state.showAlert("danger", result.message)
            let modal = document.getElementById("deleteModal");
            modal.style.display = "none";
          }
          
  }

   updateModules = async () =>{
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    var formdata = new FormData();
    formdata.append("deploymentid", this.props.location.pathname.split("/")[2]);
    formdata.append("modules", this.state.modules.map(item=>item.id).toString() );
    formdata.append("cost", this.state.cost);
    formdata.append("userid", this.state.user.userid);
    formdata.append("licenseduration", this.state.licenseduration);
    formdata.append("paymentstatus", this.state.paymentstatus);
    formdata.append("deploymentstatus", this.state.deploymentstatus);
    formdata.append("trainingstatus", this.state.trainingstatus);
    formdata.append("paymentdate", this.state.paymentdate);
    formdata.append("expirydate", this.state.expirydate);
    formdata.append("trainingdate", this.state.trainingdate);
    formdata.append("deploymentdate", this.state.deploymentdate);
    formdata.append("remarks", this.state.remarks);
    const res = await fetch(`${HTTPURL}deployment/update`,{ headers,method : 'POST',body : formdata });
    if(res['status']){
      this.closeModal('moduleModal');
    }
  }

  handleCheck = ({ target }) => {
    const index = this.state.modules.findIndex(item=> item.id === target.value);
    const { modules } = this.state;
    if (index > -1) {
      modules.splice(index,1);
    } else {
      modules.push(this.state.productmodules.find(item=>item.id === target.value));
    }
    this.setState({ modules });
  };

  async getModule(productId) {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const result = await fetch(`${HTTPURL}product/modules?productid=${productId}&userid=${this.state.user.userid}`, { method: "GET", headers: headers})
    .then((response) => response.json())
    if (result.status) {
      this.setState({  productmodules : result.data });
    }
  }


  async componentDidMount() {
    this.state.showLoader();
    const clientproductid = this.props.location.pathname.split("/")[2];
    await this.setState({ clientproductid });
    this.getClientProduct();
  }

  closeModal(id) {
    let modal2 = document.getElementById(id);
    modal2.style.display = "none";
  }

  showFileModal = (e, file) => {
    window.scrollTo(0,0)
    this.setState({ previewFile: file });
    let modal2 = document.getElementById("fileModal");
    modal2.style.display = "block";

  };

  showModuleModal = e => {
    window.scrollTo(0,0);
    let modal2 = document.getElementById("moduleModal");
    modal2.style.display = "block";
  };

  async handleFileAttachment(e) {
    this.setState({loading : true});

    const { user, clientproductid } = this.state;
    const form = new FormData(document.getElementById('fileForm'));
    form.append('userid', user.userid);
    form.append('deploymentid', clientproductid);
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(`${HTTPURL}deployment/addfile`, {
      method: "POST",
      headers: headers,
      body: form
    }).then(res => res.json());
      this.setState({ loading: false });
    if (res['status']) {
      this.setState({ files: res.data });
    }
  }

  async deleteFiles(index, item) {
    this.setState({ deleting: true });;
    
    const clientproductid = this.props.location.pathname.split("/")[2]; 

    const headers = new Headers();
    headers.append('API-KEY', APIKEY);

    const res = await fetch(HTTPURL + `deployment/deletefile?deploymentid=${clientproductid}&userid=${this.state.user.userid}&fileindex=${index}`, {
        method: 'GET',
        headers: headers
    }).then(response => response.json())
      if (res['status']) {
        this.getClientProduct();
        this.setState({ deleting: false });
      }
      

        
  }

  render() {
    return (
      <div className="container mx-auto ">
      <div className="card bg-card mt-4">
        <div className="col-md-12 mb-3 mt-4" id="profile">
          <div className="w-100 text-center">
            <h3>DEPLOYMENT DETAILS </h3>
          </div>

          {!this.state.isloading && (
              <div>
                <div className="row mt-4">
            <div className="col-md-4">
              <img
                className="img-product"
                src={FILEURL + this.state.imageurl}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholder;
                }}
                alt="Product"
              />
            </div>
            <div className="col-md-7 offset-md-1">
              <h3 className="text-dark">{this.state.productname} &nbsp; <span style={{color: '#7b7373', fontSize: '1.4rem'}}> #{this.state.clientproductid} </span></h3>
              <h6>{this.state.productdescription}</h6>

              <div className="row mt-5">
                <Link
                  className="btn mt-3 m-2 btn-primary mb-2 rounded-0 px-5"
                  to={() => `/updatedeployment/${this.state.clientproductid}`}
                >
                  <small className="newproduct" style={{ color: "#fff" }}>
                    &nbsp;Update&nbsp;
                  </small>
                </Link>
                <button
                  onClick={() =>
                    this.showdeleteModal(
                      this.state.clientproductid
                    )
                  }
                  type="button"
                  className="btn mt-3 m-2 btn-danger mb-2 rounded-0  px-5"
                >
                  <small className="newproduct" style={{ color: "#fff" }}>
                    &nbsp;Delete
                  </small>
                </button>
              </div>
            </div>
          </div>
          <div className="my-5">
            <div className="col-md-12">
              <h5 className="text-dark font-weight-bold">Cost & Timeline</h5>
            </div>
            <table className="table table-hover table-bordered table-sm text-center">
              <thead>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="text-left">Payment</th>
                  <td>{this.state.paymentdate}</td>
                  <td>{this.state.paymentstatus}</td>
                  <td></td>
                </tr>
                <tr>
                  <th className="text-left">Deployment</th>
                  <td> {this.state.deploymentdate} </td>
                  <td>{this.state.deploymentstatus}</td>
                  <td>{this.state.deploymentcost}</td>
                </tr>
                <tr>
                  <th className="text-left">Training</th>
                  <td>{this.state.trainingdate}</td>
                  <td>{this.state.trainingstatus}</td>
                  <td>{this.state.trainingcost}</td>
                </tr>
                <tr>
                  <th className="text-left">License</th>
                  <td>{this.state.licenseduration}</td>
                  <td>___</td>
                  <td></td>
                </tr>
                <tr>
                  <th className="text-left">Expiration</th>
                  <td>{this.state.expirydate}</td>
                  <td>___</td>
                  <td></td>
                </tr>
              </tbody>
              {this.state.user.permissions.findIndex(permission => permission === "VIEWDEPLOYMENTCOST")
                ? <tfoot>
                    <tr>
                      <th className="text-left bg-light py-2">Total</th>
                      <td></td>
                      <td></td>
                      <td className="bg-light py-2">&#8358;{this.state.cost.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                : <span></span>
              }
            </table>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <h5 className="text-dark font-weight-bold">Remarks</h5>
            </div>
            <div className="col-md-12">
              {this.state.remarks === "" ? (
                <div className="alert alert-warning" role="alert">
                  <h6 className="text-center">
                    Edit client product to add a remark!
                  </h6>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{__html: this.state.remarks}} />
                // new DOMParser().parseFromString(this.state.remarks, 'text/html').body.innerHTML
                )}
            </div>
          </div>
          <div className="row mt-4 mb-3">
            <div className="col-md-4 packages">
              <h5 className="text-dark font-weight-bold">Modules</h5>
            </div>
            <div className="col-md-8 text-right">
              <button className="btn btn-success rounded-0 btn-sm py-1 px-2" onClick={this.showModuleModal}>Edit Modules</button>
            </div>
          </div>
          <div className="row">
            {this.state.modules.length > 0 ? (
              this.state.modules.map((item,i) => (
                <div className="col-md-3" key={i}>
                  <p className="list-group-item">{item.name}</p>
                </div>
              ))
            ) : (
                <div className="col-md-12 alert alert-warning" role="alert">
                  <h6 className="text-center">
                    You have not added any module for this client product!
                  </h6>
                </div>
              )}
          </div>
          {/* </div> */}

          {this.state.user.permissions.findIndex(permission => permission === "VIEWDEPLOYMENTFILE")
          ?
          <div>
            <div className="row mt-4">
            <div className="col-md-8">
              <h5 className="text-dark font-weight-bold mt-2">
                Attached Licenses & Files
              </h5>
            </div>
            {this.state.user.permissions.findIndex(permission => permission === "UPDATEDEPLOYMENTFILE")
            ? <div className="col-md-4 text-right">
               
               {this.state.loading ? 
                      <button type="submit" className="btn btn-sm btn-primary">
                      Uploading &nbsp;&nbsp;
                      <div class="spinner-grow spinner-grow-sm text-white" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                          <div class="spinner-grow spinner-grow-sm text-whitw" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                          <div class="spinner-grow spinner-grow-sm text-white" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                    </button>
                    : <form id="fileForm">
                  <label htmlFor="file" className="btn btn-sm btn-primary py-1 px-3">Attach Files</label>
                  <input style={{ display: 'none' }} type={"file"} id="file"
                    className="form-file form-file-sm" name="files[]" multiple placeholder=""
                    onChange={(e) => this.handleFileAttachment(e)} />
                
                </form>}
              </div>
              : <span></span>
            }     
          </div>
          
          <div className="row">
            <div className="col-md-12 text-right">
              {this.state.deleting ? 
                    <button type="submit" className="btn btn-sm btn-danger">
                    Deleting &nbsp;&nbsp;
                    <div className="spinner-grow spinner-grow-sm text-white" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                        <div className="spinner-grow spinner-grow-sm text-whitw" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow spinner-grow-sm text-white" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                  </button>
                  : <span></span>
              }
                </div>
          </div>
            {this.state.user.permissions.findIndex(permission => permission === "VIEWDEPLOYMENTFILE")
            ? <div className="row">
                {this.state.files.length ? (
                  this.state.files.map((item, index) => (
                    <div className="col-md-3 col-lg-2 text-center py-2" key={index}>
                      {item.match(/\.(jpg|jpeg|png)$/) ? (
                        <div className="attached_files">
                          <img
                            id="img"
                            style={{ width: "100px", height: "100px", cursor: "pointer" }}
                            className="m-2"
                            onClick={(e) => this.showFileModal(e, item)}
                            src={FILEURL + item}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = placeholder;
                            }}
                            alt="Product"
                          />
                         <span onClick={() => this.deleteFiles(index, item)}>
                              <i className="fa fa-trash text-danger"></i>
                          </span>
  
                        </div>
                      ) : (
                          <div className="attached_files">
                            <img
                              src={pdf_placeholder}
                              onClick={(e) => this.showFileModal(e, item)}
                              style={{ width: "100px", height: "100px" }}
                              className="m-2"
                              alt="PDF logo"
                            />
                            <span onClick={() => this.deleteFiles(index, item)}>
                                <i className="fa fa-trash text-danger"></i>
                            </span>
                          </div>
                        )}
                      <br /> {item}
                    </div>
                  ))
                ) : (
                    <div className="col-md-12 alert alert-warning" role="alert">
                      <h6 className="text-center">
                        No files were attached corresponding to this deployment!
                      </h6>
                    </div>
                  )}
              </div>
            : <span></span>
            }
        
        </div>
          : <span></span>
            }
              </div>
          )}
          </div>

          {/* Delete Product */}
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
                    <p> Do you really want to delete this file?</p>
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
                            className="btn btn-block btn-outline-danger"
                          >
                            <div
                              className="spinner-border text-danger"
                              role="status"
                              id="loader"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              this.deleteProduct(this.state.clientproductid)
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


          <div id="moduleModal" className="modal2">
            <div className="px-2 d-flex">
              <span className="close close3" onClick={(e) => this.closeModal("moduleModal")}>&times;</span>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 px-3">
                <div className="card">
              <div className="card-body">
                <div className="row">
                {
                  this.state.productmodules.map((module,i) => (
                    <div className="col-md-4" key={i}>
                      <p className="list-group-item">
                        {module.name}
                        <label className="switch float-right">
                          <input
                            type="checkbox"
                            value={module.id}
                            onChange={this.handleCheck}
                            checked={ this.state.modules.findIndex(item=>item.id === module.id) > -1}
                          />
                          <span className="slider round"></span>
                        </label>
                      </p>
                    </div>
                  ))
                }
                </div>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <button className="btn btn-success rounded-0 px-4" onClick={this.updateModules}>Update Modules</button>
                  </div>
                </div>
              </div>
            </div>
      
                </div>
              </div>
            </div>
            </div>

        <div id="fileModal" className="modal2">
            <div className="px-2 d-flex">
              <a
                download
                href={FILEURL + this.state.previewFile}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary rounded-0 top-left mr-auto"
                style={{ position: "absolute" }}
              >
                Download
              </a>{" "}
              <span className="close close3" onClick={(e) => this.closeModal("fileModal")}>&times;</span>
            </div>
            <div className="d-flex justify-content-center align-content-center">
              {this.state.previewFile.match(/\.(jpg|jpeg|png)$/) ? (
                <img src={FILEURL + this.state.previewFile} alt="View logo" />
              ) : (
                  <img src={pdf_placeholder} alt="PDF logo" />
                )}
            </div>
          </div>
      
      </div>
      </div>
    );
  }
}
export default withContext(viewclientproduct);
