import React, { Component } from "react";
import { Link } from "react-router-dom";

import {withContext} from '../../common/context';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = { ...this.props, email : '', password : '' };
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { email, password } = this.state
        if (email === '' && password === '') {
            return false
        }
        // else{
        //     const res = await this.state.login(email,password);
        //     if(res['status'])
        // }
        console.log('submitting')
    }

    render() {
        return(
            <div>
                <div className="container">
                <div className="row col-lg-5 col-md-8 col-sm-10 col-xs-12 mx-auto cent">

                    <div className="card bg-light shadow border-0 py-3">
                        <div className="card-header bg-transparent text-center">
                            <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt=""/>
                        </div>
                        <div className="card-body py-lg-5 text-muted text-center">
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-envelope fa-fw"></i>
                                    </span>
                                    {/* <label for="email">Email</label> */}
                                    <input type="text" className="form-control alt alt2" 
                                    id="email" name="email" placeholder="Email" aria-label="Email"
                                    aria-describedby="email" autocomplete="email" required
                                    value={this.state.email}
                                    onChange={this.handleInputChange}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="password">
                                        <i className="fas fa-lock-open fa-fw"></i>
                                    </span>
                                    {/* <label for="password">Password</label> */}
                                    <input type="password" className="form-control alt alt2" id="password" name="password" placeholder="Password..."
                                        aria-label="Password" aria-describedby="password" required
                                        value={this.state.password}
                                        onChange={this.handleInputChange}/>
                                </div>

                                <button type="submit" className="btn btn-sm bg-btn">
                                    <i className="fas fa-sign-in-alt fa-fw mr-1"></i>
                                    SIGN IN
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="mt-4 bottom_link">
                        <small>
                            <Link to="/forgot_password">&#8592;&nbsp;Forgot password?</Link>
                            <span className="float-right">
                                <Link to="/signup">Register&nbsp;&#8594;&nbsp;</Link>
                            </span>
                        </small>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default withContext(Login);