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
      productname: '',
      productdescription: '',
      remarks: '',
      modules: [],
      cost: '',
      imageurl: "",
      paymentdate: '',
      trainingdate: '',
      deploymentdate: '',
      paymentstatus: '',
      trainingstatus: '',
      licenseduration: '',
      deploymentstatus: '',
      clientproductid: '',
      previewFile: "",
      files: []
    };
    console.log(this.props);
  }

  async getClientProduct() {
    const headers = new Headers();
    headers.append('API-KEY', APIKEY);
    const res = await fetch(`${HTTPURL}clients/getproductdata?userid=${this.state.user.userid}&clientproductid=${this.state.clientproductid}`, {
      method: "GET",
      headers: headers,
    }).then(res => res.json());
    if (res['status']) {
      const { name, description, paymentstatus, paymentdate, licenseduration, deploymentdate, deploymentstatus, cost, trainingdate, trainingstatus, files, imageurl, remarks, modules } = res.data;
      this.setState({ productname: name, productdescription: description, paymentstatus, paymentdate, licenseduration, deploymentdate, deploymentstatus, cost, trainingdate, trainingstatus, files, imageurl, remarks,modules });
    }
  }

  async componentDidMount() {
    const clientproductid = this.props.location.pathname.split('/')[2];
    await this.setState({ clientproductid });
    this.getClientProduct();
  }

  showModal = (e, file) => {
    this.setState({ previewFile: file });
    let modal2 = document.getElementById("myModal")
    modal2.style.display = "block";

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      modal2.style.display = "none";
    }
  }

  render() {
    return (
      <div className="container mx-auto row">
        <div className="col-md-12 mb-3 mt-4" id="profile">
          <div id="myModal" className="modal2">
            <div className="px-2 d-flex">
              <a download href={FILEURL + this.state.previewFile} target="_blank" className="btn btn-primary rounded-0 top-left mr-auto" style={{ position: 'absolute' }}>Download</a> //implement download button later
              <span className="close">&times;</span>
            </div>
            <div className="d-flex justify-content-center align-content-center">
              <div className="bg-white">
                {
                  this.state.previewFile.match(/\.(jpg|jpeg|png)$/) ? <img src={FILEURL + this.state.previewFile} /> : <img src={pdf_placeholder} />
                }
              </div>
            </div>
          </div>
          <div className="w-100 text-center">
            <h3>PRODUCT DETAILS </h3>
          </div>

          <div className="row mt-4">
            <div className="col-md-4">
              <img className="img-product" src={FILEURL + this.state.imageurl} onError={(e) => { e.target.onerror = null; e.target.src = placeholder }} />
            </div>
            <div className="col-md-7 offset-md-1">
              <h3 className="text-dark">{this.state.productname}</h3>
              <h6>
                {this.state.productdescription}
              </h6>

              <div className="row mt-5">
                <Link className="btn mt-3 m-2 btn-primary mb-2 rounded-0 px-5" to={() => `/editclient/${this.state.userid}`}>
                  <small className="newproduct" style={{ color: "#fff" }}>
                    &nbsp;Update&nbsp;
                    </small>
                </Link>
                <button type="button" className="btn mt-3 m-2 btn-danger mb-2 rounded-0  px-5" >
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
              <tfoot>
                <tr>
                  <th className="text-left bg-light py-2">Total</th>
                  <td></td>
                  <td></td>
                  <td className="bg-light py-2">{this.state.cost}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <h5 className="text-dark font-weight-bold">Remarks</h5>
            </div>
            <div className="col-md-12">
                {this.state.remarks == '' ?
                  <div className="alert alert-warning" role="alert">
                    <h6 className="text-center">Edit client product to add a remark!</h6>
                  </div> : this.state.remarks
                }
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 packages">
              <h5 className="text-dark font-weight-bold">Modules</h5>
            </div>
            {
              this.state.modules.length > 0 ?
                this.state.modules.map((item) => <div className="col-md-3">
                  <p className="list-group-item">{item.name}</p>
                </div>) : <div className="col-md-12 alert alert-warning" role="alert">
                  <h6 className="text-center">You have not added any module for this client product!</h6>
                </div>
            }
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <h5 className="text-dark font-weight-bold">
                Attached Licenses & Files
                  </h5>
            </div>
            {
              this.state.files.length ?
                this.state.files.map((item) => <div className="col-md-3 col-lg-2 text-center">
                  {
                    item.match(/\.(jpg|jpeg|png)$/) ? <img id="img" style={{ width: '100px', height: '100px' }} className="m-2" onClick={(e) => this.showModal(e, item)} src={FILEURL + item} onError={(e) => { e.target.onerror = null; e.target.src = placeholder }} />
                      : <img src={pdf_placeholder} onClick={(e) => this.showModal(e, item)} style={{ width: '100px', height: '100px' }} className="m-2" />
                  }<br /> {item}
                </div>
                ) : <div className="col-md-12 alert alert-warning" role="alert">
                  <h6 className="text-center">No files were attached corresponding to this deployment!</h6>
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
export default withContext(viewclientproduct);
