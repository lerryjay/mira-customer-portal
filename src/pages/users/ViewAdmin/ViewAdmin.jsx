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
      users: [],
      selectedUser: {
        permissions: []
      },
      selectedClient: '',
      fullname: "",
    };
  }

  componentDidMount() {
    this.setState({ loader: true });
    this.getAdmins();
    this.setState({ loader: false });
  }

  async getAdmins() {
    const headers = new Headers();
    headers.append('API-KEY', APIKEY);
    const res = await fetch(HTTPURL + `admin?userid=${this.props.user.userid}`, {
      headers: headers
    }).then(response => response.json());
    if (res['status']) {
      this.setState({ users: res['data'] });
      // Admin's Profile info
      const adminid = this.props.location.pathname.split("/")[2];
      const selectedUser = this.state.users.find(  (item) => item.adminid === adminid );
      this.setState({ selectedUser });
    }
  }

  showsuspendModal(adminid) {
    const selectedUser = this.state.users.find(  (item) => item.adminid === adminid );
    this.setState({ selectedUser });
    let modal = document.getElementById("suspendModal")
    modal.style.display = "block";
  }

  closesuspendModal() {
    let modal = document.getElementById("suspendModal");
    modal.style.display = "none";
  }

  suspendAdmin = async () => {
    this.setState({ loading: true });

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
        const res = await fetch(
          `${HTTPURL}user/suspend?adminid=${this.state.selectedUser.user_id}&userid=${this.state.user.userid}`,
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
            <span className="text-primary ">
              <span
                className="spinner-grow spinner-grow-sm mr-2"
                role="status"
                aria-hidden="true"
              ></span>
              <span style={{ fontSize: "14px" }}>Loading...</span>
            </span>
          </div>
        )}

        {!this.state.loader && <div className="col-md-12 mb-3 mt-4" id="profile">
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

            <div className="col-md-6 ">
              <h3 className="text-dark">
                {this.state.selectedUser.businessname}
              </h3>
              <div className="row mt-3">
                <div className="col-md-12">
                  <h6>
                    
                    <span className="font-weight-bold">Lastname:</span>
                    {this.state.selectedUser.lastname}
                  </h6>
                  <h6>
                    
                    <span className="font-weight-bold">Firstname:</span>
                    {this.state.selectedUser.firstname}
                  </h6>
                  <h6>
                    
                    <span className="font-weight-bold">Othername:</span>
                    {this.state.selectedUser.othername}
                  </h6>
                  <h6>
                    
                    <span className="font-weight-bold">Telephone:</span>
                    {this.state.selectedUser.telephone}
                  </h6>
                  <h6>
                    
                    <span className="font-weight-bold">Email:</span>
                    {this.state.selectedUser.email}
                  </h6>
                  <div className="row">

                    <Link to={() => `/updateadmin/${this.state.selectedUser.adminid}`}>
                      <button
                        type="button"
                        className="btn mt-3 btn-sm m-2 btn-primary rounded-0 mb-2"
                      >
                        <small className="newproduct text-light">
                          &nbsp;Edit&nbsp;Account&nbsp;
                        </small>
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn mt-3 m-2 btn-sm  btn-danger mb-2 rounded-0"
                      onClick={() =>
                        this.showsuspendModal(
                          this.state.selectedUser.adminid
                        )
                      }
                    >
                      <small className="newproduct text-white"  >
                        &nbsp;Suspend&nbsp;Account&nbsp;
                       </small>
                    </button>
                    <button onClick={() =>
                      this.showsuspendModal(
                        this.state.selectedUser.adminid
                      )
                    }
                      type="button"
                      className="btn mt-3 m-2 btn-sm  btn-danger mb-2 rounded-0"
                    >
                      <small className="newproduct text-white" >
                        &nbsp;Delete&nbsp;Account&nbsp;
                            </small>
                    </button>
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
                          this.suspendAdmin(this.state.selectedUser.adminid)
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


        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-header bg-medium font-weight-bold text-dark">
              PERMISSIONS
                 <span className="float-right" id='edit' style={{ cursor: 'pointer' }} ><i className="fas fa-pen-square fa-2x"></i>
              </span>
            </div>
            <div className="card-body">
              <div className="row">
                {
                  this.state.selectedUser.permissions.length == 0 && <div className="col-md-12">
                    <div className="alert alert-warning my-3" role="alert">
                      <h6 className="text-center">No permissions has been granted to this user!</h6>
                    </div>
                  </div>
                }
                {this.state.selectedUser.permissions !== null && this.state.selectedUser.permissions.map((permission,i) => (
                  <div className="col-md-3" key={i}>
                    <p className="list-group-item px-2" style={{ fontSize: "12px" }}>
                      {permission}
                    </p>
                  </div>
                ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default withContext(Profile);
