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
    }

    async componentDidMount(){
        this.state.showLoader();
        this.setState({ loading : false  });
        this.state.hideLoader();
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
        })
    }

    componentWillMount() {
        this.state.showLoader();
        const clienId = this.props.location.pathname.split("/")[2];
        fetch(
          `${HTTPURL}clients/getclient?clientid=${clienId}&userid=${this.state.user.userid}`,
          {
            method: "GET",
            headers: { "api-key": APIKEY },
          }
        )
          .then((res) => res.json())
          .then((result) => {
            this.state.hideLoader();
            if (result.status === true) {
              this.setState({
                lastname: result.data.lastname,
                firstname: result.data.firstname,
                othername: result.data.othername,
                email: result.data.email,
                telephone: result.data.telephone,
                businessname: result.data.businessname,
                companyemail: result.data.companyemail,
                companytelephone: result.data.companytelephone,
                companycountryid: result.data.companycountryid,
                companystateid: result.data.companystateid,
                companylga: result.data.companylga,
                companyaddress: result.data.companyaddress,
                userid: result.data.user_id,
                isloading: false,
              });
            }
          });
      }


    // async getClients() {
    //     const headers = new Headers();
    //     headers.append('API-KEY', APIKEY );
    //     const res = await fetch(HTTPURL + `clients/?userid=${this.state.user.userid}`, {
    //         method: 'GET',
    //         headers: headers
    //     }).then(response => response.json());

    //     if(res['status']) this.setState({ clients : res['data']})
    // }

    // getClient() {
    //     const clientid = this.props.location.pathname.split('/')[2];
        
    //     const selectedClient = this.state.clients.find(client=>client.user_id == clientid);
        
    //    if (selectedClient) {
    //     this.setState({
    //         businessname: selectedClient.businessname,
    //         email: selectedClient.email,
    //         telephone: selectedClient.telephone,
    //         firstname: selectedClient.firstname,
    //         lastname: selectedClient.lastname,
    //         othername: selectedClient.othername,
    //         companyemail: selectedClient.companyemail,
    //         companytelephone: selectedClient.companytelephone,
    //         companyaddress: selectedClient.companyaddress,
    //         companycountryid: selectedClient.companycountryid,
    //         companystateid: selectedClient.companystateid,
    //         companylga: selectedClient.companylga
    //     })
    //    }
    // }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value, errormessage: '' });
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({ loading: true });

        const { email, companyemail} = this.state

        if (!Validators.validateEmail(email).status) {
            const err = Validators.validateEmail(email).message
            this.setState({ loading: true });
            if(err){
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
        }
        else if (!Validators.validateEmail(companyemail).status) {
            const err = Validators.validateEmail(companyemail).message
            this.setState({ loading: true });
            if(err){
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
        } 
         else {
            
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

           const res = await fetch(`${HTTPURL}clients/update`, {
                method: "POST",
                headers: myHeaders,
                body: formdata
            }).then(response => response.json())
            
            this.setState({ loading: false });
            if(res.status) {
                this.state.showAlert("success", res.message);
                this.props.history.goBack();
            } else{
                this.state.showAlert("danger",  res.message)
            }

        }
    }



    render() {
        return (
            <div className="container mx-auto row mt-4">

                <div className="col-md-12">

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
                                                    onChange={this.handleInputChange} />
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





                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Company Address</label>
                                                <input type="text" className="form-control form-control-sm" name="companyaddress"
                                                    id="companyaddress" placeholder="Company Address" 
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
                                            className=" custom-select custom-select-sm"
                                            defaultValue=""
                                            >
                                            <option value="" disabled>
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
                                            className=" custom-select custom-select-sm"
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
                                                    value={this.state.firstname} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Last&nbsp;Name</label>
                                                <input type="text" className="form-control form-control-sm" name="lastname"
                                                    id="lastname" placeholder="Lastname"
                                                    value={this.state.lastname} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Other&nbsp;Name</label>
                                                <input type="text" className="form-control form-control-sm" name="othername"
                                                    id="othername" placeholder="Othername"
                                                    value={this.state.othername} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Email</label>
                                                <input type="text" className="form-control form-control-sm" name="email"
                                                    id="email" placeholder="Enter Email"
                                                    value={this.state.email} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Telephone</label>
                                                <input type="text" className="form-control form-control-sm" name="telephone"
                                                    id="telephone" placeholder="Phone no." 
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
                                                <div className="spinner-border text-white" role="status" id="loader">
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
export default withContext(EditClient);
