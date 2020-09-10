import React, { Component } from "react";
import { withContext } from "../../../common/context";
import { Link } from "react-router-dom";
import { HTTPURL, FILEURL, APIKEY } from "../../../common/global_constant";
import avatar from "../../../assets/images/avatar.png";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      products: [],
      users: [],
      selectedUser: {},
      fullname: "",
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getProducts();
  }

  async getUsers() {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(HTTPURL + `user?userid=${this.props.user.userid}`, {
      headers: headers,
    }).then((response) => response.json());
    if (res["status"]) {
      this.setState({ users: res["data"] });

      // User's Profile info
      const userid = this.props.location.pathname.split("/")[2];
      const selectedUser = this.state.users.find(
        (item) => item.userid == userid
      );
      await this.setState({ selectedUser });
    }
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
        }
      });
  }

  render() {
    return (
      <div className="container mx-auto row">
        <div className="col-md-12 mb-3 mt-4" id="profile">
          <div className="w-100 text-center">
            <h3>PROFILE INFORMATION </h3>
          </div>

          <div className="row mt-4">
            <div className="col-md-4 text-center box2 mb-3" id="profilePix">
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

            <div className="col-md-6 ">
              <h3 className="text-dark">{this.state.selectedUser.businessname}</h3>
              <div className="row mt-3">
                <div className="col-md-12">  
                  <h6>
                    {" "}
                    <span className="font-weight-bold">
                      Lastname:
                    </span>{" "}
                    {this.state.selectedUser.lastname}
                  </h6>
                  <h6>
                    {" "}
                    <span className="font-weight-bold">
                      Firstname:
                    </span>{" "}
                    {this.state.selectedUser.firstname}
                  </h6>    
                  <h6>
                    {" "}
                    <span className="font-weight-bold">
                      Othername:
                    </span>{" "}
                    {this.state.selectedUser.othername}
                  </h6>    
                  <h6>
                    {" "}
                    <span className="font-weight-bold">
                      Telephone:
                    </span>{" "}
                    {this.state.selectedUser.telephone}
                  </h6>    
                  <h6>
                    {" "}
                    <span className="font-weight-bold">
                      Email:
                    </span>{" "}
                    {this.state.selectedUser.email}
                  </h6>   
                  </div>  
                </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 px-5 pb-5">
              <div className="row mt-4">
                <div className="col-md-12">
                  <h5 className="text-dark font-weight-bold">
                    Contact Information
                  </h5>
                </div>
                <div className="col-md-12">
                  <p>
                    loremlorem loremloremv loremlorem loremlorem loremlorem
                    loremlorem loremlorem loremlorem loremlorem loremlorem
                    loremlorem loremlorem loremlorem loremlorem loremlorem
                    loremlorem loremlorem loremlorem loremlorem loremlorem
                    loremlorem loremlorem.{" "}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12 packages">
                  <h5 className="text-dark font-weight-bold">Products</h5>
                </div>
                <div className="col-md-12">
                <div className="row">
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary new_product mb-2"
                    >
                      <Link
                        to={{
                          pathname: "/addclientproduct",
                          search: this.props.location.pathname.split("/")[2],
                        }}
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
                            &nbsp;Add&nbsp;New&nbsp;Product
                          </small>
                        </i>
                      </Link>
                    </button>
                  </div>
                </div>
                {this.state.products === "" ? (
                  <div class="alert alert-warning" role="alert">
                    Oops, Product module is empty!
                  </div>
                ) : (
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div
                            id="table"
                            className="card pt-2 mt-3 justify-content-center shadow px-2"
                          >
                            <div className="table-responsive">
                              <table className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">
                                <thead>
                                  <tr>
                                    <th className="py-2">S/N</th>
                                    <th className="py-2">Product&nbsp;Name</th>
                                    {/* <th className="py-2">Packages</th> */}
                                    <th className="py-2">Price</th>
                                    <th className="py-2">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.products.map((product, index) => {
                                    return (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        {/* <td style={{maxWidth: "150px"}}>
                                                        {product.modules.map( module => {
                                                            return(
                                                                <span>{module.name} </span>
                                                            )}
                                                        )}
                                                        </td> */}
                                        <td>{product.cost}</td>
                                        <td style={{ minWidth: "70px" }}>
                                          <Link
                                            to={() =>
                                              `/updateclientproduct/${product.id}`
                                            }
                                          >
                                            <i className="fa fa-edit m-1"></i>
                                          </Link>
                                          <Link
                                            to={() =>
                                              `/viewclientproduct/${product.id}`
                                            }
                                          >
                                            <i className="fa fa-eye m-1"></i>
                                          </Link>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
    );
  }
}

export default withContext(Profile);
