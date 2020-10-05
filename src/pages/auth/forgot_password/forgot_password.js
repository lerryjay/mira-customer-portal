import React, { Component } from "react";
import { Link } from "react-router-dom";

import { HTTPURL,APIKEY } from "../../../common/global_constant";
import Validators  from "../../../common/Validators";
import {withContext} from '../../../common/context';

class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            email : '', 
            loading: false, 
            errormessage: '',
            successmessage: ''
        };
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        const { email} = this.state
        await this.setState({loading : true});
        if (!Validators.validateEmail(email).status) {
            const err = Validators.validateEmail(email).message
            if(err){
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
        }else{
            
            this.setState({loading : true});

              const headers = new Headers();
              headers.append("API-KEY", APIKEY);
              let form = new FormData(document.getElementById("forgotpassword"));
              fetch(HTTPURL + "user/forgotpassword", {
              method: "POST",
              body: form,
              headers,
              })
              .then((response) => response.json())
              .then((res) => {
  
                  this.setState({ loading: false });
                  if(res['status']) {
                      this.state.showAlert("success", res['message'])
                      //find a way to redirect here 
                      this.props.history.push('/verifytoken');
                  } else{
                      this.state.showAlert("danger",   res['message'])
                  }
              });
         
            
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
        <form onSubmit={this.handleSubmit} id="forgotpassword">
            
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