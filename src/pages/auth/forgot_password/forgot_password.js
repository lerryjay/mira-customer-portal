import React, { Component } from "react";
import { Link } from "react-router-dom";

import { HTTPURL, APIKEY } from "../../../common/global_constant";
import Validators from "../../../common/Validators";
import { withContext } from '../../../common/context';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            loginid: '',
            loading: false,
            errormessage: '',
            successmessage: ''
        };
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value, errormessage: '' });
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { loginid } = this.state
        this.setState({ loading: true });
        if (!Validators.validateEmail(loginid).status) {
            const err = Validators.validateEmail(loginid).message
            if (err) {
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
            return;
        } 
        console.log('login id', loginid)
        const res = await this.state.forgotpassword(loginid);
        this.setState({ loading: false });
        if(res.status){
            this.state.showAlert('success',res.massage);
            this.props.history.push('/verify-token')
        }else this.state.showAlert('danger',res.massage);
            
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row form">
                        <div className=" col-lg-5 col-md-8 col-sm-10 col-xs-12 mx-auto">

                            <div className="card bg-light shadow border-0 py-3">
                                <div className="card-header bg-transparent text-center">
                                    <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt="" />
                                </div>
                                <div className="card-body py-lg-5 text-muted text-center">
                                    <form onSubmit={this.handleSubmit} id="forgotpassword">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-white alt" id="loginid">
                                                <i className="fas fa-envelope fa-fw"></i>
                                            </span>
                                            {/* <label for="loginid">Email</label> */}
                                            <input type="text" className="form-control alt" id="loginid" name="loginid" placeholder="Email" aria-label="Email"
                                                aria-describedby="loginid" autoComplete="loginid" required
                                                value={this.state.loginid}
                                                onChange={this.handleInputChange} />
                                        </div>

                                        {this.state.loading ?
                                            <button type="submit" className="btn btn-sm btn-primary">
                                                <div className="spinner-border text-white" role="status" id="loader">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </button>
                                            : <button type="submit" className="btn btn-sm btn-primary">
                                                <i className="fas fa-paper-plane fa-fw"></i>
                                                SEND
                                            </button>
                                        }
                                    </form>
                                </div>
                            </div>
                            <div className="mt-4 bottom_link">
                                <small>
                                    <Link to="/login">&#8592;&nbsp;Login</Link>
                                    <span className="float-right">
                                        <Link to="/signup">Register&nbsp;&#8594;&nbsp;</Link>
                                    </span>
                                </small>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default withContext(ForgotPassword);