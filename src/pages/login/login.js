import React, { Component } from "react";
import { Link } from "react-router-dom";

import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            loginid : '', 
            password : '' , 
            loading: false, 
            errormessage: ''
        };
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        const { loginid, password} = this.state
       
        //Waste 3 seconds
       
        if(!Validators.validateEmail(loginid).status){
            const err = Validators.validateEmail(loginid).message
            this.setState({errormessage: err});
            setTimeout(()=> this.setState({errormessage: ''}),5000);
        }else if(!Validators.validatePassword(password,1).status){
            const err = Validators.validatePassword(password,1).message;
           await this.setState({errormessage: err});
            setTimeout(()=> this.setState({errormessage: ''}),5000);
        }else{
            await this.setState({loading : true});
            setTimeout(() =>this.setState({loading : false}), 3000);
           const res = await this.state.login(document.getElementById("loginform"));
           if(!res['status'])this.setState({errormessage: res['message']});
            else{
                document.querySelector('.content').style.width = "";
                 document.querySelector('.content').style.marginLeft = "";
                this.props.history.push('/dashboard');
            }
        }
        console.log('submitting')
    }

    componentDidMount(){
        document.querySelector('.content').style.width = "100vw";
        document.querySelector('.content').style.marginLeft = "0";
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
                            <form onSubmit={this.handleSubmit} id="loginform">

                                { this.state.errormessage != null && this.state.errormessage.length > 0 ? 
                                    <div className="alert alert-warning" role="alert">{this.state.errormessage}</div>
                                    : 
                                    <span></span>
                                }

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="loginid">
                                        <i className="fas fa-envelope fa-fw"></i>
                                    </span>
                                    <label htmlFor="loginid" className="sr-only">Email</label>
                                    <input type="text" className="form-control alt alt2" 
                                    id="loginid" name="loginid" placeholder="Email" aria-label="Email"
                                    aria-describedby="loginid" autoComplete="loginid" required
                                    value={this.state.loginid}
                                    onChange={this.handleInputChange}/>
                                </div>
                                

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="password">
                                        <i className="fas fa-lock-open fa-fw"></i>
                                    </span>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input type="password" className="form-control alt alt2" id="password" name="password" placeholder="Password..."
                                        aria-label="Password" aria-describedby="password" required
                                        value={this.state.password}
                                        onChange={this.handleInputChange}/>
                                </div>
                                {this.state.loading ? 
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <div className="spinner-border text-secondary" role="status" id="loader">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </button>
                                : <button type="submit" className="btn btn-sm bg-btn">
                                        <i className="fas fa-sign-in-alt fa-fw mr-1"></i>
                                        SIGN IN
                                    </button>
                                }
                                
                                
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