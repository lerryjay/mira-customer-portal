import React, { Component } from 'react'

import {withContext} from '../../common/context';
import { HTTPURL, APIKEY } from '../../common/global_constant';


class addpackage extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            name : '', 
            productid: '',
            description: '',
            products: [],
            errormessage: '',
            loading: false,
            successmessage: '',
        };
    }

    componentDidMount() {
       this.getProduct()
    }

    getProduct() {
        const headers = new Headers();
        headers.append('API-KEY', APIKEY);
        fetch(HTTPURL + 'product', {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            this.setState({products: data.data})
            console.log(this.state.products)
        });
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({loading : true});
        setTimeout(() => {
            this.setState({loading : false});
            this.setState({successmessage: 'Added Successfully!'})
            setTimeout(() =>{
                this.setState({successmessage: false});

                let data = document.getElementById("addpackage")

                const headers = new Headers();
                headers.append('API-KEY',this.state.apiKey);

                let form = new FormData(data);
                form.append("userid", sessionStorage.getItem('userId'));

                fetch(HTTPURL + 'product/addmodule', {
                    method: 'POST',
                    body: form,
                    headers: headers
                })
                .then(response => response.json())
                .then(json => {
                console.log(json);
                return json;
                });
                // const res = this.state.addpackage(document.getElementById("addpackage"));
                 console.log('submitting')
                 this.setState({name: '', description: ''})
            }, 5000);
        }, 3000);
    
    }

    render() {
        return (

            <div className="container mx-auto row">
            {/* Success Message */}
            { this.state.successmessage ? 
                <div className="alert alert-success" role="alert" style={{position:'fixed', top: '70px' , right: '10px', zIndex:'4'}}>
                    <span className="mt-3">{this.state.successmessage}</span>
                    <button type="button" class="close ml-4" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                :   <span></span>
            }

                <div className="col-md-8 offset-2 mb-3 mt-4" id="profile">
                    <form onSubmit={this.handleSubmit} id="addpackage"> 
                    
                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    ADD NEW PACKAGE
                    </div>
                    
                                <div className="card-body">

                            <div className="row">
                                <div className="col-md-12">
                                    {/* Error Message */}
                                    { this.state.errormessage != null && this.state.errormessage.length > 0 ? 
                                        <div className="alert alert-warning" role="alert">{this.state.errormessage}
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>
                                        : 
                                        <span></span>
                                        }
                                </div>
                            </div>
                                <div className="row">

                                <div className="col-md-12 mb-1">
                                        <div className="form-group">
                                        <select onChange={this.handleInputChange} name="productid" id="productid" className=" form-control form-select form-select-sm">
                                        <option value="" selected disabled>--Select&nbsp;Product&nbsp;--</option>
                                        
                                            {this.state.products.map(product => {
                                                return(
                                                    <option value={product.id}>{product.name}</option>
                                                )
                                                })
                                            }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-1">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Package Name</label>
                                            <input type="text" className="form-control form-control-sm" name="name"
                                                id="name" placeholder="Package Name" 
                                                value={this.state.name}
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Product Description</label>
                                            <textarea type="text" className="form-control form-control-sm" name="description"
                                                id="description" placeholder="Package Description"
                                                value={this.state.description}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="float-right">

                                     {this.state.loading ? 
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <div className="spinner-border text-secondary" role="status" id="loader">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </button>
                                : <button type="submit" className="btn btn-sm btn-primary px-3 py-2">
                                    <i className="fas fa-folder-open mr-2"></i>
                                        Save
                                    </button>
                                }

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}
export default withContext(addpackage);
