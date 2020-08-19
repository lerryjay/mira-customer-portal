import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';

class SignUp extends Component {
    constructor(props) {
        super(props)
        //state variables
        this.state = { 
            ...this.props, 
            username: '', 
            email : '', 
            password : '' ,
            loading: false, 
            errormessage: ''
        };
      }
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value, errormessage : '' });
    }

      //handles form submission
    handleSubmit = async e => {
        e.preventDefault()
        const { username, email, password } = this.state
        await this.setState({loading : true});
        //Waste 3 seconds
        setTimeout(() =>this.setState({loading : false}), 3000);
        if(!Validators.validateEmail(email).status){
            const err = Validators.validateEmail(email).message
            this.setState({errormessage: err});
            setTimeout(()=> this.setState({errormessage: ''}),5000);
        }else if(!Validators.validatePassword(password,1).status){
            const err = Validators.validatePassword(password,1).message;
            this.setState({errormessage: err});
            setTimeout(()=> this.setState({errormessage: ''}),5000);
        }else{
           const res = await this.state.signup(username, email, password);
            
           if(!res['status'])this.setState({errormessage: res['message']});
            else{
                //find a way to redirect here 
                this.props.history.push('/login');
            }
        }
        console.log(
            `
            username: ${this.state.username}
            email:${this.state.email}
            password:${this.state.password}`,
        )
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

                            { this.state.errormessage.length > 0 ? 
                                    <div className="alert alert-warning" role="alert">{this.state.errormessage}</div>
                                    : 
                                    <span></span>
                                }

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="username">
                                        <i className="fas fa-user fa-fw"></i>
                                    </span>
                                    {/* <label for="username">Name</label> */}
                                    <input type="text" className="form-control alt" id="username" name="username" placeholder="Name" aria-label="Name"
                                        aria-describedby="username" autocomplete="name" required
                                        value={this.state.usename}
                                        onChange={this.handleInputChange}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-envelope fa-fw"></i>
                                    </span>
                                    {/* <label for="email">Email</label> */}
                                    <input type="text" className="form-control alt" id="email" name="email" placeholder="Email" aria-label="Email"
                                        aria-describedby="email" autocomplete="email" required
                                        value={this.state.email}
                                        onChange={this.handleInputChange}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="password">
                                        <i className="fas fa-lock-open fa-fw"></i>
                                    </span>
                                    {/* <label for="password">Password</label> */}
                                    <input type="password" className="form-control alt" id="password" name="password" placeholder="Password..."
                                        aria-label="password" aria-describedby="password" required
                                        value={this.state.password}
                                        onChange={this.handleInputChange}/>
                                </div>
                                
                                {this.state.loading ? 
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <div className="spinner-border text-secondary" role="status" id="loader">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </button>
                                :
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <i className="fas fa-sign-in-alt fa-fw"></i>
                                    SIGN UP
                                </button>
                                }
                            </form>
                        </div>
                    </div>
                    <div className="mt-4 bottom_link">
                        <small>
                            <Link to="/forgot_password">&#8592;&nbsp;Forgot password?</Link>
                            <span className="float-right">
                                <Link to="/login">Login&nbsp;&#8594;&nbsp;</Link>
                            </span>
                        </small>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default withContext(SignUp);