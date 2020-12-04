import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../../common/global_constant";
import { withContext } from "../../../common/context";

import 'react-trumbowyg/dist/trumbowyg.min.css'
import Trumbowyg from 'react-trumbowyg'

const headers = new Headers();
class UpdateClientProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      clientid: "",
      productid: "",
      modules: [],
      trainingcost: "",
      deploymentcost: "",
      trainingdate: "",
      deploymentdate: "",
      paymentdate: "",
      paymentstatus: "",
      licenseduration: "",
      expirationdate: '',
      remarks: '',
      errormessage: "",
      loading: false,
      files: [],
      users: [],
      previews: "",
      imagePreviewUrl: "",
      successmessage: "",
      selectedProduct: "",
      selectedModules: [],
    };
  }

  async componentWillMount() {
    const clientproductid = this.props.location.pathname.split("/")[2];
    await this.setState({ clientproductid });
    this.getClientProduct();
    
  }
  getModule(productId) {
    fetch(
      HTTPURL +
      `product/modules?productid=${productId}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          this.setState({ modules: result.data });
        }
      });

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
      const {
        paymentstatus,
        paymentdate,
        licenseduration,
        deploymentdate,
        deploymentstatus,
        deploymentcost,
        trainingcost,
        trainingdate,
        trainingstatus,
        imageurl,
        remarks,
        modules,
        product_id
      } = res.data;
      this.getModule(product_id);
      const selectedModules = modules.map(item=>item.id);
      this.setState({
        productid: product_id,
        paymentstatus,
        paymentdate,
        licenseduration,
        deploymentdate,
        deploymentstatus,
        trainingcost,
        deploymentcost,
        trainingdate,
        trainingstatus,
        imageurl,
        remarks,
        selectedModules,
        product_id
      });
    }
  }

  

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errormessage: "" });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    let myHeaders = new Headers();
    myHeaders.append("api-key", APIKEY);

    var formdata = new FormData();
    formdata.append("deploymentid", this.props.location.pathname.split("/")[2]);
    formdata.append("modules", this.state.selectedModules.toString());
    formdata.append("deploymentcost", this.state.deploymentcost);
    formdata.append("trainingcost", this.state.deploymentcost);
    formdata.append("userid", this.state.user.userid);
    formdata.append("licenseduration", this.state.licenseduration);
    formdata.append("paymentstatus", this.state.paymentstatus);
    formdata.append("deploymentstatus", this.state.deploymentstatus);
    formdata.append("trainingstatus", this.state.trainingstatus);
    formdata.append("paymentdate", this.state.paymentdate);
    formdata.append("trainingdate", this.state.trainingdate);
    formdata.append("deploymentdate", this.state.deploymentdate);
    formdata.append("remarks", this.state.remarks);

    const res = await fetch(HTTPURL + "deployment/update", {  method: "POST",  headers: myHeaders,body: formdata, }).then((response) => response.json())

      this.setState({ loading: false });
      if(res.status === true) {
          this.state.showAlert("success", res.message)
          window.history.back();
      } else{
          this.state.showAlert("danger",  res.message)
      }
  };

  handleCheck = ({ target }) => {
    const index = this.state.selectedModules.findIndex(item=> item === target.value);
    const { selectedModules } = this.state;
    if (index > -1) {
      selectedModules.splice(index,1);
    } else {
      selectedModules.push(target.value);
    }
    this.setState({ selectedModules });
  };

  onFocus(e) {
    e.currentTarget.type = "date";
  }

  deploymentDate(e) {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Deployment Date";
  }


  trainingDate(e) {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Training Date";
  }
  paymentDate(e) {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Payment Date";
  }
  expirationDate(e) {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Expiration Date";
  }
  removeImage(e) {
    this.setState({ imagePreviewUrl: "" });
  }

  removeOtherImage(e) {
    this.setState({ file: "", imageError: false });
  }

  handleImageChange(e) {
    e.preventDefault();

    let files = [];

    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files[i]);
    }

    this.setState({ files: files });
  }

  render() {
    return (
      <div className="container mx-auto row">
        <div className="col-md-12 mb-3 mt-4" id="profile">

          <form onSubmit={this.handleSubmit} id="updateclientproduct">
            <div className="card">
              <div className="card-header bg-medium font-weight-bold text-dark">
                UPDATE CLIENT PRODUCT
              </div>

              <div className="card-body px-5">
                <div className="form-group  mb-3">
                  <select
                    // onChange={(e) => {
                    //   this.getModule(e.target.value);
                    //   this.setState({ type: e.target.value });
                    // }}
                    value={this.state.productid}
                    name="productid"
                    id="productid"
                    className="custom-select custom-select-sm"
                    disabled
                  >
                    <option value="" disabled >
                      ---Select&nbsp;product---&nbsp;
                        </option>

                    {this.state.products.map((product,i) => {
                      return (
                        <option key={i} value={product.id}>{product.name}</option>
                      );
                    })}
                  </select>
                </div>


                <div className="row">
                  <div className="col-md-4 mb-1">
                    <div className="form-group">
                      <label htmlFor="cost" className="font-weight-bold">
                        Deployment Cost
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-white py-1 alt">
                          &#8358;
                          </span>

                        <input
                          type=""
                          className="form-control form-control-sm py-3 border-left-0"
                          name="deploymentcost"
                          id="deploymentcost"
                          placeholder="Deployment Cost"
                          value={this.state.deploymentcost}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-1">
                  <div className=" form-group">
                      <label htmlFor="deploymentstatus" className="font-weight-bold">
                        Deployment Status
                      </label>
                      <select
                  className="custom-select custom-select-sm"
                  onChange={(e) => {
                          this.setState({ deploymentstatus: e.target.value });
                        }}
                        value={this.state.deploymentstatus}
                        name="deploymentstatus"
                        id="deploymentstatus"
                        style={{ height: '35px' }}
                      >
                        <option value="" disabled >
                          Deployment&nbsp;Status&nbsp;
                          </option>
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="complete">Complete</option>
                      </select>
                    </div>
                     </div>

                  <div className="col-md-4 mb-1">
                    
                  <div className="form-group">
                      <label htmlFor="deploymentdate" className="font-weight-bold">
                        Deployment Date
                      </label>
                      <input
                        className="form-control form-control-sm"
                        name="deploymentdate"
                        id="deploymentdate"
                        placeholder="Deployment Date"
                        onBlur={this.deploymentDate}
                        onFocus={this.onFocus}
                        value={this.state.deploymentdate}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  
                  </div>

                </div>

                <div className="row">
                  <div className="col-md-4 mb-1">
                    <div className="form-group">
                      <label htmlFor="cost" className="font-weight-bold">
                        Training Cost
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-white py-1 alt">
                          &#8358;
                          </span>

                        <input
                          type=""
                          className="form-control form-control-sm py-3 border-left-0"
                          name="trainingcost"
                          id="trainingcost"
                          placeholder="Training Cost"
                          value={this.state.trainingcost}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-1">
                    
                  <div className=" form-group">
                      <label htmlFor="trainingstatus" className="font-weight-bold">
                        Training Status
                      </label>
                      <select
                  className="custom-select custom-select-sm"
                  onChange={(e) => {
                          this.setState({ trainingstatus: e.target.value });
                        }}
                        value={this.state.trainingstatus}
                        name="trainingstatus"
                        id="trainingstatus"
                        style={{ height: '35px' }}
                      >
                        <option value=""  disabled>
                          Training&nbsp;Status&nbsp;
                          </option>
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="complete">Complete</option>
                      </select>
                    </div>
                    </div>

                  <div className="col-md-4 mb-1">
                
                  <div className="form-group">
                      <label htmlFor="trainingdate" className="font-weight-bold">
                        Training Date
                      </label>
                      <input
                        type="trainingdate"
                        className="form-control form-control-sm"
                        name="trainingdate"
                        id="trainingdate"
                        placeholder="Training Date"
                        onBlur={this.trainingDate}
                        onFocus={this.onFocus}
                        value={this.state.trainingdate}
                        onChange={this.handleInputChange}
                      />
                    </div>
                 
                  
                  </div>

                </div>

                <div className="row">
                  <div className="col-md-6 mb-1">
                    
                  <div className="form-group">
                      <label htmlFor="paymentdate" className="font-weight-bold">
                        Payment Date
                      </label>
                      <input
                        type="paymentdate"
                        className="form-control form-control-sm "
                        name="paymentdate"
                        id="paymentdate"
                        placeholder="Payment Date"
                        onBlur={this.paymentDate}
                        onFocus={this.onFocus}
                        value={this.state.paymentdate}
                        style={{ height: '35px' }}
                        onChange={this.handleInputChange}
                      />
                    </div>
                 
                  </div>


                  <div className="col-md-6 mb-1">

                  <div className=" form-group">
                      <label htmlFor="paymentstatus" className="font-weight-bold">
                        Payment Status
                      </label>
                      <select
                  className="custom-select custom-select-sm"
                  onChange={(e) => {
                          this.setState({ paymentstatus: e.target.value });
                        }}
                        value={this.state.paymentstatus}
                        name="paymentstatus"
                        id="paymentstatus"
                        style={{ height: '35px' }}
                      >
                        <option value="" disabled >
                          Payment&nbsp;Status&nbsp;
                          </option>
                        <option value="pending">Pending</option>
                        <option value="incomplete">Incomplete</option>
                        <option value="complete">Complete</option>
                      </select>
                    </div>
                  
                  </div>
                </div>
                

                
                <div className="row">
                  <div className="col-md-4 mb-1">
                    <div className="form-group">
                      <label htmlFor="licenseduration" className="font-weight-bold">
                        License Coverage
                        </label>
                      <select
                  className="custom-select custom-select-sm"
                  onChange={(e) => {
                          this.setState({ licenseduration: e.target.value });
                        }}
                        id="licenseduration"
                        name="licenseduration"
                        value={this.state.licenseduration}
                      >
                        <option value="" disabled>
                          License&nbsp;Duration
                          </option>
                          <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quaterly">Quarterly</option>
                        <option value="bi-annual">Bianually</option>
                        <option value="annual">Annually</option>
                        <option value="indefinite">Indefinite</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 mb-1">
                    <div className="form-group">
                      <label htmlFor="expirationdate" className="font-weight-bold">
                        Expiration Date
                      </label>
                      <input
                        className="form-control form-control-sm"
                        name="expirationdate"
                        id="expirationdate"
                        placeholder="Expiration Date"
                        onBlur={this.expirationDate}
                        onFocus={this.onFocus}
                        value={this.state.expirationdate}
                        onChange={this.handleInputChange}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    {/* <button className="btn bg-orangered text-light btn-sm mt-4">Renew</button> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="remarks" className="font-weight-bold">
                        Deployment Remarks
                      </label>
                      <div />
                      
                      <Trumbowyg 
                        id="remarks"
                        placeholder="Remarks"
                        data={this.state.remarks}
                        onChange={this.handleInputChange}/>
                      {/* <textarea
                        type="text"
                        className="form-control form-control-sm"
                        name="remarks"
                        rows="7"
                        id="remarks"
                        placeholder="Remarks"
                        value={this.state.remarks}
                        onChange={this.handleInputChange}
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="row">
                  {this.state.modules.length > 0 ? (
                    this.state.modules.map((module,i) => (
                      <div className="col-md-4" key={i}>
                        <p className="list-group-item">
                          {module.name}
                          <label className="switch float-right">
                            <input
                              type="checkbox"
                              value={module.id}
                              onChange={this.handleCheck}
                              checked={ this.state.selectedModules.findIndex(item=>item === module.id) > -1}
                            />
                            <span className="slider round"></span>
                          </label>
                        </p>
                      </div>
                    ))
                  ) : (
                    <span></span>
                      // <div>
                      //   <div className="container-fluid">
                      //     <div
                      //       className="alert alert-warning text-center"
                      //       role="alert"
                      //     >
                      //       Select a product!
                      //   </div>
                      //   </div>
                      // </div>
                    )}
                </div>
              </div>

              <div className="card-footer">
                <div className="float-right">
                  {this.state.loading ? (
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary px-4"
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
                        className="btn btn-sm btn-primary px-3 py-2"
                      >
                        <i className="fas fa-folder-open mr-2"></i>
                      Save
                      </button>
                    )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div >
    );
  }
}
export default withContext(UpdateClientProduct);
