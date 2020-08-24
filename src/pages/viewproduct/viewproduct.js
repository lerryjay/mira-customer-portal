import React, { Component } from 'react';
import image from '../../assets/images/Accsiss.png'
import sysbanker from '../../assets/images/sysbanker.png'
import accsissp from '../../assets/images/accsissp.png'
import mira from '../../assets/images/mira.png'


class viewproduct extends Component {
    render() {
        return (
            <div className="container mx-auto row">
               <div className="container">
                   <div className="row mt-1">
                        <div class="col-md-3 offset-md-9">
                            <button type="button" class="btn btn-primary new_product">Add New Product 
                            <i class="fa fa-plus-circle ml-2" aria-hidden="true"></i>
                            </button>
                        </div>
                   </div>
                    <div className="row mt-4">
                        <div className="col-md-3">
                            <div class="card text-center products">
                                <img src={image} className="image_product"  alt=""/>
                                <div class="card-body">
                                    <h5 class="card-title">Accsiss eBs</h5>
                                    {/* <p>DESIGNED FOR ACCOUNTING, SALES AND INVOICING.</p> */}
                                    <a href="#" class="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div class="card text-center products">
                                <img src={sysbanker} className="image_product"  alt=""/>
                                <div class="card-body">
                                    <h5 class="card-title">SYSBANKER EE</h5>
                                    <a href="#" class="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div class="card text-center products">
                                <img src={accsissp} className="image_product"  alt=""/>
                                <div class="card-body">
                                    <h5 class="card-title">Accsiss PPs</h5>
                                    <a href="#" class="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div class="card text-center products">
                                <img src={mira} className="image_product"  alt=""/>
                                <div class="card-body">
                                    <h5 class="card-title">Mira HPro</h5>
                                    <a href="#" class="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        );
    }
}

export default viewproduct;