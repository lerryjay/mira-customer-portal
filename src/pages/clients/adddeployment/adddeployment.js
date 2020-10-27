import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../../common/global_constant";
import { withContext } from "../../../common/context";


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
      liscenseduration: "",
      expirationdate: '',
      remarks:'',
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
  }
  getModule(productId) {
    const headers = new Headers();
    headers.append("API-KEY",APIKEY);
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
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errormessage: "" });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const mod = this.state.selectedModules.toString();
    // this.state.selectedModules.forEach((module) => {
    //   mod += module + ",";
    // });
    
    let myHeaders = new Headers();
    myHeaders.append("api-key", APIKEY);

    var formdata = new FormData(document.getElementById("addclientproduct"));

    formdata.append("clientid", this.props.location.pathname.split("/")[2]);
    formdata.append("modules", mod);
    formdata.append("userid", this.state.user.userid);
    formdata.append("productid", this.state.type);
    // formdata.append("cost", this.state.cost);
    // formdata.append("liscenseduration", this.state.liscenseduration);
    // formdata.append("paymentstatus", this.state.paymentstatus);
    // formdata.append("deploymentstatus", this.state.deploymentstatus);
    // formdata.append("trainingstatus", this.state.trainingstatus);
    // formdata.append("paymentdate", this.state.paymentdate);
    // formdata.append("trainingdate", this.state.trainingdate);
    // formdata.append("deploymentdate", this.state.deploymentdate);
    // formdata.append("remarks", this.state.remarks);
    // formdata.append('files[]', this.state.files);

    fetch(HTTPURL + "deployment/add", {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
          this.setState({ loading: false });
          if(data.status === true) {
              document.getElementById("addclientproduct").reset()
              this.state.showAlert("success", data.message)
              this.setState({
                type: "",
                liscenseduration: '',
                paymentstatus: '',
                deploymentstatus: '',
                trainingstatus: '',
                selectedModules: [],
                cost: "",
                paymentdate: '',
                modules: [],
                files: [],
                deploymentdate: '',
                trainingdate: '',
                remarks: '',
                expirationstatus: '',
                expirationdate: ''
              });
              window.history.back();
          } else{
              this.state.showAlert("danger",  data.message)
          }
      });
  };

  addModule = async (moduleId) => {
    await this.setState((prevState) => ({
      selectedModules:
        prevState.selectedModules.length === 0
          ? [moduleId]
          : [...prevState.selectedModules, moduleId],
    }));
  };
  removeModule = async (moduleId) => {
    await this.setState((prevState) => ({
      selectedModules: prevState.selectedModules.filter(
        (mod) => mod !== moduleId
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
    let files = this.state.files.map((file,i) => {
      return file.name.match(/\.(jpg|jpeg|png)$/) ? (
        <div className="imgPreview m-2" id="files" key={i}>
          <i className="fa fa-trash" onClick={(e) => this.removeImage(e)}></i>
          <img src={this.state.imagePreviewUrl} alt="Preview" className="imagePreview" />
        </div>
      ) : (
        <div className="other_files m-2" id="otherfiles" key={i}>
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
        

        <div className="col-md-12 mb-3 mt-4" id="profile">

          <form onSubmit={this.handleSubmit} id="addclientproduct">
            <div className="card">
              <div className="card-header bg-medium font-weight-bold text-dark">
              ADD CLIENT PRODUCT
              </div>

              <div className="card-body px-5">
                <div className="form-group  mb-3">
                <select
                  onChange={(e) => {
                    this.getModule(e.target.value);
                    this.setState({ type: e.target.value });
                  }}
                  value={this.state.type}
                  name="type"
                  id="type"
                  className="custom-select custom-select-sm"
                  >
                  <option value="" disabled>
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
                        Total Cost
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-white py-1 alt">
                          &#8358;
                          </span>

                        <input
                          type=""
                          className="form-control form-control-sm py-3 border-left-0"
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
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mb-1">
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
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-1">
                    <div className=" form-group">
                      <label htmlFor="expirationstatus" className="font-weight-bold">
                        Expiration Status
                      </label>
                      <select
                  className="custom-select custom-select-sm"
                  onChange={(e) => {
                          this.setState({ expirationstatus: e.target.value });
                        }}
                        value={this.state.expirationstatus}
                        name="expirationstatus"
                        id="expirationstatus"
                      >
                          <option value=""  disabled>
                          Expiration&nbsp;Status&nbsp;
                          </option>
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                        </select>
                    </div>
                  </div>
                  <div className="col-md-6 mb-1">
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
                      />
                    </div>
                  </div>
               
                  <div className="col-md-12 mb-1">
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
                        <option value="" disabled >
                          License&nbsp;Coverage
                          </option>
                        <option value="monthly">Monthly</option>
                        <option value="quaterly">Quarterly</option>
                        <option value="biannually">Bianually</option>
                        <option value="annually">Annually</option>
                        <option value="indefinite">Indefinite</option>
                      </select>
                    </div>
                  </div> </div>
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
                    this.state.modules.map((module,i) => (
                      <div className="col-md-4" key={i}>
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
                  type="file"
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
                      className="btn btn-sm bg-button px-4"
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
