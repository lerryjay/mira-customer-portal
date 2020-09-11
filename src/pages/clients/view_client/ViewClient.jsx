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
          companyemail: result.data.companyemail,
          companytelephone: result.data.companytelephone,
          companycountry: result.data.companycountry,
          companystate: result.data.companystate,
          companylga: result.data.companylga,
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

          <div className="row my-5">
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
              <div className="col-md-6 offset-md-1 pl-5">
                <h3 className="text-dark">{this.state.businessname}</h3>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <h6>
                      {this.state.companyemail}
                    </h6>
                    <h6>
                      {this.state.companytelephone}
                    </h6>
                    <h6>
                      {this.state.companyaddress}
                    </h6>
                    <h6>
                      {this.state.companylga }, {this.state.companystate }, {this.state.companycountry }
                    </h6>
                    <div className="row mt-5">

                      <Link className="btn mt-3 m-2 btn-primary mb-2 rounded-0" to={() => `/editclient/${this.state.userid}`}>
                          <small className="newproduct" style={{ color: "#fff" }}>
                            &nbsp;Edit&nbsp;Account&nbsp;
                        </small>
                      </Link>

                      <Link className="btn mt-3 m-2 btn-primary mb-2 rounded-0" to={() => `/createuserticket/${this.state.userid}`}>
                          <small className="newproduct" style={{ color: "#fff" }}>
                            &nbsp;Create&nbsp;Ticket&nbsp;
                          </small>
                      </Link>
                      <button type="button" className="btn mt-3 m-2 btn-danger mb-2 rounded-0" >
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
            <div className="col-md-12 pb-5">
              <div className="row mt-4">
                <div className="col-md-12">
                  <h5 className="text-dark font-weight-bold mb-3">
                    Contact Person
                  </h5>
                </div>
                <div className="col-md-12">
                  <div className="col-md-8">
                    <h6>
                      {this.state.lastname }, {this.state.firstname } {this.state.othername }
                    </h6>
                    <h6>
                      {this.state.email}
                    </h6>
                    <h6>
                      {this.state.telephone}
                    </h6>
                  </div>

                  <div className="col-md-4">

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
                      <Link to={{
                          pathname: "/addclientproduct",
                          search: this.props.location.pathname.split("/")[2],
                        }} className="btn btn-sm btn-primary new_product mb-2" >

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
                      Oops, Product module is empty!
                    </div>
                  ) : (
                      <div className="row">
                        <div className="col-md-12">
                          <div
                            id="table"
                            className=" pt-2 mt-3 justify-content-center"
                          >
                            <div className="table-responsive">
                              <table
                                className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">

                                <thead>
                                  <tr>
                                    <th className="py-2">S/N</th>
                                    <th className="py-2">Product&nbsp;Name</th>
                                    <th className="py-2">Deployment status</th>
                                    <th className="py-2">Payment status</th>
                                    <th className="py-2">Cost</th>
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
                                        <td>
                                          {product.deploymentstatus}
                                        </td>
                                        <td>
                                          {product.paymentstatus}
                                        </td>
                                        <td>
                                          {product.cost}
                                        </td>
                                        <td style={{ minWidth: "70px" }}>
                                          <Link to={() => `/updateclientproduct/${product.id}`}>
                                            <i className="fa fa-edit m-1 px-3"></i>
                                          </Link>
                                          <Link to={() => `/viewclientproduct/${product.id}`}>
                                            <i className="fa fa-eye m-1  px-3"></i>
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
