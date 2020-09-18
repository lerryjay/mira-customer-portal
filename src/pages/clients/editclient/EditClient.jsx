import React, { Component } from 'react'

import Validators from "../../../common/Validators";
import { Link } from "react-router-dom";
import { withContext } from '../../../common/context';
import { HTTPURL, APIKEY } from '../../../common/global_constant';

class EditClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
            clients: [],
            email: '',
            telephone: '',
            firstname: '',
            lastname: '',
            othername: '',
            companyemail: '',
            companytelephone: '',
            companyaddress: '',
            companycountryid: '',
            companystateid: '',
            companylga: '',
            businessname: '',
            states: [],
            countryid: '',

            countries: [],
            errormessage: '',
            loading: false,
            successmessage: '',
            imageError: false,
        };
        console.log(this.state);
    }

    async componentDidMount(){
        this.state.showLoader();
        await this.getClients();
        this.setState({ loading : false  });
        this.state.hideLoader();
        this.getClient();
        this.getCountries();
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
            console.log(this.state.states)
        })
    }


    async getClients() {
        const headers = new Headers();
        headers.append('API-KEY', APIKEY );
        const res = await fetch(HTTPURL + `clients/?userid=${this.state.user.userid}`, {
            method: 'GET',
            headers: headers
        }).then(response => response.json());

        if(res['status']) this.setState({ clients : res['data']})
    }

    getClient() {
        const clientid = this.props.location.pathname.split('/')[2];
        
        const selectedClient = this.state.clients.find(client=>client.user_id == clientid);
       if (selectedClient) {
        this.setState({
            businessname: selectedClient.businessname,
            email: selectedClient.email,
            telephone: selectedClient.telephone,
            firstname: selectedClient.firstname,
            lastname: selectedClient.lastname,
            othername: selectedClient.othername,
            companyemail: selectedClient.companyemail,
            companytelephone: selectedClient.companytelephone,
            companyaddress: selectedClient.companyaddress,
            companycountryid: selectedClient.companycountryid,
            companystateid: selectedClient.companystateid,
            companylga: selectedClient.companylga
        })
       }
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value, errormessage: '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        const { email } = this.state

        if (!Validators.validateEmail(email).status) {
            const err = Validators.validateEmail(email).message
            this.setState({ loading: true });
            setTimeout(() => {
                this.setState({ loading: false });
                this.setState({ errormessage: err });
                setTimeout(() => this.setState({ errormessage: '' }), 5000);
            }, 3000);
        } else {
            this.setState({ loading: true });
            
        const clientid = this.props.location.pathname.split('/')[2];

            let myHeaders = new Headers();
            myHeaders.append("api-key", APIKEY);

            var formdata = new FormData();
            formdata.append("email", this.state.email);
            formdata.append("telephone", this.state.telephone);
            formdata.append("firstname", this.state.firstname);
            formdata.append("lastname", this.state.lastname);
            formdata.append("othername", this.state.othername);
            formdata.append("companyemail", this.state.companyemail);
            formdata.append("businessname", this.state.businessname);
            formdata.append("companytelephone", this.state.companytelephone);
            formdata.append("companyaddress", this.state.companyaddress);
            formdata.append("companycountryid", this.state.companycountryid);
            formdata.append("companystateid", this.state.companystateid);
            formdata.append("companylga", this.state.companylga);
            formdata.append("userid", this.state.user.userid);
            formdata.append("clientid", clientid);

            fetch(`${HTTPURL}clients/update`, {
                method: "POST",
                headers: myHeaders,
                body: formdata
            }).then(response => response.json()).
                then(result => {
                    if (result.status === false) {
                        setTimeout(() => {
                            this.setState({ loading: false });
                            this.setState({ errormessage: result.message });
                            setTimeout(() => {
                                this.setState({ errormessage: false });
                            }, 5000);
                        }, 3000);
                    }
                    else {
                        setTimeout(() => {
                            this.setState({ loading: false });
                            this.setState({ successmessage: result.message })
                            setTimeout(() => {
                                this.setState({ successmessage: false });
                            }, 5000);
                        }, 3000);
                    }
                })


        }
    }



    render() {
        return (
            <div className="container mx-auto row mt-4">

                <div className="col-md-12">
                    {/* Success Message */}
                    {this.state.successmessage ?
                        <div className="alert alert-success" role="alert" style={{ position: 'fixed', top: '70px', right: '10px', zIndex: '4' }}>
                            <span className="mt-3">{this.state.successmessage}</span>
                            <button type="button" class="close ml-4" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        : <span></span>
                    }

                    <div className="mb-3 mt-4" id="profile">
                        {/* Error Message */}
                        {this.state.errormessage != null && this.state.errormessage.length > 0 ?
                            <div className="alert alert-warning" role="alert">
                                {this.state.errormessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            : <span></span>
                        }

                        {/* Image Error */}
                        {this.state.imageError !== false ?
                            <div className="alert alert-warning" role="alert">
                                <span className="mt-3">{this.state.imageError}</span>
                                <button type="button" class="close ml-4" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            : <span></span>
                        }

                        <form onSubmit={this.handleSubmit} id="createclient">

                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    EDIT CLIENT
                                </div>

                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-12">
                                            <h5 className="font-weight-bold">Company Information</h5><br/>
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
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">companyEmail</label>
                                                <input type="text" className="form-control form-control-sm" name="companyemail"
                                                    id="companyemail" placeholder="Company Email"
                                                    value={this.state.companyemail} required
                                                    onChange={this.handleInputChange} />
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





                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Company Address</label>
                                                <input type="text" className="form-control form-control-sm" name="companyaddress"
                                                    id="companyaddress" placeholder="Company Address" required
                                                    value={this.state.companyaddress}
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
                                            className=" form-control form-select form-select-sm"
                                            >
                                            <option value="" selected disabled>
                                                Company&nbsp;Country&nbsp;
                                            </option>

                                            {this.state.countries.map((country) => {
                                                return (
                                                <option value={country.country_id}>{country.name}</option>
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
                                            className=" form-control form-select form-select-sm"
                                            >
                                            <option value="" selected disabled>
                                                Company&nbsp;State&nbsp;
                                            </option>

                                            {this.state.states.map((state) => {
                                                return (
                                                <option value={state.states_id}>{state.name}</option>
                                                );
                                            })}
                                            </select>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Local&nbsp;Government&nbsp;Area</label>
                                                <input type="text" className="form-control form-control-sm" name="companylga"
                                                    id="companylga" placeholder="Local Government Area"
                                                    value={this.state.companylga} required 
                                                    style={{ height: '35px' }}
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <h5 className="font-weight-bold">Contact Information</h5><br/>
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
                                                <label htmlFor="" className="sr-only">Last&nbsp;Name</label>
                                                <input type="text" className="form-control form-control-sm" name="lastname"
                                                    id="lastname" placeholder="Lastname"
                                                    value={this.state.lastname} required
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Other&nbsp;Name</label>
                                                <input type="text" className="form-control form-control-sm" name="othername"
                                                    id="othername" placeholder="Othername"
                                                    value={this.state.othername} required
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Email</label>
                                                <input type="text" className="form-control form-control-sm" name="email"
                                                    id="email" placeholder="Enter Email"
                                                    value={this.state.email} required
                                                    onChange={this.handleInputChange} />
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
export default withContext(EditClient);