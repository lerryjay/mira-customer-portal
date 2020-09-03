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
            packages: '',
            pkgname: '',
            pkgdescription: '',
            id: '',
            errormessage: '',
            loading: false,
            successmessage: '',
            showmodal: true,

        }
        console.log(this.props);
    }

    componentDidMount() {
        this.getProduct();
        this.getModules();
    }

    getProduct() {
        const productid = this.props.location.pathname.split('/')[2];
        
        const headers = new Headers();
        headers.append('API-KEY', APIKEY );

        fetch(`${HTTPURL}product/getproduct?productid=${productid}&userid=${sessionStorage.getItem('userId')}`, {
            method: "GET",
            headers: headers,
        }).then(res => res.json())
        .then(result => {
            if (result.status == true) {
                this.setState({ name: result.data.name, description: result.data.description, id: result.data.id})       
            }
         
        })
    }

    getModules() {
        const productid = this.props.location.pathname.split('/')[2];

        const headers = new Headers();
        headers.append('API-KEY', APIKEY);
        headers.append("userid", sessionStorage.getItem('userId'));

        fetch(HTTPURL + `product/modules?productid=${productid}`, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            let userid = sessionStorage.getItem('userId')
            if(userid) {
                // this.setState({packages: data.data})
                console.log(data,"packages")
            }
        });
    }

    packageModal() {
        let modal = document.getElementById("myModal")
        modal.style.display = "block";
    }

    closeModal() {
        let modal = document.getElementById("myModal")
        modal.style.display = "none";
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

                const headers = new Headers();
                headers.append('API-KEY', APIKEY);

                let form = new FormData();
                form.append("userid", sessionStorage.getItem("userId"));
                form.append("productid", this.state.id);
                form.append("name", this.state.pkgname);
                form.append("description", this.state.pkgdescription);

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
                 this.setState({pkgname: '', pkgdescription: ''})
            }, 5000);
        }, 3000);
    
    }


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
                            { this.state.description} 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 packages">
                        <h5 className="text-dark text-center">MODULES</h5>
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
                            <Link onClick={this.packageModal}>
                        <i className="fas fa-folder-plus" style={{color: '#fff'}} aria-hidden="true">
                                <small className="newproduct" style={{color: '#fff'}}>&nbsp;Add&nbsp;New&nbsp;Module</small>
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


                    {this.state.showmodal ?  
                    <div id="myModal" class="modal">
                        {/* Modal content  */}
                        <div class="modal-content text-center p-5">
                            
                           
                        <form onSubmit={this.handleSubmit} id="addpackage"> 
                    
                    <div className="card">
                        <div className="card-header bg-medium font-weight-bold text-dark">
                            ADD NEW MODULE
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
                            </div>

                            <div className="col-md-12 mb-1">
                                <div className="form-group">
                                    <label htmlFor="" className="sr-only">Package Name</label>
                                    <input type="hidden" className="form-control form-control-sm" name="productid"
                                        id="productid" placeholder="Product ID" 
                                        value={this.state.id}
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                            <div className="col-md-12 mb-1">
                                <div className="form-group">
                                    <label htmlFor="" className="sr-only">Package Name</label>
                                    <input type="text" className="form-control form-control-sm" name="pkgname"
                                        id="pkgname" placeholder="Package Name" 
                                        value={this.state.pkgname}
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="" className="sr-only">Product Description</label>
                                    <textarea type="text" className="form-control form-control-sm" name="pkgdescription"
                                        id="pkgdescription" placeholder="Package Description"
                                        value={this.state.pkgdescription}
                                        onChange={this.handleInputChange} />
                                </div>
                            </div>


                        </div>

                        <div className="row">
                                <div className="col-md-6">                            
                                    <button onClick={this.closeModal} className="btn-block btn btn-outline-secondary">Cancel</button>
                                </div>
                                <div className="col-md-6">
                                {this.state.loading ? 
                        <button type="submit" className="btn btn-block btn-primary">
                            <div className="spinner-border text-secondary" role="status" id="loader">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </button>
                        : <button type="submit" className="btn btn-primary btn-block">
                            <i className="fas fa-folder-open mr-2"></i>
                                Save
                            </button>
                        }

                                </div>
                            </div>

                    </div>

                </div>
            </form>
       
       

                          
                        
                        
                        </div>
                    </div>
                    :           
                    <span></span> 
                }


                </div>
                
             
            </div>
        );
    }
}
export default withContext(product_details);
