import React, { Component } from 'react'

import Validators  from "../../../common/Validators";
import { Link } from "react-router-dom";
import {withContext} from '../../../common/context';
import { HTTPURL, APIKEY } from '../../../common/global_constant';

class CreateClientById extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            clientid : '', 
            userid : '' , 
            businessname: '',
            companycountryid : '', 
            companystateid : '' , 
            companylga: '',
            companyemail : '', 
            companytelephone : '' , 
            companyaddress: '',
            
            errormessage: '',
            loading: false, 
            successmessage: '',
            users: []
        };
    }
    componentWillMount() {
        this.getClient()
    }

    getClient = () => {
        
        let myHeaders = new Headers();
        myHeaders.append("api-key", APIKEY);

        fetch(`${HTTPURL}user?userid=${this.state.user.userid}`, {
            method: "GET",
            headers: myHeaders,
        }).then(res => res.json()).then(result => {
            console.log(result, "users")
            if (result.status) {
                this.setState({ users: result.data });
            }
        })
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        const { businessname, clientid } = this.state

        if(!businessname){
           this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({errormessage: 'Business name is required'});
                setTimeout(()=> this.setState({errormessage: ''}),5000);
            }, 3000);
        }else{
            this.setState({ loading: true });
            let myHeaders = new Headers();
            myHeaders.append("api-key", APIKEY);

            var formdata = new FormData();
            formdata.append("businessname", this.state.businessname);
            formdata.append("clientid", clientid);
            formdata.append("userid",this.state.user.userid );
            formdata.append("companycountryid", this.state.companycountryid);
            formdata.append("companystateid", this.state.companystateid);
            formdata.append("companylga", this.state.companylga);
            formdata.append("companyemail", this.state.companyemail);
            formdata.append("companytelephone", this.state.companytelephone);
            formdata.append("companyaddress", this.state.companyaddress);
            

            fetch(`${HTTPURL}clients/add`, {
                method: "POST",
                headers: myHeaders,
                body: formdata
            }).then(response => response.json()).
                then(result => { 
                    if (result.status == false) {
                        setTimeout(() => {
                            this.setState({loading : false});
                            this.setState({errormessage: result.message});
                            setTimeout(() =>{
                                this.setState({errormessage: false});
                            }, 5000);
                        }, 3000);
                    }
                    else{
                        setTimeout(() => {
                            this.setState({loading : false});
                            this.setState({successmessage: result.message})
                            console.log('submitting')
                            this.setState({name: '', email: '', telephone: ''})
                            setTimeout(() =>{
                                this.setState({successmessage: false});
                            }, 5000);
                        }, 3000);
                    }
                })

        }
    }

    render() {
        
        return (

            <div className="container mx-auto">
                <div className="row justify-content-center">
                    
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

                <div className="col-md-10 mb-3 mt-4" id="profile">
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

                    <form onSubmit={this.handleSubmit} id="createclient"> 
                    
                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    ADD CLIENT BY USERID
                    </div>
                    
                                <div className="card-body">

                                <div className="row">
                                    
                                   <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Client&nbsp;ID</label>
                                            <select required onChange={this.handleInputChange} className="form-control form-control-sm" name="clientid">
                                               <option value="">Please select User</option>
                                                {this.state.users.length > 0 ? this.state.users.map(client => <option value={client.user_id} >{client.lastname} {client.firstname}</option>) : null}
                                            </select>
                                            
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Business Nmae</label>
                                            <input type="text" className="form-control form-control-sm" name="businessname"
                                                id="businesname" placeholder="Business Name" required
                                                value={this.state.businessname}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">companyEmail</label>
                                            <input type="text" className="form-control form-control-sm" name="companyemail"
                                                id="companyemail" placeholder="Company Email" 
                                                value={this.state.companyemail} required
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>

                                    
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company Telephone</label>
                                            <input type="text" className="form-control form-control-sm" name="companytelephone"
                                                id="companytelephone" placeholder="Company Telephone" required
                                                value={this.state.companytelephone}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">companycountryid</label>
                                            <input type="text" className="form-control form-control-sm" name="companycountryid"
                                                id="companycountryid" placeholder="Country"
                                                value={this.state.companycountryid} required
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                   <div className="col-md-4 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">State</label>
                                            <input type="text" className="form-control form-control-sm" name="companystateid"
                                                id="companystateid" placeholder="State"
                                                value={this.state.companystateid} required
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                   <div className="col-md-4 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Local&nbsp;Government&nbsp;Area</label>
                                            <input type="text" className="form-control form-control-sm" name="companylga"
                                                id="companylga" placeholder="Local Government Area"
                                                value={this.state.companylga} required
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company Address</label>
                                            <input type="text" className="form-control form-control-sm" name="companyaddress"
                                                id="companyaddress" placeholder="Company Address" required
                                                value={this.state.companyaddress}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="card-footer">
                                <div className="text-center">
                                {this.state.loading ? 
                                <button type="submit" className="btn btn-sm btn-primary px-4">
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
            
            </div>

        )
    }
}
export default withContext(CreateClientById);
