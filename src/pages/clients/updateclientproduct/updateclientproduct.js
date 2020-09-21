import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../../common/global_constant";
import { withContext } from "../../../common/context";

const headers = new Headers();
class UpdateClientProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      clientid: "",
      productid: "",
      modules: [],
      cost: "",
      trainingdate: "",
      deploymentdate: "",
      paymentdate: "",
      paymentstatus: "",
      licenseduration: "",
      expirationdate: '',
      remarks: '',
      products: [],
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
    this.props.user.role === 'admin' && this.getProducts();
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
        if (result.status == true) {
          this.setState({ modules: result.data });
        }
      });

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
    console.log(res)
    if (res["status"]) {
      const {
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
      this.getModule(product_id);
      console.log('modules',modules)
      const selectedModules = modules.map(item=>item.id);
      this.setState({
        productid: product_id,
        paymentstatus,
        paymentdate,
        licenseduration,
        deploymentdate,
        deploymentstatus,
        cost,
        trainingdate,
        trainingstatus,
        imageurl,
        remarks,
        selectedModules,
        product_id
      });
    }
  }

  getProducts() {
    headers.append("API-KEY", APIKEY);
    fetch(HTTPURL + `product?userid=${this.state.user.userid}`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.setState({ products: data.data });

      })
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
    formdata.append("clientproductid", this.props.location.pathname.split("/")[2]);
    formdata.append("modules", this.state.selectedModules.toString());
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

    const res = await fetch(HTTPURL + "clients/updateproduct", {  method: "POST",  headers: myHeaders,body: formdata, }).then((response) => response.json())
    if (res.status) {
      this.setState({ successmessage: res.message,loading: false });
      setTimeout(() => {  this.setState({ successmessage: false }); window.history.back(); }, 5000);
    } else {
        this.setState({ loading: false,errormessage: res.message });
        setTimeout(() => { this.setState({ errormessage: false });}, 5000);
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
  removeImage(e) {
    console.log(e, "Image removed");
    this.setState({ imagePreviewUrl: "" });
  }

  removeOtherImage(e) {
    console.log(e, "Image removed");
    this.setState({ file: "", imageError: false });
    setTimeout(() => this.setState({ imageError: "" }), 5000);
  }

  handleImageChange(e) {
    e.preventDefault();

    let files = [];

    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files[i]);
    }

    this.setState({ files: files });
  }

  paymentDate(date, licenseCoverage) {

    if (licenseCoverage == "monthly") {
      date = new Date()
      let expiration = `${date.getUTCMonth() + 1}/${date.getUTCDay()}/${date.getUTCFullYear() + 1}`
      this.setState({ expirationdate: expiration });
      console.log(this.state.expirationdate)
    }
  }

  render() {
    return (
      <div className="container mx-auto row">
        {/* Success Message */}
        {this.state.successmessage ? (
          <div
            className="alert alert-success"
            role="alert"
            style={{
              position: "fixed",
              top: "70px",
              right: "10px",
              zIndex: "4",
            }}
          >
            <span className="mt-3">{this.state.successmessage}</span>
            <button
              type="button"
              className="close ml-4"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : (
            <span></span>
          )}

        <div className="col-md-12 mb-3 mt-4" id="profile">
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

          <form onSubmit={this.handleSubmit} id="updateclientproduct">
            <div className="card">
              <div className="card-header bg-medium font-weight-bold text-dark">
                UPDATE CLIENT PRODUCT
              </div>

              <div className="card-body px-5">
                <div className="form-group row mb-3">
                  <select
                    onChange={(e) => {
                      this.getModule(e.target.value);
                      this.setState({ type: e.target.value });
                    }}
                    value={this.state.productid}
                    name="productid"
                    id="productid"
                    className=" form-control form-select form-select-sm"
                    disabled
                  >
                    <option value="" selected disabled>
                      ---Select&nbsp;product---&nbsp;
                        </option>

                    {this.state.products.map((product) => {
                      return (
                        <option value={product.id}>{product.name}</option>
                      );
                    })}
                  </select>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-1">
                    <div className="form-group">
                      <label htmlFor="cost" className="font-weight-bold">
                        Total Cost
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-white py-1 alt">
                          &#8358;
                          </span>

                        <input
                          type=""
                          className="form-control form-control-sm py-3"
                          name="cost"
                          id="cost"
                          placeholder="Total Cost"
                          value={this.state.cost}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-1">
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
                        onChange={(e) => {
                          this.paymentDate(e.target.value, this.state.licensecoverage);
                          this.setState({ paymentdate: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mb-1">
                    <div className=" form-group">
                      <label htmlFor="paymentstatus" className="font-weight-bold">
                        Payment Status
                      </label>
                      <select
                        className=" form-control form-select form-select-sm"
                        onChange={(e) => {
                          this.setState({ paymentstatus: e.target.value });
                        }}
                        value={this.state.paymentstatus}
                        name="paymentstatus"
                        id="paymentstatus"
                        style={{ height: '35px' }}
                      >
                        <option value="" selected disabled>
                          Payment&nbsp;Status&nbsp;
                          </option>
                        <option value="pending">Pending</option>
                        <option value="incomplete">Incomplete</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col-md-6 mb-1">
                    <div className=" form-group">
                      <label htmlFor="deploymentstatus" className="font-weight-bold">
                        Deployment Status
                      </label>
                      <select
                        className=" form-control form-select form-select-sm"
                        onChange={(e) => {
                          this.setState({ deploymentstatus: e.target.value });
                        }}
                        value={this.state.deploymentstatus}
                        name="deploymentstatus"
                        id="deploymentstatus"
                        style={{ height: '35px' }}
                      >
                        <option value="" selected disabled>
                          Deployment&nbsp;Status&nbsp;
                          </option>
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>


                  <div className="col-md-6 mb-1">
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
                        style={{ height: '35px' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-1">
                    <div className=" form-group">
                      <label htmlFor="trainingstatus" className="font-weight-bold">
                        Training Status
                      </label>
                      <select
                        className=" form-control form-select form-select-sm"
                        onChange={(e) => {
                          this.setState({ trainingstatus: e.target.value });
                        }}
                        value={this.state.trainingstatus}
                        name="trainingstatus"
                        id="trainingstatus"
                        style={{ height: '35px' }}
                      >
                        <option value="" selected disabled>
                          Training&nbsp;Status&nbsp;
                          </option>
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mb-1">
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
                        style={{ height: '35px' }}
                      />
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
                        className=" form-control form-select form-select-sm"
                        onChange={(e) => {
                          this.setState({ licenseduration: e.target.value });
                        }}
                        id="licenseduration"
                        name="licenseduration"
                        value={this.state.licenseduration}
                        style={{ height: '35px' }}
                      >
                        <option value="" selected disabled>
                          License&nbsp;Duration
                          </option>
                        <option value="monthly">Monthly</option>
                        <option value="quaterly">Quarterly</option>
                        <option value="biannually">Bianually</option>
                        <option value="annually">Annually</option>
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
                         style={{ height: '35px' }}
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
                    <button className="btn btn-warning text-light btn-sm mt-4">Renew</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="remarks" className="font-weight-bold">
                        Deployment Remarks
                      </label>
                      <textarea
                        type="text"
                        className="form-control form-control-sm"
                        name="remarks"
                        rows="7"
                        id="remarks"
                        placeholder="Remarks"
                        value={this.state.remarks}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  {this.state.modules.length > 0 ? (
                    this.state.modules.map((module) => (
                      <div className="col-md-4">
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
                      <div>
                        <div className="container-fluid">
                          <div
                            className="alert alert-warning text-center"
                            role="alert"
                          >
                            Select a product!
                        </div>
                        </div>
                      </div>
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
                        <span className="">Loading...</span>
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
