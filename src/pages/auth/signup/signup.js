import React, { Component } from "react";
import { Link } from "react-router-dom";

import Validators  from "../../../common/Validators";
import {withContext} from '../../../common/context';

class SignUp extends Component {
    constructor(props) {
        super(props)
        //state variables
        this.state = { 
            ...this.props, 
            name: '', 
            email : '', 
            password : '' ,
            telephone: '',
            loading: false, 
            errormessage: '',
            successmessage: ''
        };
      }
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value, errormessage : '' });
    }

      //handles form submission
    handleSubmit = async e => {
        e.preventDefault()
        const {  email, password } = this.state
        await this.setState({loading : true});
        if(!Validators.validateEmail(email).status){
            const err = Validators.validateEmail(email).message
            this.setState({loading : true});
            if(err){
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
        }else if(!Validators.validatePassword(password,1).status){
            const err = Validators.validatePassword(password,1).message;
            this.setState({loading : true});
            if(err){
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
        }else{
            await this.setState({loading : true});
                    this.setState({successmessage: false});
                    const res =  this.state.signup(document.getElementById("signupform"));

                        this.setState({ loading: false });
                        if(res['status']) {
                            this.state.showAlert("success", res['message'])
                            //find a way to redirect here 
                            this.props.history.push('/login');
                        } else{
                            this.state.showAlert("danger",   res['message'])
                        }
        }
    }

    render() {
        return(
            <div>
                <div className="container">
                    <div className="row form">
                    <div className=" col-lg-5 col-md-8 col-sm-10 col-xs-12 mx-auto">

<div className="card bg-light shadow border-0 py-3">
    <div className="card-header bg-transparent text-center">
        <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt=""/>
    </div>
    <div className="card-body py-lg-5 text-muted text-center">
        <form onSubmit={this.handleSubmit} id='signupform'>

            <div className="input-group mb-3">
                <span className="input-group-text bg-white alt" id="name">
                    <i className="fas fa-user fa-fw"></i>
                </span>
                {/* <label for="name">Name</label> */}
                <input type="text" className="form-control alt" id="name" name="name" placeholder="Name" aria-label="Name"
                    aria-describedby="name" autoComplete="name" required
                    value={this.state.usename}
                    onChange={this.handleInputChange}/>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text bg-white alt" id="email">
                    <i className="fas fa-envelope fa-fw"></i>
                </span>
                {/* <label for="email">Email</label> */}
                <input type="text" className="form-control alt" id="email" name="email" placeholder="Email" aria-label="Email"
                    aria-describedby="email" autoComplete="email" required
                    value={this.state.email}
                    onChange={this.handleInputChange}/>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text bg-white alt" id="telephone">
                    <i className="fas fa-phone fa-fw"></i>
                </span>
                {/* <label for="email">Telephone</label> */}
                <input type="tel" className="form-control alt" id="telephone" name="telephone" placeholder="Telephone" aria-label="telephone"
                    aria-describedby="telephone" autoComplete="tel" required
                    value={this.state.telephone}
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
            <button type="submit" className="btn btn-sm btn-primary">
                <div className="spinner-border text-white" role="status" id="loader">
                    <span className="sr-only">Loading...</span>
                </div>
            </button>
            :
            <button type="submit" className="btn btn-sm btn-primary">
                <i className="fas fa-sign-in-alt fa-fw mr-1"></i>
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
        </div>
        )
    }
}

export default withContext(SignUp);