import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { HTTPURL } from '../../common/global_constant';
import image from '../../assets/images/Accsiss.png'
// import sysbanker from '../../assets/images/sysbanker.png'
// import accsissp from '../../assets/images/accsissp.png'
// import mira from '../../assets/images/mira.png'


class clientviewproduct extends Component {
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
                    {/* <div className="row mt-4">
                    {this.state.products.map( product => {
                        return(
                        <div className="col-md-3">
                            <div className="card text-center products">
                                <img src={image} className="image_product" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <a href="#" className="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                        )}
                    )}
                    </div>
                     */}

                    <div className="row my-2">

                    {this.state.products.map( product => {
                        return(
                        <div className="col-lg-3 col-md-6 col-sm-12">

                            <div className="card-container">
                                <div className="card">
                                    <div className="front">
                                        <div className="card-header text-center font-weight-bold">
                                            <img src={image} className="image_product" alt="" />
                                           
                                    <h5 className="card-title">{product.name}</h5>
                                        <Link to="/productdetails"  className="btn btn-primary">
                                        View
                                        </Link>      
                                            </div>
                                    </div>

                                    <div className="back">
                                        <div className="card-header text-center font-weight-bold">
                                    <h5 className="card-title">{product.name}</h5>
                                        </div>
                                        <div className="card-body">
                                        <p className="card-title">{product.description}</p> 
                                        <Link to="/productdetails"  className="btn btn-primary">
                                        View
                                        </Link>                                         
                                    </div>
                                    </div>

                                </div>
                            </div>

                        </div>
    
                        )}
                        )}
                    </div>

                </div>

            </div>
        );
    }
}

export default clientviewproduct;