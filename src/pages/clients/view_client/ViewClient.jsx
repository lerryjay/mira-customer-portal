import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withContext } from '../../../common/context';
import avatar from '../../../assets/images/avatar.png'
import { HTTPURL, APIKEY } from '../../../common/global_constant';


class ViewClient extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            ...this.props,
            products: [],
            name: '',
            email: '',
            telephone: '',
            businessname: '',
            userid: '',
          isloading: true
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
                if (!res['status']) {
                    this.setState({ products: [] });
                } else {
                    this.setState({ products: res.data });
                }
            });
    }

    componentWillMount() {
        const clienId = this.props.location.pathname.split('/')[2];
        fetch(`${HTTPURL}clients/getclient?clientid=${clienId}&userid=${this.state.user.userid}`, {
            method: "GET",
            headers: { "api-key": APIKEY },
        }).then(res => res.json()).then(result => {
            if (result.status == true) {
                this.setState({
                    lastname: result.data.lastname,
                    firstname: result.data.firstname,
                    othername: result.data.othername,
                    email: result.data.email,
                    telephone: result.data.telephone,
                    businessname: result.data.businessname,
                    companyaddress: result.data.companyaddress,
                    userid: result.data.user_id,
                    isloading: false
                })
            }

        })
    }

    componentDidMount() {
        this.getProducts();
    }
    
    render() {
        return (
            <div className="container mx-auto row">
              <div className="col-md-12 mb-3 mt-4" id="profile">
                <div className="w-100 text-center">
                  <h3>CLIENT INFORMATION </h3>
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
                    {!this.state.isloading && (
                  <div className="col-md-6 ">
                    <h3 className="text-dark">{this.state.businessname}</h3>
                    <div className="row mt-3">
                      <div className="col-md-12">  
                        <h6>
                          {" "}
                          <span className="font-weight-bold">
                            Lastname:
                          </span>{" "}
                          {this.state.lastname}
                        </h6>
                        <h6>
                          {" "}
                          <span className="font-weight-bold">
                            Firstname:
                          </span>{" "}
                          {this.state.firstname}
                        </h6>    
                        <h6>
                          {" "}
                          <span className="font-weight-bold">
                            Othername:
                          </span>{" "}
                          {this.state.othername}
                        </h6>    
                        <h6>
                          {" "}
                          <span className="font-weight-bold">
                            Telephone:
                          </span>{" "}
                          {this.state.telephone}
                        </h6>    
                        <h6>
                          {" "}
                          <span className="font-weight-bold">
                            Email:
                          </span>{" "}
                          {this.state.email}
                        </h6>   
                  <div className="row">

                    <Link to={() => `/editclient/${this.state.userid}`}>
                      <button
                        type="button"
                        className="btn mt-3 m-2 btn-primary mb-2"
                      >
                        <small className="newproduct" style={{ color: "#fff" }}>
                          &nbsp;Edit&nbsp;Account&nbsp;
                        </small>
                      </button>
                    </Link>

                    <Link to={() => `/createuserticket/${this.state.userid}`}>
                      <button
                        type="button"
                        className="btn mt-3 m-2 btn-primary mb-2"
                      >
                        <small className="newproduct" style={{ color: "#fff" }}>
                          &nbsp;Create&nbsp;Ticket&nbsp;
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
                    )}
                </div>
                
                <div className="row">
                  <div className="col-md-12 px-5 pb-5">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <h5 className="text-dark font-weight-bold mb-3">
                          Company Information
                        </h5>
                      </div>
                      <div className="col-md-12">  
                        <h6>
                          {" "}
                          <span className="font-weight-bold">
                            Company Email:
                          </span>{" "}
                          {this.state.companyemail}
                        </h6>
                        <h6>
                          {" "}
                          <span className="font-weight-bold">
                            Company Telephone:
                          </span>{" "}
                          {this.state.companytel}
                        </h6>
                        <h6>
                          {" "}
                          <span className="font-weight-bold">
                            Company Address:
                          </span>{" "}
                          {this.state.companyaddress}
                        </h6>
                        </div>  
                      <div className="col-md-12">  
                        <h6>
                          {" "}
                          <span className="font-weight-bold">
                            Country:
                          </span>{" "}
                          {this.state.country}
                        </h6>
                        <h6>
                          {" "}
                          <span className="font-weight-bold">
                            State:
                          </span>{" "}
                          {this.state.state}
                        </h6>
                        <h6>
                          {" "}
                          <span className="font-weight-bold">
                            Local Government Area:
                          </span>{" "}
                          {this.state.lga}
                        </h6>
                        </div>  
                      
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12 packages">
                        <h5 className="text-dark font-weight-bold">Products</h5>
                      </div>
                      <div className="col-md-12">
                      <div className="row">
                        <div className="col">
                            <Link
                              to={{
                                pathname: "/addclientproduct",
                                search: this.props.location.pathname.split("/")[2],
                              }}
                            >
                          <button
                            type="button"
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
                                  &nbsp;Add&nbsp;New&nbsp;Product
                                </small>
                              </i>
                          </button>
                            </Link>
                        </div>
                      </div>
                      {this.state.products.length === 0 ? (
                        <div class="alert alert-warning" role="alert">
                          Oops, Product module is empty!
                        </div>
                      ) : (
                            <div className="row">
                              <div className="col-md-12">
                                <div
                                  id="table"
                                  className="card pt-2 mt-3 justify-content-center shadow px-2"
                                >
                                  <div className="table-responsive">
                                  <table
                                                            className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">

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
                                                                            <td>
                                                                                {index + 1}
                                                                            </td>
                                                                            <td>
                                                                                {product.name}
                                                                            </td>
                                                                            {/* <td style={{maxWidth: "150px"}}>
                                                        {product.modules.map( module => {
                                                            return(
                                                                <span>{module.name} </span>
                                                            )}
                                                        )}
                                                        </td> */}
                                                                            <td>
                                                                                {product.cost}
                                                                            </td>
                                                                            <td style={{minWidth: "70px"}}>
                                                                                <Link to={() => `/updateclientproduct/${product.id}`}>
                                                                                    <i className="fa fa-edit m-1"></i>
                                                                                </Link>
                                                                                <Link to={() => `/viewclientproduct/${product.id}`}>
                                                                                    <i className="fa fa-eye m-1"></i>
                                                                                </Link>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                }



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
            </div>
            </div>
        
        )
    }
}
export default withContext(ViewClient);
