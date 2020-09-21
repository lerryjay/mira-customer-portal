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
    };
  }

  
  async getClientProduct() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(
      `${HTTPURL}clients/getproductdata?userid=${this.state.user.userid}&clientproductid=${this.state.clientproductid}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((res) => res.json());
    if (res["status"]) {
      const {
        name,
        description,
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
      });
      this.getModule(product_id);
    }
  }

   updateModules = async () =>{
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    var formdata = new FormData();
    formdata.append("clientproductid", this.props.location.pathname.split("/")[2]);
    formdata.append("modules", this.state.modules.map(item=>item.id).toString() );
    formdata.append("cost", this.state.cost);
    formdata.append("userid", this.state.user.userid);
    formdata.append("licenseduration", this.state.licenseduration);
    formdata.append("paymentstatus", this.state.paymentstatus);
    formdata.append("deploymentstatus", this.state.deploymentstatus);
    formdata.append("trainingstatus", this.state.trainingstatus);
    formdata.append("paymentdate", this.state.paymentdate);
    formdata.append("trainingdate", this.state.trainingdate);
    formdata.append("deploymentdate", this.state.deploymentdate);
    formdata.append("remarks", this.state.remarks);
    const res = await fetch(`${HTTPURL}clients/updateproduct`,{ headers,method : 'POST',body : formdata });
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
    const { user, clientproductid } = this.state;
    const form = new FormData(document.getElementById('fileForm'));
    form.append('userid', user.userid);
    form.append('clientproductid', clientproductid);
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(`${HTTPURL}clients/adddeploymentfile`, {
      method: "POST",
      headers: headers,
      body: form
    }).then(res => res.json());
    if (res['status']) {
      this.setState({ files: res.data });
    }
  }

  deleteFiles(index, item) {
    const clientproductid = this.props.location.pathname.split("/")[2]; 

    const headers = new Headers();
    headers.append('API-KEY', APIKEY);

    fetch(HTTPURL + `clients/deletedeploymentfile?clientproductid=${clientproductid}&userid=${this.state.user.userid}&fileindex=${index}`, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
        });
        this.getClientProduct();
  }

  render() {
    return (
      <div className="container mx-auto ">
      <div className="card bg-card mt-4">
        <div className="col-md-12 mb-3 mt-4" id="profile">
          <div className="w-100 text-center">
            <h3>DEPLOYMENT DETAILS </h3>
          </div>

          <div className="row mt-4">
            <div className="col-md-4">
              <img
                className="img-product"
                src={FILEURL + this.state.imageurl}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholder;
                }}
              />
            </div>
            <div className="col-md-7 offset-md-1">
              <h3 className="text-dark">{this.state.productname}</h3>
              <h6>{this.state.productdescription}</h6>

              <div className="row mt-5">
                <Link
                  className="btn mt-3 m-2 btn-primary mb-2 rounded-0 px-5"
                  to={() => `/updateclientproduct/${this.state.clientproductid}`}
                >
                  <small className="newproduct" style={{ color: "#fff" }}>
                    &nbsp;Update&nbsp;
                  </small>
                </Link>
                <button
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
                  <th className="text-left">License</th>
                  <td>{this.state.licenseduration}</td>
                  <td>{this.state.paymentdate}</td>
                  <td></td>
                </tr>
                <tr>
                  <th className="text-left">Deployment</th>
                  <td> {this.state.deploymentdate} </td>
                  <td>{this.state.deploymentstatus}</td>
                  <td></td>
                </tr>
                <tr>
                  <th className="text-left">Training</th>
                  <td>{this.state.trainingdate}</td>
                  <td>{this.state.trainingstatus}</td>
                  <td></td>
                </tr>
              </tbody>
              {this.state.user.permissions.findIndex(permission => permission === "VIEWDEPLOYMENTCOST")
                ? <tfoot>
                    <tr>
                      <th className="text-left bg-light py-2">Total</th>
                      <td></td>
                      <td></td>
                      <td className="bg-light py-2">{this.state.cost}</td>
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
              {this.state.remarks == "" ? (
                <div className="alert alert-warning" role="alert">
                  <h6 className="text-center">
                    Edit client product to add a remark!
                  </h6>
                </div>
              ) : (
                  this.state.remarks
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
              this.state.modules.map((item) => (
                <div className="col-md-3">
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
                <form id="fileForm">
                  <label htmlFor="file" className="btn btn-sm btn-primary py-1 px-3">Attach Files</label>
                  <input style={{ display: 'none' }} type={"file"} id="file"
                    className="form-file form-file-sm" name="files[]" multiple placeholder=""
                    onChange={(e) => this.handleFileAttachment(e)} />
                </form>
              </div>
              : <span></span>
            }     
          </div>
            {this.state.user.permissions.findIndex(permission => permission === "VIEWDEPLOYMENTFILE")
            ? <div className="row">
                {this.state.files.length ? (
                  this.state.files.map((item, index) => (
                    <div className="col-md-3 col-lg-2 text-center py-2">
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
                          />
                          <Link onClick={() => this.deleteFiles(index, item)}>
                              <i className="fa fa-trash text-danger"></i>
                          </Link>
                        </div>
                      ) : (
                          <div className="attached_files">
                            <img
                              src={pdf_placeholder}
                              onClick={(e) => this.showFileModal(e, item)}
                              style={{ width: "100px", height: "100px" }}
                              className="m-2"
                            />
                            <Link onClick={() => this.deleteFiles(index, item)}>
                                <i className="fa fa-trash text-danger"></i>
                            </Link>
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
                  this.state.productmodules.map((module) => (
                    <div className="col-md-4">
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
                className="btn btn-primary rounded-0 top-left mr-auto"
                style={{ position: "absolute" }}
              >
                Download
              </a>{" "}
              <span className="close close3" onClick={(e) => this.closeModal("fileModal")}>&times;</span>
            </div>
            <div className="d-flex justify-content-center align-content-center">
              {this.state.previewFile.match(/\.(jpg|jpeg|png)$/) ? (
                <img src={FILEURL + this.state.previewFile} />
              ) : (
                  <img src={pdf_placeholder} />
                )}
            </div>
          </div>
      
      </div>
      </div>
    );
  }
}
export default withContext(viewclientproduct);
