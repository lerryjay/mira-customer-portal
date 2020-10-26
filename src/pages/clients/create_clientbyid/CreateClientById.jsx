import React, { Component } from 'react'

import {withContext} from '../../../common/context';
import Validators from "../../../common/Validators";
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
            countries: [],
            states: [],
            
            errormessage: '',
            loading: false, 
            successmessage: '',
        };
    }
    componentWillMount() {
    }

    async componentDidMount(){
        this.state.showLoader();
        this.setState({ loading : false  });
        this.state.hideLoader();
        this.getCountries();
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({loading : true});

        const { businessname, clientid, companyemail} = this.state

        if(!businessname){
               this.setState({ loading: false });
               this.state.showAlert("danger", 'Business name is empty')
        }
        else if (!Validators.validateEmail(companyemail).status) {
            const err = Validators.validateEmail(companyemail).message
            if(err){
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
        }else{
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
            }).then(response => response.json())
                .then(result => { 
                        this.setState({ loading: false });
                        if(result.status === true) {
                            this.state.showAlert("success", result.message)
                                this.setState({
                                    email: '', telephone: '', firstname: '',
                                    lastname: '', othername: '', companyemail: '',
                                    businessname: '', companytelephone: '', companyaddress: '',
                                    companycountryid: '', companystateid: '', companylga: ''
                            });
                        } else{
                            this.state.showAlert("danger",  result.message)
                        }
                })

        }
    }
 
    getCountries() {
        const headers = new Headers();
        headers.append('API-KEY', APIKEY );
         fetch(HTTPURL + `region/countries`, {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
        .then(data => {
            this.setState({countries: data.data})
        })

    }

    getStates(country_id) {
        const headers = new Headers();
        headers.append('API-KEY', APIKEY );
        fetch(HTTPURL + `region/states?countryid=${country_id}`, {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
        .then(data => {
            this.setState({states: data.data})
        })
    }


    render() {
        
        return (

            <div className="container mx-auto">
                <div className="row mt-5 justify-content-center">
                <div className="col-md-12">

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
                                            <select  onChange={this.handleInputChange} 
                    className="custom-select custom-select-sm"
                    name="clientid" defaultValue="">
                                               <option value="">Please select User</option>
                                                {this.state.users.length > 0 ? this.state.users.map( (client,i) => <option key={i} value={client.userid} >{client.lastname} {client.firstname}</option>) : null}
                                            </select>
                                            
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Business Name</label>
                                            <input type="text" className="form-control form-control-sm" name="businessname"
                                                id="businesname" placeholder="Business Name" 
                                                value={this.state.businessname}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">companyEmail</label>
                                            <input type="text" className="form-control form-control-sm" name="companyemail"
                                                id="companyemail" placeholder="Company Email" 
                                                value={this.state.companyemail} 
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>

                                    
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company Telephone</label>
                                            <input type="text" className="form-control form-control-sm" name="companytelephone"
                                                id="companytelephone" placeholder="Company Telephone" 
                                                value={this.state.companytelephone}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                <div className="col-md-4 mb-3">
                                            <select
                                            onChange={(e) => {
                                                this.getStates(e.target.value);
                                                this.setState({ companycountryid: e.target.value });
                                            }}
                                            value={this.state.companycountryid}
                                            name="companycountryid"
                                            id="companycountryid"
                                            className="custom-select custom-select-sm"
                                            >
                                            <option value="" >
                                                Company&nbsp;Country&nbsp;
                                            </option>

                                            {this.state.countries.map((country,i) => {
                                                return (
                                                <option key={i} value={country.country_id}>{country.name}</option>
                                                );
                                            })}
                                            </select>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <select
                                            onChange={(e) => {
                                                this.setState({ companystateid: e.target.value });
                                            }}
                                            value={this.state.companystateid}
                                            name="companystateid"
                                            id="companystateid"
                                            className="custom-select custom-select-sm"
                                            >
                                            <option value="" >
                                                Company&nbsp;State&nbsp;
                                            </option>

                                            {this.state.states.map((state,i) => {
                                                return (
                                                <option key={i} value={state.states_id}>{state.name}</option>
                                                );
                                            })}
                                            </select>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Local&nbsp;Government&nbsp;Area</label>
                                                <input type="text" className="form-control form-control-sm" name="companylga"
                                                    id="companylga" placeholder="Local Government Area"
                                                    value={this.state.companylga}  
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company Address</label>
                                            <input type="text" className="form-control form-control-sm" name="companyaddress"
                                                id="companyaddress" placeholder="Company Address" 
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
