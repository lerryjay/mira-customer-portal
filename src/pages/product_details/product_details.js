import React, { Component } from 'react';
import { Link } from "react-router-dom";
import image from '../../assets/images/Accsiss.png'
import { HTTPURL, APIKEY } from '../../common/global_constant';
import {withContext} from '../../common/context';

class product_details extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.props, 
            name: '',
            description: '',
            packages: ''

        }
        console.log(this.props);
    }

    componentDidMount() {
        const productid = this.props.location.pathname.split('/')[2];
        
        const headers = new Headers();
        headers.append('API-KEY', APIKEY );

        fetch(`${HTTPURL}/product/getproduct?productid=${productid}&userid=${sessionStorage.getItem('userId')}`, {
            method: "GET",
            headers: headers,
        }).then(res => res.json())
        .then(result => {
            console.log(result, "okay")
            // if (result.status == true) {
            //     this.setState({ name: result.data.name, description: result.data.description })       
            // }
         
        })
    }

    // componentDidMount() {
    //    this.getPackages();
    // }

    // getPackages() {
    //     let productid = this.props.getProduct.id

    //     const headers = new Headers();
    //     headers.append('API-KEY', APIKEY);

    //     fetch(HTTPURL + `product/modules?productid=${productid}`, {
    //         method: 'GET',
    //         headers: headers
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         // this.setState({packages: data.data})
    //         console.log(data,"packages")
    //     });
    // }


    render() {
        return (
            <div className="container mx-auto">
                <div className="row product_details mt-4">
                    <div className="col-md-6">
                        <img src={image} className="img-fluid"  alt=""/>
                    </div>
                    <div className="col-md-6">
                        <h4 className="text-dark">{ this.state.name}</h4>
                        <div className="description">
                            <p>
                            { this.props.getProduct.description} 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 packages">
                        <h5 className="text-dark text-center">PACKAGES</h5>
                    {/* <div class="card bg-secondary">
                        <div class="card-header text-white">
                            PACKAGES
                        </div>
                    </div> */}
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-10 offset-1">
                    <div className="card">
                        <div className="card-body">
                        <div class="alert alert-warning" role="alert">
                            Oops, Product module is empty!
                        </div>

                        <button type="button" className="btn btn-sm btn-primary new_product mb-2">
                            <Link to="/addpackage">
                        <i className="fas fa-folder-plus" style={{color: '#fff'}} aria-hidden="true">
                                <small className="newproduct" style={{color: '#fff'}}>&nbsp;Add&nbsp;New&nbsp;Package</small>
                        </i>
                            </Link>
                        </button>

                         <div className="row">
                             {/* {this.state.packages} */}
                    {/* {this.state.packages.map( module => {
                        return(
                                <div className="col-md-4">
                                    <p className="list-group-item">{module.name} <label class="switch float-right"> <input type="checkbox"  /><span class="slider round"></span>
                                        </label>
                                    </p>
                                </div>
                        )}
                    )} */}
                            </div>


                        </div>
                    </div>
                    </div>
                </div>
                
             
            </div>
        );
    }
}
export default withContext(product_details);
