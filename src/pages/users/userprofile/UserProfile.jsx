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
    this.getLoader();
  }

  getLoader() {
    setTimeout(() => {
      this.setState({ loader: true });
      setTimeout(() => {
        this.setState({ loader: false });
        this.getUsers();
        this.getProducts();
      }, 3000);
    });
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
          
          {!this.state.loader &&  <div className="col-md-12 mb-3 mt-4" id="profile">
          <div className="w-100 text-center">
            <h3>PROFILE INFORMATION </h3>
          </div>

          <div className="row mt-4">
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

            <div className="col-md-6 ">
              <h3 className="text-dark">
                {this.state.selectedUser.businessname}
              </h3>
              <div className="row mt-3">
                <div className="col-md-12">
                  <h6>
                    {" "}
                    <span className="font-weight-bold">Lastname:</span>{" "}
                    {this.state.selectedUser.lastname}
                  </h6>
                  <h6>
                    {" "}
                    <span className="font-weight-bold">Firstname:</span>{" "}
                    {this.state.selectedUser.firstname}
                  </h6>
                  <h6>
                    {" "}
                    <span className="font-weight-bold">Othername:</span>{" "}
                    {this.state.selectedUser.othername}
                  </h6>
                  <h6>
                    {" "}
                    <span className="font-weight-bold">Telephone:</span>{" "}
                    {this.state.selectedUser.telephone}
                  </h6>
                  <h6>
                    {" "}
                    <span className="font-weight-bold">Email:</span>{" "}
                    {this.state.selectedUser.email}
                  </h6>
                  <div className="row">
                   {!this.state.selectedUser.isclient && <Link
                      to={{
                        pathname: "/createclientbyid",
                        search: this.props.location.pathname.split("/")[2],
                      }}
                    >
                      <button
                        type="button"
                        className="btn mt-3 m-2 btn-primary mb-2"
                      >
                        <small className="newproduct" style={{ color: "#fff" }}>
                        Create Account
                        </small>
                      </button>
                    </Link>}

                    <Link to={() => `/editclient/${this.state.selectedUser.userid}`}>
                      <button
                        type="button"
                        className="btn mt-3 m-2 btn-primary mb-2"
                      >
                        <small className="newproduct" style={{ color: "#fff" }}>
                          &nbsp;Edit&nbsp;Account&nbsp;
                        </small>
                      </button>
                    </Link>

                    <Link to={() => `/createuserticket/${this.state.selectedUser.userid}`}>
                      <button
                        type="button"
                        className="btn mt-3 m-2 btn-primary mb-2"
                      >
                        <small className="newproduct" style={{ color: "#fff" }}>
                          &nbsp;Create&nbsp;Ticket&nbsp;
                        </small>
                      </button>
                    </Link>

                    <Link to={() => `/viewClient/${this.state.selectedUser.userid}`}>
                      <button
                        type="button"
                        className="btn mt-3 m-2 btn-primary mb-2"
                      >
                        <small className="newproduct" style={{ color: "#fff" }}>
                          &nbsp;Company&nbsp;Profile&nbsp;
                        </small>
                      </button>
                    </Link>

                    <button
                      type="button"
                      className="btn mt-3 m-2 btn-danger mb-2"
                    >
                      <small className="newproduct" style={{ color: "#fff" }}>
                        &nbsp;Suspend&nbsp;Account&nbsp;
                      </small>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
         </div>
      }</div>
    );
  }
}

export default withContext(Profile);
