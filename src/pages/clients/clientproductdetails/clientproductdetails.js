import React, { Component } from "react";
import image from "../../../assets/images/Accsiss.png";
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


  render() {
    return (
      <div className="container mx-auto">
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
          <div className="col-md-10 offset-1">
            <div className="card">
              <div className="card-body">
                {this.state.packages === "" ? (
                  <div class="alert alert-warning" role="alert">
                    Oops, Product module is empty!
                  </div>
                ) : (
                    <div className="row">
                      {this.state.packages.map((module) => {
                        return (
                          <div className="col-md-4">
                            <p className="list-group-item">
                              {module.name}
                              <label class="switch float-right"> <input type="checkbox" id={module.id} onClick={this.handleCheck} /><span class="slider round"></span>
                              </label>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>


              <div className="card-footer">
                <div className="float-right">

                  <button type="submit" className="btn btn-sm btn-primary px-3">
                    <i className="fas fa-folder-open pr-2"></i>
                        Save
                    </button>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
export default withContext(clientproductdetails);
