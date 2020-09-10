import React, { Component } from 'react'

import Validators from "../../../common/Validators";
import { Link } from "react-router-dom";
import { withContext } from '../../../common/context';
import { HTTPURL, APIKEY } from '../../../common/global_constant';

class CreateClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
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

            errormessage: '',
            loading: false,
            successmessage: '',
            imageError: false,
        };
        console.log(this.state);
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

            fetch(`${HTTPURL}clients/add`, {
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
                            console.log('submitting')
                            this.setState({
                                email: '', telephone: '', firstname: '',
                                lastname: '', othername: '', companyemail: '',
                                businessname: '', companytelephone: '', companyaddress: '',
                                companycountryid: '', companystateid: '', companylga: ''
                            })
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
                                    REGISTER CLIENT
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
export default withContext(CreateClient);
