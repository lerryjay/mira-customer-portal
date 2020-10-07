import React, { Component } from "react";
import { Link } from "react-router-dom";

import Validators from "../../../common/Validators";
import { withContext } from '../../../common/context';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            loginid: '',
            password: '',
            loading: false,
            errormessage: '',
            successmessage: ''
        };
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value, errormessage: '', successmessage: '' });
    }

    handleSubmit = async e => {
        e.preventDefault()
        await this.setState({ loading: true });

        const { loginid, password } = this.state

        if (!Validators.validateEmail(loginid).status) {
            const err = Validators.validateEmail(loginid).message
            if (err) {
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
        } else if (password == '') {
            const err = Validators.validatePassword(password, 1).message;
            if (err) {
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
        } else {

            let form = new FormData(document.getElementById("loginform"));
            const res = await this.props.login(form);

            this.setState({ loading: false });
            if (res['status']) {
                this.state.showAlert("success", res['message'])
                //find a way to redirect here 
                this.props.history.push('/dashboard');
            } else {
                this.state.showAlert("danger", res['message'])
            }


        }
    }

    showPassword() {
        var input = document.getElementById("password");
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row form ">
                        <div className="col-md-6 mx-auto" >
                            <div className="card bg-light shadow border-0 py-3">
                                <div className="card-header bg-transparent text-center">
                                    <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt="" />
                                </div>
                                <div className="card-body py-lg-5 text-muted text-center">
                                    <form onSubmit={this.handleSubmit} id="loginform">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-white alt" id="loginid">
                                                <i className="fas fa-envelope fa-fw"></i>
                                            </span>
                                            <label htmlFor="loginid" className="sr-only">Email</label>
                                            <input type="text" className="form-control alt alt2"
                                                id="loginid" name="loginid" placeholder="Email" aria-label="Email"
                                                aria-describedby="loginid" autoComplete="loginid" required
                                                value={this.state.loginid}
                                                onChange={this.handleInputChange} />
                                        </div>


                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-white alt" >
                                                <i className="fas fa-lock-open fa-fw"></i>
                                            </span>
                                            <label htmlFor="" className="sr-only">Password</label>
                                            <input type="password" className="form-control alt alt_right" id="password" name="password" placeholder="Password"
                                                // aria-label="Password" aria-describedby="password" required
                                                value={this.state.password}
                                                onChange={this.handleInputChange} />
                                            <span className="input-group-text bg-white alt alt_left" >
                                                <i className="fas fa-eye fa-fw" style={{ cursor: 'pointer' }} onClick={this.showPassword}></i>
                                            </span>
                                        </div>
                                        {this.state.loading ?
                                            <button type="submit" className="btn btn-sm btn-primary">
                                                <div className="spinner-border text-white" role="status" id="loader">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </button>
                                            : <button type="submit" className="btn btn-sm btn-primary">
                                                <i className="fas fa-sign-in-alt fa-fw mr-1"></i>
                                                SIGN IN
                                            </button>
                                        }


                                    </form>
                                </div>
                            </div>
                            <div className="mt-4 bottom_link">
                                <small>
                                    <Link to="/forgot-password">&#8592;&nbsp;Forgot password?</Link>
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

export default withContext(Login);