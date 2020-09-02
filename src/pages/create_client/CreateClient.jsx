import React, { Component } from 'react'

import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';
import { HTTPURL } from '../../common/global_constant';

class CreateClient extends Component {
    constructor(props){
        super(props);
       
        this.state = { 
            ...this.props, 
            email : '', 
            telephone : '' , 
            firstname: '',
            lastname: '',
            othername:'',
            address: '',
            country: '',
            state: '',
            lga: '',
            businessname: '',
           
            errormessage: '',
            loading: false, 
            successmessage: '',
            imageError: false,
        };
        console.log(this.state);
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        const { email} = this.state

        if(!Validators.validateEmail(email).status){
            const err = Validators.validateEmail(email).message
            this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({errormessage: err});
                setTimeout(()=> this.setState({errormessage: ''}),5000);
            }, 3000);
        }else{
            this.setState({ loading: true });
            let myHeaders = new Headers();
            myHeaders.append("api-key", this.state.apiKey);

            var formdata = new FormData();
            formdata.append("email", this.state.email);
            formdata.append("businessname", this.state.businessname);
            formdata.append("telephone", this.state.telephone);
            formdata.append("name", this.state.name);
            formdata.append("userid", this.props.userId);
            
            fetch(`${HTTPURL}clients/add`, {
                method: "POST",
                headers: myHeaders,
                body:formdata
            }).then(response => response.json()).
                then(result => {
                    if (result.status) {
                        setTimeout(() => {
                            this.setState({ loading: false });
                            this.setState({ successmessage: 'Added Successfully!' })
                            setTimeout(() => {
                                this.setState({ successmessage: false });
                                console.log('submitting')
                                this.setState({ name: '', email: '', telephone: '' })
                            }, 5000);
                        }, 3000);
                    } else {
                        this.setState({ loading: true });
                        setTimeout(() => {
                            this.setState({ loading: false });
                            this.setState({ errormessage: result.message });
                            setTimeout(() => this.setState({ errormessage: '' }), 5000);
                        }, 3000);   
                    }
                  
                })

           
        }
    }

    addClient() {
        
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
                    {/* Error Message */}
                    { this.state.errormessage != null && this.state.errormessage.length > 0 ? 
                        <div className="alert alert-warning" role="alert">
                            {this.state.errormessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        :   <span></span>
                    }

                    {/* Image Error */}
                    {this.state.imageError !== false ?
                        <div className="alert alert-warning" role="alert">
                            <span className="mt-3">{ this.state.imageError }</span>
                            <button type="button" class="close ml-4" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        : <span></span> 
                    }

                    <form onSubmit={this.handleSubmit} id="createclient"> 
                    
                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    ADD CLIENT
                    </div>
                    
                                <div className="card-body">

                                <div className="row">
                                   <div className="col-md-4 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Last&nbsp;Name</label>
                                            <input type="text" className="form-control form-control-sm" name="lastname"
                                                id="lastname" placeholder="Lastname"
                                                value={this.state.name} required
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                   <div className="col-md-4 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">First&nbsp;Name</label>
                                            <input type="text" className="form-control form-control-sm" name="firstname"
                                                id="firstname" placeholder="Firstname"
                                                value={this.state.firstname} required
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                   <div className="col-md-4 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Other&nbsp;Name</label>
                                            <input type="text" className="form-control form-control-sm" name="othername"
                                                id="othername" placeholder="Othername"
                                                value={this.state.name} required
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Email</label>
                                            <input type="text" className="form-control form-control-sm" name="email"
                                                id="email" placeholder="Enter Email" 
                                                value={this.state.email} required
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Telephone</label>
                                            <input type="text" className="form-control form-control-sm" name="telephone"
                                                id="telephone" placeholder="Phone no." required
                                                value={this.state.telephone}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Business Name</label>
                                            <input type="text" className="form-control form-control-sm" name="businessname"
                                                id="businesname" placeholder="Business Name" required
                                                value={this.state.businessname}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Country</label>
                                            <input type="text" className="form-control form-control-sm" name="country"
                                                id="country" placeholder="Country"
                                                value={this.state.country} required
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                   <div className="col-md-4 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">State</label>
                                            <input type="text" className="form-control form-control-sm" name="state"
                                                id="state" placeholder="State"
                                                value={this.state.state} required
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                   <div className="col-md-4 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Local&nbsp;Government&nbsp;Area</label>
                                            <input type="text" className="form-control form-control-sm" name="lga"
                                                id="lga" placeholder="Local Government Area"
                                                value={this.state.lga} required
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Address</label>
                                            <input type="text" className="form-control form-control-sm" name="address"
                                                id="address" placeholder="Address" required
                                                value={this.state.address}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="text-center">
                                {this.state.loading ? 
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <div className="spinner-border text-secondary" role="status" id="loader">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </button>
                                : <button type="submit" className="btn btn-sm btn-primary px-3">
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
export default withContext(CreateClient);
