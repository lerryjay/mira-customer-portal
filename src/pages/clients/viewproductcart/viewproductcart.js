import React, { Component } from "react";
import placeholder from "../../../assets/images/product-placeholder.gif";
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY,FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import image from "../../../assets/images/mira.png"
import image2 from "../../../assets/images/Accsiss.png"
import image3 from "../../../assets/images/asset1.jpeg"

class viewproductcart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
    };
    console.log(this.props);
  }

  render() {
    return (
      <div className="container mx-auto row">
        <div className="col-md-12 mb-3 mt-4" id="profile">
              <div className="w-100 text-center">
                <h3>PRODUCT DETAILS </h3>
              </div>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <img className="img-product" src={image}/>
                  </div>
                  <div className="col-md-6 mt-5">
                    <h3 className="text-dark">Mira HPro</h3>
                    <h4 className="text-dark">
                      &#8358;5000
                    </h4>
                      <h6> <span className="font-weight-bold">NB:</span> To be renewed nnually</h6>
                    
                    <div className="row mt-3">
                      <div className="col-md-6">
                      <h6> <span className="font-weight-bold">Payment status:</span> loremlorem</h6>
                      <h6> <span className="font-weight-bold">Deployment status:</span> loremlorem</h6>
                      <h6> <span className="font-weight-bold ">Training status:</span> loremlorem</h6>
                      <h6> <span className="font-weight-bold">Expiration status:</span> loremlorem</h6>
                      </div>
                      <div className="col-md-6">
                      <h6> <span className="font-weight-bold">Payment date:</span> loremlorem</h6>
                      <h6> <span className="font-weight-bold">Deployment date:</span> loremlorem</h6>
                      <h6> <span className="font-weight-bold">Training date:</span> loremlorem</h6>
                      <h6> <span className="font-weight-bold">Expiration date:</span> loremlorem</h6>
                      </div>
                    </div>   

                  </div>
                </div>
                

               <div className="card">
                 <div className="row">
                    <div className="col-md-12 px-5 pb-5">
                      
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
                          <div className="col-md-3"> 
                            <img className="img-product" src={image2}/>
                          </div>
                          <div className="col-md-3"> 
                            <img className="img-product" src={image3}/>
                          </div>
                      </div>

                    </div>
                 </div>
               </div>

          </div>
        
      </div>



// {/* <div className="container mx-auto row">
// <div className="col-md-12 mb-3 mt-4" id="profile">

//       <div className="card py-5">
//       <div className="w-100  text-center">
//         <h3 className="font-weight-bold">PRODUCT DETAILS </h3>
//       </div>
        
//       <div className="row mt-4">
//           <div className="col-md-6">
//             <img className="img-product" src={image}/>
//           </div>
//           <div className="col-md-6 mt-5">
//             <h3 className="text-dark">Mira HPro</h3>
//             <h4 className="text-dark">
//               &#8358;5000
//             </h4>
//               <h6> <span className="font-weight-bold">NB:</span> To be renewed annually</h6>
            
//             <div className="row mt-3">
//               <div className="col-md-6">
//               <h6> <span className="font-weight-bold text-info">Payment status:</span> loremlorem</h6>
//               <h6> <span className="font-weight-bold text-success">Deployment status:</span> loremlorem</h6>
//               <h6> <span className="font-weight-bold text-primary">Training status:</span> loremlorem</h6>
//               <h6> <span className="font-weight-bold text-danger">Expiration status:</span> loremlorem</h6>
//               </div>
//               <div className="col-md-6">
//               <h6> <span className="font-weight-bold text-info">Payment date:</span> loremlorem</h6>
//               <h6> <span className="font-weight-bold text-success">Deployment date:</span> loremlorem</h6>
//               <h6> <span className="font-weight-bold text-primary">Training date:</span> loremlorem</h6>
//               <h6> <span className="font-weight-bold text-danger">Expiration date:</span> loremlorem</h6>
//               </div>
//             </div>   

//           </div>
        

//       </div>
//          <div className="row">
//             <div className="col-md-12 px-5 pb-5">
              
//             <div className="row mt-4">
//                   <div className="col-md-12">
//                     <h5 className="text-dark font-weight-bold">Remarks</h5>
//                   </div>
//                   <div className="col-md-12"> 
//                   <p>loremlorem loremloremv loremlorem loremlorem loremlorem loremlorem
//                   loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem
//                   loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem
//                   loremlorem loremlorem loremlorem loremlorem. </p>
//                   </div>
//               </div>
//               <div className="row mt-4">
//                   <div className="col-md-12 packages">
//                     <h5 className="text-dark font-weight-bold">Modules</h5>
//                   </div>
//                   <div className="col-md-4">
//                       <p className="list-group-item">
//                         Payroll
//                       </p>
//                     </div>
//                   <div className="col-md-4">
//                       <p className="list-group-item">
//                         Payroll
//                       </p>
//                   </div>
//                   <div className="col-md-4">
//                       <p className="list-group-item">
//                         Payroll
//                       </p>
//                   </div>
//                   <div className="col-md-4">
//                       <p className="list-group-item">
//                         Payroll
//                       </p>
//                   </div>
//                   <div className="col-md-4">
//                       <p className="list-group-item">
//                         Payroll
//                       </p>
//                   </div>
//               </div>
    
//               <div className="row mt-4">
//                   <div className="col-md-12">
//                     <h5 className="text-dark font-weight-bold">Attached License and Files</h5>
//                   </div>
//                   <div className="col-md-3"> 
//                     <img className="img-product" src={image2}/>
//                   </div>
//                   <div className="col-md-3"> 
//                     <img className="img-product" src={image3}/>
//                   </div>
//               </div>

//             </div>
//          </div>
//   </div>
//         </div>

// </div> */}

     );
  }
}
export default withContext(viewproductcart);
