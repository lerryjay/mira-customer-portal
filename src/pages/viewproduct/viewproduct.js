import React, { Component } from 'react';
import { HTTPURL } from '../../common/global_constant';
import image from '../../assets/images/Accsiss.png'
import sysbanker from '../../assets/images/sysbanker.png'
import accsissp from '../../assets/images/accsissp.png'
import mira from '../../assets/images/mira.png'


class viewproduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: [],
            products: [],
            id: 1
        }
    }

    componentDidMount(){
        const headers = new Headers();
        headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
        fetch(HTTPURL + 'product', {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => this.setState({products: data.data}));

        let product = []
        console.log('changed successfully!', product)
        for (let i = 0; i < this.state.products.length; i++) {
            console.log(this.state.products[i])
            product.push(this.state.products[i])
            this.setState({ product :  product });
        }
    }

    render() {
        return (
            <div className="container mx-auto row">

                <div className="container">
                    <div className="row mt-1" style={{position:'fixed', top: '70px' , right: '10px', zIndex:'4'}}>
                        <div className="col-md-3 offset-md-9">
                            <button type="button" className="btn btn-sm btn-primary new_product">
                            <i className="fas fa-folder-plus" aria-hidden="true">
                            <small>&nbsp;New&nbsp;Product</small>
                            </i>
                            </button>
                        </div>
                    </div>
                    {this.state.products.map( product => {
                        return(
                    <div className="row mt-4">
                        <div className="col-md-3">
                            <div className="card text-center products">
                                <img src={image} className="image_product" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    {/* <p>DESIGNED FOR ACCOUNTING, SALES AND INVOICING.</p> */}
                                    <a href="#" className="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                        )}
                    )}
                    
                    <div className="row mt-4">
                        <div className="col-md-3">
                            <div className="card text-center products">
                                <img src={image} className="image_product" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">Accsiss eBs</h5>
                                    {/* <p>DESIGNED FOR ACCOUNTING, SALES AND INVOICING.</p> */}
                                    <a href="#" className="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center products">
                                <img src={sysbanker} className="image_product" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">SYSBANKER EE</h5>
                                    <a href="#" className="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center products">
                                <img src={accsissp} className="image_product" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">Accsiss PPs</h5>
                                    <a href="#" className="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center products">
                                <img src={mira} className="image_product" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">Mira HPro</h5>
                                    <a href="#" className="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                    </div>





                    <div className="row my-2">

                        <div className="col-lg-3 col-md-6 col-sm-12">

                            <div className="card-container">
                                <div className="card">
                                    <div className="front">
                                        <div className="card-header text-center font-weight-bold">
                                            <img src={image} className="image_product" alt="" />
                                            Accsiss eBs
                                            </div>
                                        <div className="card-body">
                                            hello world
                                            </div>
                                        <div className="card-footer">
                                            hello world world
                                            </div>
                                    </div>

                                    <div className="back">
                                        <div className="card-header text-center font-weight-bold">
                                            <img src={mira} className="image_product" alt="" />
                                            Accsiss eBs
                                        </div>
                                        <div className="card-body">
                                            Accsiss eBs is an accounting software, designed to run in multiple locations across different states, nations and continents, with complex network and diverse platforms. This version combines the functionalities of the small business version and more.
                                            </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12">

                            <div className="card-container">
                                <div className="card">
                                    <div className="front">
                                        <div className="card-header">
                                            <img src={sysbanker} className="image_product" alt="" />hello wor
                                            </div>
                                        <div className="card-body">
                                            hello world
                                            </div>
                                        <div className="card-footer">
                                            hello world world
                                            </div>
                                    </div>

                                    <div className="back">
                                        <div className="card-header">
                                            <img src={mira} className="image_product" alt="" />
                                            hello
                                        </div>
                                        <div className="card-body">
                                            hello world
                                            </div>
                                        <div className="card-footer">
                                            hello
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12">

                            <div className="card-container">
                                <div className="card">
                                    <div className="front">
                                        <div className="card-header">
                                            <img src={mira} className="image_product" alt="" />hello world
                                            </div>
                                        <div className="card-body">
                                            hello world
                                            </div>
                                        <div className="card-footer">
                                            hello world world
                                            </div>
                                    </div>

                                    <div className="back">
                                        <div className="card-header">
                                            <img src={sysbanker} className="image_product" alt="" />
                                            hello
                                        </div>
                                        <div className="card-body">
                                            hello world
                                            </div>
                                        <div className="card-footer">
                                            hello
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12">

                            <div className="card-container">
                                <div className="card">
                                    <div className="front">
                                        <div className="card-header">
                                            <img src={image} className="image_product" alt="" />
                                            hello world
                                        </div>
                                        <div className="card-body">
                                            hello world
                                        </div>
                                        <div className="card-footer">
                                            hello world world
                                        </div>
                                    </div>

                                    <div className="back">
                                        <div className="card-header">
                                            <img src={sysbanker} className="image_product" alt="" />
                                            hello
                                        </div>
                                        <div className="card-body">
                                            hello world
                                        </div>
                                        <div className="card-footer">
                                            hello
                                        </div>
                                    </div>

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