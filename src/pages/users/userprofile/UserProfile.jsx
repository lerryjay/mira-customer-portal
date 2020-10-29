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
      showmodal: true,
      clients:[],
      users: [],
      selectedUser: {},
      selectedClient: '',
      fullname: "",
    };
  }

  async componentDidMount() {
    this.setState({ loader: true });
    await this.getUsers();
    this.getClients();
    this.setState({ loader: false });
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

  closesuspendModal() {
    let modal = document.getElementById("suspendModal");
    modal.style.display = "none";
  }

   showsuspendModal(clientid) {
    const selectedClient = this.state.clients.find(
      (client) => client.user_id === clientid
    );
    this.setState({ selectedClient });
    let modal = document.getElementById("suspendModal")
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
          this.state.showAlert("success", 'Suspend Successfully!')
          let modal = document.getElementById("suspendModal");
          modal.style.display = "none";
        } 
        else{
          this.setState({ loading: false });
          let modal = document.getElementById("suspendModal");
          modal.style.display = "none";
        }
        
  }


  render() {
    return (
      <div className="container mx-auto row">
          {this.state.loader && (
            <div className="spin-center">
              <div className="loader"></div> 
            </div>
          )}
          
          {!this.state.loader &&  <div className="col-md-12 mb-3 mt-5" id="profile">
          <div className="w-100 text-center">
            <h3>PROFILE INFORMATION </h3>
          </div>

          <div className="row mt-4">
            <div className="col-md-4 text-center mb-3" id="profilePix">
              <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                {this.state.selectedUser.imageurl 
                  ?<img
                  src={FILEURL + this.state.selectedUser.imageurl }
                  alt=""
                  className="image_sidebar"
                  height="170px"
                  width="170px"
                  style={{ marginTop: "-80px" }}
                />
                :<img
                src={avatar}
                alt=""
                className="image_sidebar"
                height="170px"
                width="170px"
                style={{ marginTop: "-80px" }}
              />
                }
                </div>
              </div>
            </div>

            <div className="col-md-8 ">
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
                          <span
                            onClick={() =>
                              this.showsuspendModal(
                                this.state.selectedUser.userid
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
                          </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
         </div>

         
      }
      
      
              {/* Suspend Account */}
              {this.state.showmodal ? (
                <div id="suspendModal" className="modal">
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

</div>
    );
    
  }
}

export default withContext(Profile);
