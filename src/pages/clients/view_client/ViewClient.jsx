import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withContext } from "../../../common/context";
import avatar from "../../../assets/images/avatar.png";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import payment_card from "../../../assets/images/payment.png";

class ViewClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      products: [],
      clients: [],
      name: "",
      email: "",
      telephone: "",
      businessname: "",
      userid: "",
      showmodal: true,
      isloading: true,
      selectedProduct: "",
      file: "",
      imagePreviewUrl: "",
      imageurl: "",
      amount: '',
      walletBalance: ''
    };
  }

  getProducts() {
    const clientid = this.props.location.pathname.split("/")[2];

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    fetch(
      HTTPURL +
        `deployment/list?userid=${this.state.user.userid}&clientid=${clientid}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (!res["status"]) {
          this.setState({ products: [] });
        } else {
          this.setState({ products: res.data });
        }
      });
  }

 async componentWillMount() {
    this.state.showLoader();
    await this.getClients();
    await this.getWalletBalance();
    await this.getProducts();

    const clienId = this.props.location.pathname.split("/")[2];
    fetch(
      `${HTTPURL}clients/getclient?clientid=${clienId}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: { "api-key": APIKEY },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status === true) {
          this.setState({
            lastname: result.data.lastname,
            firstname: result.data.firstname,
            othername: result.data.othername,
            email: result.data.email,
            telephone: result.data.telephone,
            businessname: result.data.businessname,
            companyemail: result.data.companyemail,
            companytelephone: result.data.companytelephone,
            companycoutry: result.data.companycoutry,
            companystate: result.data.companystate,
            companylga: result.data.companylga,
            companyaddress: result.data.companyaddress,
            userid: result.data.user_id,
            isloading: false,
            imageurl: result.data.imageurl,
          });
        }
      });
      
      this.state.hideLoader();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errormessage: "" });
  };

  async getClients() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(
      HTTPURL + `clients/?userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((response) => response.json());

    if (res["status"]) this.setState({ clients: res["data"] });
  }

  closedeleteModal() {
    let modal = document.getElementById("deleteModal");
    modal.style.display = "none";
  }

  async showdeleteModal(productid) {
    const selectedProduct = this.state.products.find(
      (item) => item.id === productid
    );
    await this.setState({ selectedProduct });
    let modal = document.getElementById("deleteModal");
    modal.style.display = "block";
  }

 async deleteProduct() {
    this.setState({ loading: true });

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(
      `${HTTPURL}deployment/delete?deploymentid=${this.state.selectedProduct.id}&userid=${this.state.user.userid}`,
      {
        method: "POST",
        headers: headers,
      }
    ).then((response) => response.json());
    if (res.status === true) {
      this.getClients();
      this.getProducts();
      this.setState({ loading: false });
      this.state.showAlert("success", res.message);
      let modal = document.getElementById("deleteModal");
      modal.style.display = "none";
    } else {
      this.setState({ loading: false });
      this.state.showAlert("danger", res.message);
      let modal = document.getElementById("deleteModal");
      modal.style.display = "none";
    }
  }

  closeWallet() {
    let modal = document.getElementById("showWallet");
    modal.style.display = "none";
  }

  async showWallet(clientid) {
    const selectedClient = this.state.clients.find(
      (client) => client.user_id === clientid
    );
    await this.setState({ selectedClient });
    let modal = document.getElementById("showWallet");
    modal.style.display = "block";
  }

  fundWallet = e => {
    e.preventDefault();
      this.setState({ loading: true });

        const headers = new Headers();
        headers.append('API-KEY', APIKEY);

        let form = new FormData();
        form.append("userid", this.state.user.userid);
        form.append("clientid", this.props.location.pathname.split("/")[2]);
        form.append("amount", this.state.amount);

        
        fetch(HTTPURL + 'wallet/fund', {
            method: 'POST',
            body: form,
            headers: headers
        }).then(response => response.json())
        .then(result => { 
                this.setState({ loading: false });
                if(result.status === true) {
                  this.getWalletBalance();
                    this.setState({ loading: false });
                    this.state.showAlert("success", result.message)
                    this.setState({ amount: ''})
                    let modal = document.getElementById("showWallet");
                    modal.style.display = "none";
                } else{
                    this.setState({ loading: false });
                    this.state.showAlert("danger",  result.message)
                }
        })
  }

  async getWalletBalance() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    
    let clientid = this.props.location.pathname.split("/")[2];

    const res = await fetch(
      HTTPURL + `wallet/balance?clientid=${clientid}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((response) => response.json());

    if (res["status"]) this.setState({ walletBalance: res["data"] });
  
  }


  closesuspendModal() {
    let modal = document.getElementById("suspendModal");
    modal.style.display = "none";
  }

  async showsuspendModal(clientid) {
    const selectedClient = this.state.clients.find(
      (client) => client.user_id === clientid
    );
    await this.setState({ selectedClient });
    let modal = document.getElementById("suspendModal");
    modal.style.display = "block";
  }

  suspendClient = async () => {
    this.setState({ loading: true });

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(
      `${HTTPURL}user/suspend?clientid=${this.state.selectedClient.user_id}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    if (res.status) {
      this.setState({ loading: false });
      this.state.showAlert("success", "Suspend Successfully!");
      let modal = document.getElementById("suspendModal");
      modal.style.display = "none";
      this.props.history.goBack();
    } else {
      this.setState({ loading: false });
      let modal = document.getElementById("suspendModal");
      modal.style.display = "none";
    }
  };

  closedeleteClient() {
    let modal = document.getElementById("deleteClient");
    modal.style.display = "none";
  }

  async showdeleteClient(clientid) {
    const selectedClient = this.state.clients.find(
      (client) => client.user_id === clientid
    );
    await this.setState({ selectedClient });
    let modal = document.getElementById("deleteClient");
    modal.style.display = "block";
  }

  deleteClient = async () => {
    this.setState({ loading: true });
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(
      `${HTTPURL}clients/delete?clientid=${this.state.selectedClient.user_id}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((response) => response.json());

    if (res.status) {
      this.setState({ loading: false });
      this.state.showAlert("success", "Deleted Successfully!");
      let modal = document.getElementById("deleteClient");
      modal.style.display = "none";
      this.props.history.goBack();
    } else {
      this.setState({ loading: false });
      let modal = document.getElementById("deleteClient");
      modal.style.display = "none";
    }
  };
  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    let images = [];
    for (var i = 0; i < e.target.files.length; i++) {
      images[i] = e.target.files.item(i);
    }
    images = images.filter((file) => file.name.match(/\.(jpg|jpeg|png|gif)$/));

    if (images.length === 0) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: "",
          imageError: "Upload a valid Image",
        });
      };
    } else {
      this.setState({ imageError: false });
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };
    }

    reader.readAsDataURL(file);
  }

  async handleImageUpdate(e) {
    const { user, userid } = this.state;
    const form = new FormData(document.getElementById("imageForm"));
    form.append("userid", user.userid);
    form.append("clientid", userid);
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(`${HTTPURL}clients/updateimage`, {
      method: "POST",
      headers: headers,
      body: form,
    }).then((res) => res.json());
    if (res["status"]) {
      this.setState({ imageurl: res.data });
      this.state.showAlert("success", res.message);
    } else {
      this.state.showAlert("danger", res.message);
    }
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (
        <img
          src={imagePreviewUrl}
          className=" image_sidebar"
          height="170px"
          width="170px"
          alt="Preview"
          style={{ marginTop: "-80px", objectFit:'cover' }}
        />
      );
    } else {
      imagePreview = (
        <img
          src={FILEURL + this.state.imageurl}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = avatar;
          }}
          className="image_sidebar"
          height="170px"
          width="170px"
          alt="Preview"
          style={{ marginTop: "-80px", objectFit:'cover'}}
        />
      );
    }
    return (
      <div className="container-fluid mx-auto row">
     
        <div className="col-md-12 mb-3 mt-4" id="profile">
          {!this.state.isloading && (
            <div>
              <div className="w-100 text-center">
                <h3>CLIENT INFORMATION </h3>
              </div>
              <div className="row mt-5 mb-3">
                <div className="col-md-4 text-center mb-3" id="profilePix">
                  <div className="card">
                    <div className="card-header"></div>
                    <div className="card-body mb-3 position-relative">
                      <form id="imageForm">
                        {imagePreview}
                        <label htmlFor="file">
                          <i className="fas fa-2x text-purple fa-camera-retro"></i>{" "}
                        </label>
                        <input
                          style={{ display: "none" }}
                          type={"file"}
                          id="file"
                          className="form-file form-file-sm"
                          name="file"
                          placeholder=""
                          onChange={(e) => {
                            this.handleImageChange(e);
                            this.handleImageUpdate(e);
                          }}
                        />
                      </form>
                    </div>
                  </div>
                </div>

                {!this.state.isloading && (
                  <div className="col-md-8">
                    <h3 className="text-dark">{this.state.businessname}</h3>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <div className="row">
                        <div className="col-md-7 mb-2">
                        <h6>{this.state.companyemail}</h6>
                        <h6>{this.state.companytelephone}</h6>
                        <h6>{this.state.companyaddress}</h6>
                        <h6>
                          {this.state.companylga}, {this.state.companystate},{" "}
                          {this.state.companycoutry}
                        </h6>
                        </div>
                        <div className="col-md-5">
                        <div className=" hover-effect">
                            <div className="px-3 card py-4">
                              <div className="row align-items-center">
                                <div className="col">
                                <i className=" border-radius-4 fa fa-money-check py-3 px-4 text-white btn-primary fa-2x"></i>
                                </div>
                                <div className="col font-card text-right">
                                  <span className=" ">Wallet Balance</span>
                                  <br />
                                  <span className="text-large">&#8358;{this.state.walletBalance.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                        <div className="mt-2">
                          <Link
                            className="btn mt-3 m-2 btn-primary mb-2 btn-sm"
                            to={() => `/editclient/${this.state.userid}`}
                          >
                            <small
                              className="newproduct"
                              style={{ color: "#fff" }}
                            >
                              &nbsp;Edit&nbsp;Account&nbsp;
                            </small>
                          </Link>

                          <Link
                            className="btn mt-3 m-2 btn-primary mb-2 btn-sm"
                            to={() => `/createuserticket/${this.state.userid}`}
                          >
                            <small
                              className="newproduct"
                              style={{ color: "#fff" }}
                            >
                              &nbsp;Create&nbsp;Ticket&nbsp;
                            </small>
                          </Link>

                          <Link to={() => `/apilogs/${this.state.userid}`}>
                            <button
                              type="button"
                              className="btn mt-3 m-2 btn-primary mb-2 btn-sm"
                            >
                              <small
                                className="newproduct"
                                style={{ color: "#fff" }}
                              >
                                &nbsp;API&nbsp;Logs&nbsp;
                              </small>
                            </button>
                          </Link>
                          <Link to={() => `/transactions/${this.state.userid}`}>
                            <button
                              type="button"
                              className="btn mt-3 m-2 btn-primary mb-2 btn-sm"
                            >
                              <small
                                className="newproduct"
                                style={{ color: "#fff" }}
                              >
                                &nbsp;Transactions&nbsp;
                              </small>
                            </button>
                          </Link>
                            <button
                             onClick={() => this.showWallet(this.state.userid)}
                              type="button"
                              className="btn mt-3 m-2 btn-primary mb-2 btn-sm"
                            >
                              <small
                                className="newproduct"
                                style={{ color: "#fff" }}
                              >
                                &nbsp;Fund Wallet&nbsp;
                              </small>
                            </button>
                            <button
                            onClick={() =>
                              this.showsuspendModal(this.state.userid)
                            }
                              type="button"
                              className="btn mt-3 m-2 btn-danger mb-2 rounded-0 btn-sm"
                            >
                              <small
                                className="newproduct"
                                style={{ color: "#fff" }}
                              >
                                &nbsp;Suspend&nbsp;Account&nbsp;
                              </small>
                            </button>
                            <button
                            onClick={() =>
                              this.showdeleteClient(this.state.userid)
                            }
                              type="button"
                              className="btn mt-3 m-2 btn-danger mb-2 rounded-0 btn-sm"
                            >
                              <small
                                className="newproduct"
                                style={{ color: "#fff" }}
                              >
                                &nbsp;Delete&nbsp;
                              </small>
                            </button>
                        </div>
                      </div>
        
                    </div>
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col-md-12 pb-5">
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <h5 className="text-dark font-weight-bold mb-3">
                        Contact Person
                      </h5>
                    </div>
                    <div className="col-md-12">
                      <div className="col-md-12">
                        <div className="row">
                          <h6 className="col">
                            {this.state.lastname}, {this.state.firstname}{" "}
                            {this.state.othername}
                          </h6>
                          <h6 className="col">{this.state.email}</h6>
                          <h6 className="col">{this.state.telephone}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-6 packages ">
                      <h5 className="text-dark font-weight-bold">Products</h5>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col">
                          <Link
                            to={() => `/adddeployment/${this.state.userid}`}
                            className="btn btn-sm btn-primary new_product mb-2"
                          >
                            <i
                              className="fas fa-folder-plus"
                              style={{ color: "#fff" }}
                              aria-hidden="true"
                            >
                              <small
                                className="newproduct"
                                style={{ color: "#fff" }}
                              >
                                &nbsp;Add&nbsp;Product
                              </small>
                            </i>
                          </Link>
                        </div>
                      </div>
                    </div>
                    {!this.state.isloading && (

<div className="col-md-12">
{this.state.products.length === 0 ? (
  <div className="alert alert-warning" role="alert">
    No product has been added for this client!
  </div>
) : (
  <div className="row">
    <div className="col-md-12">
      <div
        id="table"
        className=" pt-2 mt-3 justify-content-center"
      >
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">
            <thead>
              <tr>
                <th className="py-2">S/N</th>
                <th className="py-2">
                  Product&nbsp;Name
                </th>
                <th className="py-2">
                  Deployment status
                </th>
                <th className="py-2">Payment status</th>
                <th className="py-2">Cost</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map(
                (product, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.deploymentstatus}</td>
                      <td>{product.paymentstatus}</td>
                      <td>&#8358;{product.cost.toLocaleString()}</td>
                      <td
                        style={{ minWidth: "70px" }}
                        className="d-flex justify-content-center"
                      >
                        <Link
                          to={() =>
                            `/updatedeployment/${product.id}`
                          }
                        >
                          <button className="btn-primary m-1">
                            <i className="fa fa-edit"></i>{" "}
                            Edit
                          </button>
                        </Link>
                        <Link
                          to={() =>
                            `/viewdeployment/${product.id}`
                          }
                        >
                          <button className="btn-primary m-1">
                            <i className="fa fa-eye"></i>{" "}
                            View
                          </button>
                        </Link>
                          <button
                          onClick={() =>
                            this.showdeleteModal(
                              product.id
                            )
                          }
                           className="btn-danger m-1">
                            {" "}
                            <i className="fa fa-trash text-white"></i>{" "}
                            Delete
                          </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)}
</div>

                    )}
                    
                    </div>
                </div>
              </div>

              {/* Fund Wallet */}
              {this.state.showmodal ? (
                <div id="showWallet" className="modal2">
                  
                  {/* Modal content  */}
                  <div className="modal-content modal-del text-center p-5">
                    <div className="row font-weight-bold mb-4">
                      <span className="text-large mx-auto">Fund Wallet</span>
                      <span className="text-danger close-fund"
                          onClick={this.closeWallet}>&times;</span>  

                    </div>

                    <div className="payment_card">
                    {/* <img src={payment_card} className="img-fluid" alt="payment_card"/> */}
         
                   <div className="col-md-7"> 
                     <form onSubmit={this.fundWallet}>
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text bg-white alt"
                        id="password"
                      >
                        &#8358;
                        {/* <i className="fas fa-money-check fa-fw"></i> */}
                      </span>
                      {/* <label for="amount">Amount</label> */}
                      <input
                        type="text"
                        className="form-control alt"
                        id="amount"
                        name="amount"
                        placeholder="Amount"
                        aria-label="text"
                        aria-describedby="amount"
                        autoComplete="amount"
                        value={this.state.amount}
                        onChange={this.handleInputChange}
                      />
                    </div>

                    {this.state.loading ? (
                      <button type="submit" className="btn btn-sm btn-primary">
                        <div
                          className="spinner-border text-white"
                          role="status"
                          id="loader"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-sm btn-primary">
                        <i className="fas fa-sign-in-alt fa-fw mr-1"></i>
                        FUND
                      </button>
                    )}
                    </form>
            
                     </div>


                    </div>
                    </div> 
                    </div>
              ) : (
                <span></span>
              )}

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
                            className="btn btn-block btn-primary"
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
                              this.deleteProduct(this.state.selectedProduct.id)
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

              {/* Suspend Account */}
              {this.state.showmodal ? (
                <div id="suspendModal" className="modal2">
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
                    <p> Do you really want to suspend this accouunt?</p>
                    <div className="row">
                      <div className="col-md-6">
                        <button
                          onClick={this.closesuspendModal}
                          className="btn-block btn btn-outline-secondary mb-2"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-md-6">
                        {this.state.loading ? (
                          <button
                            type="submit"
                            className="btn btn-block btn-danger"
                          >
                            <div
                              className="spinner-border text-white"
                              role="status"
                              id="loader"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              this.suspendClient(
                                this.state.selectedClient.user_id
                              )
                            }
                            className="btn btn-danger btn-block"
                          >
                            Suspend
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <span></span>
              )}

              {/* Delete Client */}
              {this.state.showmodal ? (
                <div id="deleteClient" className="modal">
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
                    <p> Do you really want to delete this accouunt?</p>
                    <div className="row">
                      <div className="col-md-6">
                        <button
                          onClick={this.closedeleteClient}
                          className="btn-block btn btn-outline-secondary mb-2"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-md-6">
                        {this.state.loading ? (
                          <button
                            type="submit"
                            className="btn btn-block btn-danger"
                          >
                            <div
                              className="spinner-border text-white"
                              role="status"
                              id="loader"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              this.deleteClient(
                                this.state.selectedClient.user_id
                              )
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
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default withContext(ViewClient);
