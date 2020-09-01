import React, { Component } from 'react';
import image from '../../assets/images/Accsiss.png'
import { HTTPURL } from '../../common/global_constant';
import {withContext} from '../../common/context';

class product_details extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.props, 
            packages: ''
        }

    }

    componentDidMount() {
       this.getPackages();
    }

    getPackages() {
        let productid = this.props.getProduct.id

        const headers = new Headers();
        headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
        fetch(HTTPURL + `product/modules?productid=${productid}`, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            this.setState({packages: data.data})
            console.log(this.state.packages, data,"packages")
        });
    }

    render() {
        return (
            <div className="container mx-auto">
                <div className="row product_details mt-4">
                    <div className="col-md-6">
                        <img src={image} className="img-fluid"  alt=""/>
                    </div>
                    <div className="col-md-6">
                        <h4 className="text-dark">{ this.props.getProduct.name}</h4>
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
                        {this.state.packages == null ?
                        <div class="alert alert-warning" role="alert">
                            Oops, Product module is empty. Kindly check back later.
                        </div>
                        :
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
                        }




                            {/* <div className="row">
                                <div className="col-md-4">
                                    <p className="list-group-item">Design <label class="switch float-right"> <input type="checkbox"  /><span class="slider round"></span>
                                        </label>
                                    </p>
                                </div>
                                <div className="col-md-4">
                                <p className="list-group-item">Development <label class="switch float-right"> <input type="checkbox"  /><span class="slider round"></span>
                                    </label>
                                </p>
                                </div>
                                <div className="col-md-4">
                                <p className="list-group-item">Hosting <label class="switch float-right"> <input type="checkbox"  /><span class="slider round"></span>
                                    </label>
                                </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="list-group-item">Analytics <label class="switch float-right"> <input type="checkbox"  /><span class="slider round"></span>
                                        </label>
                                    </p>
                                </div>
                                <div className="col-md-4">
                                <p className="list-group-item">Email Setup <label class="switch float-right"> <input type="checkbox"  /><span class="slider round"></span>
                                    </label>
                                </p>
                                </div>
                                <div className="col-md-4">
                                <p className="list-group-item">Search Engine Optimization <label class="switch float-right"> <input type="checkbox"  /><span class="slider round"></span>
                                    </label>
                                </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="list-group-item">Backups <label class="switch float-right"> <input type="checkbox"  /><span class="slider round"></span>
                                        </label>
                                    </p>
                                </div>
                                <div className="col-md-4">
                                <p className="list-group-item">Live Chat <label class="switch float-right"> <input type="checkbox"  /><span class="slider round"></span>
                                    </label>
                                </p>
                                </div>
                                <div className="col-md-4">
                                <p className="list-group-item">Content Management <label class="switch float-right"> <input type="checkbox"  /><span class="slider round"></span>
                                    </label>
                                </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="list-group-item">Maintenance Agreement <label class="switch float-right"> <input type="checkbox"  /><span class="slider round"></span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                       
                            <div className="float-right">

<button className="btn btn-sm btn-primary px-3">
    <i className="fas fa-folder-open pr-2"></i>
Save
</button>

</div> */}
                        </div>
                    </div>
                    </div>
                </div>
                
             
            </div>
        );
    }
}
export default withContext(product_details);
