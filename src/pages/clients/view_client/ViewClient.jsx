import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withContext } from "../../../common/context";
import avatar from "../../../assets/images/avatar.png";
import { HTTPURL, APIKEY } from "../../../common/global_constant";

class ViewClient extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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
    };
  }

  getProducts() {
    const clientid = this.props.location.pathname.split("/")[2];

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    fetch(
      HTTPURL +
        `clients/products?userid=${this.state.user.userid}&clientid=${clientid}`,
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
          console.log(res.data, "products");
        }
      });
  }

  componentWillMount() {
    this.state.showLoader();
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
        this.state.hideLoader();
        if (result.status === true) {
          this.getProducts();
          this.setState({
            lastname: result.data.lastname,
            firstname: result.data.firstname,
            othername: result.data.othername,
            email: result.data.email,
            telephone: result.data.telephone,
            businessname: result.data.businessname,
            companyemail: result.data.companyemail,
            companytelephone: result.data.companytelephone,
            companycountry: result.data.companycountry,
            companystate: result.data.companystate,
            companylga: result.data.companylga,
            companyaddress: result.data.companyaddress,
            userid: result.data.user_id,
            isloading: false,
          });
        }
      });
  }

  async componentDidMount() {
    this.getClients();
  }

  async getClients() {
    const headers = new Headers();
    headers.append('API-KEY', APIKEY );
    const res = await fetch(HTTPURL + `clients/?userid=${this.state.user.userid}`, {
        method: 'GET',
        headers: headers
    }).then(response => response.json());
    
    if(res['status']) this.setState({ clients : res['data']})
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

  deleteProduct() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ successmessage: false });

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
        const res = fetch(
          `${HTTPURL}clients/deleteproduct?clientproductid=${this.state.selectedProduct.id}&userid=${this.state.user.userid}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        console.log("delete module response", res);

        this.setState({ successmessage: "Deleted Successfully!" });
        let modal = document.getElementById("deleteModal");
        modal.style.display = "none";
      }, 5000);
    }, 3000);
    //display success here
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

  suspendClient() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ successmessage: false });

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
        const res = fetch(
          `${HTTPURL}user/suspend?clientid=${this.state.selectedClient.user_id}&userid=${this.state.user.userid}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        this.setState({ successmessage: "Suspend Successfully!" });
        let modal = document.getElementById("suspendModal");
        modal.style.display = "none";
      }, 2000);
    }, 3000);
    //display success here
  }

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

  deleteClient() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ successmessage: false });

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
        const res = fetch(
          `${HTTPURL}clients/delete?clientid=${this.state.selectedClient.user_id}&userid=${this.state.user.userid}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        this.setState({ successmessage: "Deleted Successfully!" });
        let modal = document.getElementById("deleteClient");
        modal.style.display = "none";
      }, 2000);
    }, 3000);
    //display success here
  }


  render() {
    return (
      <div className="container-fluid px-5 mx-auto row">
        
        {this.state.loader && (
            <div className="spin-center">
              <span class="text-primary ">
                <span
                  class="spinner-grow spinner-grow-sm mr-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span style={{ fontSize: "14px" }}>Loading...</span>
              </span>
            </div>
          )}
          
        <div className="col-md-12 mb-3 mt-4" id="profile">


          {!this.state.loader && (
            <div>
            <div className="w-100 text-center">
              <h3>CLIENT INFORMATION </h3>
            </div>
              <div className="row my-5">
                <div className="col-md-4 text-center mb-3" id="profilePix">
                  <div className="card">
                    <div className="card-header"></div>
                    <div className="card-body">
                      <img
                        src={avatar}
                        alt=""
                        className="image_sidebar"
                        height="inherit"
                        width="170px"
                        style={{ marginTop: "-80px" }}
                      />
                    </div>
                  </div>
                </div>
                {!this.state.isloading && (
                  <div className="col-md-6 offset-md-1 pl-5">
                    <h3 className="text-dark">{this.state.businessname}</h3>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <h6>{this.state.companyemail}</h6>
                        <h6>{this.state.companytelephone}</h6>
                        <h6>{this.state.companyaddress}</h6>
                        <h6>
                          {this.state.companylga}, {this.state.companystate},{" "}
                          {this.state.companycountry}
                        </h6>
                        <div className="row mt-5">
                          <Link
                            className="btn mt-3 m-2 btn-primary mb-2 rounded-0"
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
                            className="btn mt-3 m-2 btn-primary mb-2 rounded-0"
                            to={() => `/createuserticket/${this.state.userid}`}
                          >
                            <small
                              className="newproduct"
                              style={{ color: "#fff" }}
                            >
                              &nbsp;Create&nbsp;Ticket&nbsp;
                            </small>
                          </Link>
                          <Link
                            onClick={() =>
                              this.showsuspendModal(
                                this.state.userid
                              )
                            }
                          >
                          <button
                            type="button"
                            className="btn mt-3 m-2 btn-danger mb-2 rounded-0"
                          >
                            <small
                              className="newproduct"
                              style={{ color: "#fff" }}
                            >
                              &nbsp;Suspend&nbsp;Account&nbsp;
                            </small>
                          </button>
                          </Link>
                          <Link
                            onClick={() =>
                              this.showdeleteClient(
                                this.state.userid
                              )
                            }
                          >
                          <button
                            type="button"
                            className="btn mt-3 m-2 btn-danger mb-2 rounded-0"
                          >
                            <small
                              className="newproduct"
                              style={{ color: "#fff" }}
                            >
                              &nbsp;Delete&nbsp;
                            </small>
                          </button>
                          </Link>
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
                            to={() => `/addclientproduct/${this.state.userid}`}
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
                    <div className="col-md-12">
                      {this.state.products.length === 0 ? (
                        <div class="alert alert-warning" role="alert">
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
                                          <tr>
                                            <td>{index + 1}</td>
                                            <td>{product.name}</td>
                                            <td>{product.deploymentstatus}</td>
                                            <td>{product.paymentstatus}</td>
                                            <td>{product.cost}</td>
                                            <td style={{ minWidth: "70px" }}>
                                              <Link
                                                to={() =>
                                                  `/updateclientproduct/${product.id}`
                                                }
                                              >
                                                <button className="btn-primary mr-3"><i className="fa fa-edit"></i> Edit</button>
                                              </Link>
                                              <Link
                                                to={() =>
                                                  `/viewclientproduct/${product.id}`
                                                }
                                              >
                                              <button className="btn-primary mr-3"><i className="fa fa-eye"></i> View</button>
                                              </Link>
                                              <Link
                                                onClick={() =>
                                                  this.showdeleteModal(
                                                    product.id
                                                  )
                                                }
                                              >
                                              <button className="btn-danger mr-3"> <i className="fa fa-trash text-white"></i> Delete</button>
                                              </Link>
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
                  </div>
                </div>
              </div>

              {/* Delete Module Info */}
              {this.state.showmodal ? (
                <div id="deleteModal" class="modal">
                  {/* Modal content  */}
                  <div class="modal-content modal-del text-center p-5">
                    {/* <div className="delete-icon">
                          &times;
                      </div> */}
                    <i
                      class="fa fa-exclamation-triangle fa-3x dark-red mb-2"
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
                <div id="suspendModal" class="modal2">
                  {/* Modal content  */}
                  <div class="modal-content modal-del text-center p-5">
                    {/* <div className="delete-icon">
                          &times;
                      </div> */}
                    <i
                      class="fa fa-exclamation-triangle fa-3x dark-red mb-2"
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
                              this.suspendClient(this.state.selectedClient.user_id)
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
                <div id="deleteClient" class="modal">
                  {/* Modal content  */}
                  <div class="modal-content modal-del text-center p-5">
                    {/* <div className="delete-icon">
                          &times;
                      </div> */}
                    <i
                      class="fa fa-exclamation-triangle fa-3x dark-red mb-2"
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
                              this.deleteClient(this.state.selectedClient.user_id)
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