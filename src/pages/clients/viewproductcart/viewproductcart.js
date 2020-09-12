import React, { Component } from "react";
import placeholder from "../../../assets/images/product-placeholder.gif";
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY,FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import image from "../../../assets/images/mira.png"
import image2 from "../../../assets/images/Accsiss.png"
import image3 from "../../../assets/images/asset1.jpeg"
import pdf_placeholder from "../../../assets/images/pdf.png";

class viewproductcart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      previewFile: "",
    };
    console.log(this.props);
  }

  componentDidMount() {
    this.getLoader();
  }
  
  getLoader() {
    setTimeout(() => {
      this.setState({ loader: true });
      setTimeout(() => {
        this.setState({ loader: false });
      }, 3000);
    });
  }

  closeModal() {
    let modal2 = document.getElementById("myModal");
    
    var span = document.getElementsByClassName("close2")[0];
    span.onclick = function () {
      modal2.style.display = "none";
    };
  }

    showModal = (e, file) => {
      this.setState({ previewFile: file });
      let modal2 = document.getElementById("myModal");
      modal2.style.display = "block";
  
    };
  
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
          {!this.state.loader &&
        <div className="col-md-12 mb-3 mt-4" id="profile">
          <div id="myModal" className="modal2">
            <div className="px-2 d-flex">
              <a
                download
                href={FILEURL + this.state.previewFile}
                target="_blank"
                className="btn btn-primary rounded-0 top-left mr-auto"
                style={{ position: "absolute" }}
              >
                Download
              </a>{" "}
              <span className="close close2" onClick={this.closeModal}>&times;</span>
            </div>
            <div className="d-flex justify-content-center align-content-center">
              <div className="bg-white">
                {this.state.previewFile.match(/\.(jpg|jpeg|png)$/) ? (
                  <img src={FILEURL + this.state.previewFile} />
                ) : (
                  <img src={pdf_placeholder} />
                )}
              </div>
            </div>
          </div>
          
              <div className="w-100 text-center">
                <h3>PRODUCT DETAILS </h3>
              </div>

                <div className="row mt-4">
                  <div className="col-md-4">
                    <img className="img-product" src={image}/>
                  </div>
                  <div className="col-md-7 offset-md-1">
                    <h3 className="text-dark">Mira HPro</h3>
                    <h6 className="text-dark">
                    loremlorem loremloremv loremlorem loremlorem loremlorem loremlorem
                          loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem
                          loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem
                          loremlorem loremlorem loremlorem loremlorem.
                    </h6>
                      

                  </div>
                </div>
          <div className="my-5">
            <div className="col-md-12">
              <h5 className="text-dark font-weight-bold">Cost & Timeline</h5>
            </div>
            <table className="table table-hover table-bordered table-sm text-center">
              <thead>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="text-left">Payment</th>
                  <td>{this.state.paymentdate}</td>
                  <td>{this.state.paymentstatus}</td>
                  <td></td>
                </tr>
                <tr>
                  <th className="text-left">License</th>
                  <td>{this.state.licenseduration}</td>
                  <td>{this.state.paymentdate}</td>
                  <td></td>
                </tr>
                <tr>
                  <th className="text-left">Deployment</th>
                  <td> {this.state.deploymentdate} </td>
                  <td>{this.state.deploymentstatus}</td>
                  <td></td>
                </tr>
                <tr>
                  <th className="text-left">Training</th>
                  <td>{this.state.trainingdate}</td>
                  <td>{this.state.trainingstatus}</td>
                  <td></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="text-left bg-light py-2">Total</th>
                  <td></td>
                  <td></td>
                  <td className="bg-light py-2">{this.state.cost}</td>
                </tr>
              </tfoot>
            </table>
          </div>

                      
                    <div className="row mt-4">
                          <div className="col-md-12">
                            <h5 className="text-dark font-weight-bold">Remarks</h5>
                          </div>
                          <div className="col-md-12"> 
                          <p>loremlorem loremloremv loremlorem loremlorem loremlorem loremlorem
                          loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem
                          loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem
                          loremlorem loremlorem loremlorem loremlorem. </p>
                          </div>
                      </div>
                      <div className="row mt-4">
                          <div className="col-md-12 packages">
                            <h5 className="text-dark font-weight-bold">Modules</h5>
                          </div>
                          <div className="col-md-4">
                              <p className="list-group-item">
                                Payroll
                              </p>
                            </div>
                          <div className="col-md-4">
                              <p className="list-group-item">
                                Payroll
                              </p>
                          </div>
                          <div className="col-md-4">
                              <p className="list-group-item">
                                Payroll
                              </p>
                          </div>
                          <div className="col-md-4">
                              <p className="list-group-item">
                                Payroll
                              </p>
                          </div>
                          <div className="col-md-4">
                              <p className="list-group-item">
                                Payroll
                              </p>
                          </div>
                      </div>
            
                      <div className="row mt-4">
                          <div className="col-md-12">
                            <h5 className="text-dark font-weight-bold">Attached License and Files</h5>
                          </div>
                          <div className="col-md-3 py-2"> 
                            <img className="img-product" src={pdf_placeholder} />
                          </div>
                          <div className="col-md-3 py-2"> 
                            <img className="img-product" src={pdf_placeholder}/>
                          </div>
                      </div>

           
               </div>

                }
      </div>

     );
  }
}
export default withContext(viewproductcart);
