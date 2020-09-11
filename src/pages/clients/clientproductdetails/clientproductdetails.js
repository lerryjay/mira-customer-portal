import React, { Component } from "react";
import image from "../../../assets/images/Accsiss.png";
import { Link } from "react-router-dom";
import placeholder from "../../../assets/images/product-placeholder.gif";
import { HTTPURL, APIKEY,FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";

class clientproductdetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      name: "",
      description: "",
      editname: "",
      editdescription: "",
      editid: "",
      packages: [],
      pkgname: "",
      pkgdescription: "",
      id: "",
      errormessage: "",
      loading: false,
      successmessage: "",
      showmodal: true,
      showdeletemodal: true,
      selectedModule: {}
    };
    console.log(this.props);
  }

  componentDidMount() {
    this.getProduct();
    this.getModules();
  }

  getProduct() {
    const productid = this.props.location.pathname.split("/")[2];

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    fetch(
      `${HTTPURL}product/getproduct?productid=${productid}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status == true) {
          this.setState({
            name: result.data.name,
            description: result.data.description,
            id: result.data.id,
          });
        }
      });
  }

  getModules() {
    const productid = this.props.location.pathname.split("/")[2];

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    fetch(
      HTTPURL +
      `product/modules?productid=${productid}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.data.length === 0) {
          this.setState({ packages: '' });
          console.log("Oops, packages is empty")
        } else {
          this.setState({ packages: data.data });
          console.log(data, "packages")
        }

        // console.log(this.state.packages, "packages");
      });
  }

  async infoModal(moduleid) {

    const selectedModule = this.state.packages.find(item=>item.id == moduleid);
    await this.setState({selectedModule});
    let modal = document.getElementById("infoModal");
    modal.style.display = "block";
  }

  closeinfoModal() {
    let modal = document.getElementById("infoModal");
    modal.style.display = "none";
  }


  render() {
    return (
      <div className="container mx-auto mb-3">
        <div className="row mt-4">
          <div className="col-md-6">
            {/* <img src={this.state.imageurl} onError={`this.src=${ placeholder }`} className="img-fluid" alt="" /> */}
            <div className="row justify-content-center">
              <img className="image-product" src={FILEURL+this.state.imageurl} onError={(e)=>{e.target.onerror = null; e.target.src= placeholder}}/>
            </div>
            </div>
          <div className="col-md-6 mt-4">
            <h4 className="text-dark">{this.state.name}</h4>
            <div className="description">
              <p>{this.state.description}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12 packages">
            <h5 className="text-dark text-center">MODULES</h5>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {this.state.packages === "" ? (
                  <div class="alert alert-warning" role="alert">
                    Oops, Product module is empty!
                  </div>
                ) : (
                  <div className="row">
                    {/* {this.state.packages} */}
                    {this.state.packages.map((module) => {
                      return (
                        <div className="col-md-4">
                          <p className="list-group-item">
                            {module.name}
                            <label class=" float-right">
                            <Link onClick={() => this.infoModal(module.id)}>
                            <i value={module.id} style={{ cursor: "pointer" }}
                                className="fa fa-info-circle mr-3 text-info"
                              ></i>
                            </Link>
                            </label>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>


            </div>
          </div>

          {/* Show module info */}
          {this.state.showmodal ? (
            <div id="infoModal" class="modal">
              {/* Modal content  */}
              <div class="modal-content p-5">
                <form>
                  <div className="card">
                    <div className="card-header bg-medium font-weight-bold text-dark text-center">
                      MODULE INFORMATION
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 mb-1"></div>

                        <div className="col-md-12 mb-1">
                          <div className="form-group">
                            <p>
                              
                              <span className="font-weight-bold">
                                Name:&nbsp;
                              </span>
                              {this.state.selectedModule.name}
                            </p>
                            <p>
                              
                              <span className="font-weight-bold">
                                Description:
                              </span>
                              <p>{this.state.selectedModule.description}</p>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 text-center">
                          <button
                          type="button"
                            onClick={this.closeinfoModal}
                            className="btn-block btn btn-primary"
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <span></span>
          )}

        </div>
      </div>
    );
  }
}
export default withContext(clientproductdetails);
