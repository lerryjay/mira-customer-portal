import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../../common/global_constant";
import { withContext } from "../../../common/context";

const headers = new Headers();
class AddClientProduct extends Component {
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
      licensecoverage: "",
      expirationdate: '',
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

  componentWillMount() {
    this.getProducts();
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
          console.log(result.data);
          this.setState({ modules: result.data });
        }
      });

    console.log(this.state.modules);
  }

  getProducts() {
    headers.append("API-KEY", APIKEY);
    fetch(HTTPURL + `product?userid=${ this.state.user.userid}`, {
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
    let mod = "";
    this.state.selectedModules.forEach((module) => {
      mod += module + ",";
    });

    let myHeaders = new Headers();
    myHeaders.append("api-key", APIKEY);

    var formdata = new FormData();
    formdata.append("clientid", this.state.location.search.split("?")[1]);
    formdata.append("productid", this.state.type);
    formdata.append("modules", mod);
    formdata.append("cost", this.state.cost);
    formdata.append("userid", this.state.user.userid);

    fetch(HTTPURL + "clients/addproduct", {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == true) {
          setTimeout(() => {
            this.setState({ loading: false });
            this.setState({ successmessage: data.message });
            console.log("submitting");
            this.setState({
              type: "",
              selectedModules: [],
              cost: "",
              modules: [],
            });
            setTimeout(() => {
              this.setState({ successmessage: false });
            }, 5000);
          }, 3000);
        } else {
          setTimeout(() => {
            this.setState({ loading: false });
            this.setState({ errormessage: data.message });
            setTimeout(() => {
              this.setState({ errormessage: false });
            }, 5000);
          }, 3000);
        }
      });
  };

  addModule = async (moduleId) => {
    await this.setState((prevState) => ({
      selectedModules:
        prevState.selectedModules.length == 0
          ? [moduleId]
          : [...prevState.selectedModules, moduleId],
    }));
  };
  removeModule = async (moduleId) => {
    await this.setState((prevState) => ({
      selectedModules: prevState.selectedModules.filter(
        (mod) => mod != moduleId
      ),
    }));
  };
  handleCheck = ({ target }) => {
    if (target.checked) {
      target.removeAttribute("checked");
      this.addModule(target.id);
    } else {
      target.setAttribute("checked", true);
      this.removeModule(target.id);
    }
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

  paymentDate(date,licenseCoverage) {

    if (licenseCoverage == "monthly") {
         date = new Date()
        let expiration = `${date.getUTCMonth() + 1}/${date.getUTCDay()}/${date.getUTCFullYear() + 1 }`
        this.setState({ expirationdate : expiration });
        console.log(this.state.expirationdate)
      } 
  }

  render() {
    let files = this.state.files.map((file) => {
      this.state.imagePreviewUrl = URL.createObjectURL(file);
      // this.setState({imagePreviewUrl: URL.createObjectURL(file) })
      return file.name.match(/\.(jpg|jpeg|png)$/) ? (
        <div className="imgPreview m-2" id="files">
          <i className="fa fa-trash" onClick={(e) => this.removeImage(e)}></i>
          <img src={this.state.imagePreviewUrl} className="imagePreview" />
        </div>
      ) : (
        <div className="other_files m-2" id="otherfiles">
          <i
            className="fa fa-trash"
            onClick={(e) => this.removeOtherImage(e)}
          ></i>
          {file.name}
        </div>
      );
    });
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

          <form onSubmit={this.handleSubmit} id="addclientproduct">
            <div className="card">
              <div className="card-header bg-medium font-weight-bold text-dark">
                ADD CLIENT PRODUCT
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-12"></div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <select
                        onChange={(e) => {
                          this.getModule(e.target.value);
                          this.setState({ type: e.target.value });
                        }}
                        value={this.state.type}
                        name="type"
                        id="type"
                        className=" form-control form-select form-select-sm"
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
                  </div>

                  <div className="col-md-6 mb-1">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-white py-1 alt">
                          &#8358;
                        </span>
                        <label htmlFor="" className="sr-only">
                          Cost
                        </label>
                        <input
                          type="number"
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

                  <div className="col-md-6 mb-1">
                    <div className="form-group">
                      <label htmlFor="" className="sr-only">
                        Liscence Coverage
                      </label>
                      <select
                        className=" form-control form-select form-select-sm"
                        onChange={(e) => {
                          this.setState({ licensecoverage: e.target.value });
                        }}
                        value={this.state.licensecoverage}
                      >
                        <option value="" selected disabled>
                          --License&nbsp;coverage--
                        </option>
                        <option value="monthly">Monthly</option>
                        <option value="quaterly">Quarterly</option>
                        <option value="biannually">Bianually</option>
                        <option value="annually">Annually</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mb-1">
                    <div className="form-group">
                      <label htmlFor="" className="sr-only">
                        Payment Status
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        name="paymentstatus"
                        id="paymentstatus"
                        placeholder="Payment Status"
                        value={this.state.paymentstatus}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-1">
                    <div className="form-group">
                      <label htmlFor="" className="sr-only">
                        Payment Date
                      </label>
                      <input
                        type="paymentdate"
                        className="form-control form-control-sm"
                        name="paymentdate"
                        id="paymentdate"
                        placeholder="Payment Date"
                        onBlur={this.paymentDate}
                        onFocus={this.onFocus}
                        value={this.state.paymentdate}
                        onChange={(e) => {
                          this.paymentDate(e.target.value, this.state.licensecoverage);
                          this.setState({ paymentdate: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  
                  <div className="col-md-6 mb-1">
                    <div className="form-group">
                      <label htmlFor="" className="sr-only">
                        Deployment Status
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        name="deploymentstatus"
                        id="deploymentstatus"
                        placeholder="Deployment Status"
                        value={this.state.deploymentstatus}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-1">
                    <div className="form-group">
                      <label htmlFor="" className="sr-only">
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

                  <div className="col-md-6 mb-1">
                    <div className="form-group">
                      <label htmlFor="" className="sr-only">
                        Training Status
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        name="trainingstatus"
                        id="trainingstatus"
                        placeholder="Training Status"
                        value={this.state.trainingstatus}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-1">
                    <div className="form-group">
                      <label htmlFor="" className="sr-only">
                        Training Date
                      </label>
                      <input
                        type="trainingdate"
                        className="form-control form-control-sm"
                        name="trainingdate"
                        id="trainingdate"
                        placeholder="Training Date"
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-1">
                    <div className="form-group">
                      <label htmlFor="" className="sr-only">
                      Expiration Status
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        name="expirationstatus"
                        id="expirationstatus"
                        placeholder="Expiration Status"
                        value={this.state.expirationstatus}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-1">
                    <div className="form-group">
                      <label htmlFor="" className="sr-only">
                        Expiration Date
                      </label>
                      <input
                      
                        className="form-control form-control-sm"
                        name="expirationdate"
                        id="expirationdate"
                        placeholder="Expiration Date"
                        value={this.state.expirationdate}
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
                          {module.name}{" "}
                          <label className="switch float-right">
                            {" "}
                            <input
                              type="checkbox"
                              id={module.id}
                              onClick={this.handleCheck}
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

                <div className="row justify-content-center" id="preview">
                  {files}
                </div>
              </div>

              <div className="card-footer">
                <label
                  htmlFor="files"
                  className="btn btn-sm btn-primary py-2 px-3"
                >
                  Attach Liscence and Files{" "}
                </label>
                <i className="font-weight-bold">
                  {" "}
                  The only accepted files are *pdf, *jpg and *png
                </i>
                <input
                  style={{ display: "none" }}
                  type={"file"}
                  id="files"
                  className="form-file form-file-sm"
                  name="files[]"
                  placeholder=""
                  multiple
                  onChange={(e) => this.handleImageChange(e)}
                />
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
      </div>
    );
  }
}
export default withContext(AddClientProduct);
