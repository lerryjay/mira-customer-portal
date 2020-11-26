import React, { Component } from "react";
import placeholder from "../../../assets/images/product-placeholder.gif";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";

class viewclientproduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      productname: "",
      productdescription: "",
      remarks: "",
      modules: [],
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
    }
  }

  async componentDidMount() {
    const clientproductid = this.props.location.pathname.split("/")[2];
    await this.setState({ clientproductid });
    this.getClientProduct();
  }
  closeModal() {
    let modal2 = document.getElementById("myModal");

    var span = document.getElementsByClassName("close2")[0];
    span.onclick = function () {
      modal2.style.display = "none";
    };
  }
  showModal = (e, file) => {
    this.setState({ previewFile: file });
    let modal2 = document.getElementById("myModal");
    modal2.style.display = "block";

  };

  async handleFileAttachment(e){
    const { user, clientproductid } = this.state;
    const form = new FormData(document.getElementById('fileForm'));
    form.append('userid',user.userid);
    form.append('clientproductid',clientproductid);
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(`${HTTPURL}clients/adddeploymentfile`,{
      method: "POST",
      headers: headers,
      body : form
    }).then(res=>res.json());
    if(res['status']){
      this.setState({ files: res.data });
    }
  }

  render() {
    return (
      <div className="container mx-auto row">
        <div className="col-md-12 mb-3 mt-4" id="profile">
          <div className="w-100 text-center">
            <h3>DEPLOYMENT DETAILS </h3>
          </div>

          <div className="row mt-4">
            <div className="col-md-4 py-3">
              <img
                className="img-product"
                src={FILEURL + this.state.imageurl}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholder;
                }}
              />
            </div>
            <div className="col-md-7 offset-md-1 py-3">
              <h3 className="text-dark">{this.state.productname}</h3>
              <h6>{this.state.productdescription}</h6>
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
          <div className="row mt-4 mb-3">
            <div className="col-md-4 packages">
              <h5 className="text-dark font-weight-bold">Modules</h5>
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
                    Modules have not been updated!
                  </h6>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}
export default withContext(viewclientproduct);
