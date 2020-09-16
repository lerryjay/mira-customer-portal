import React, { Component } from "react";
import { Link } from "react-router-dom";

import { HTTPURL,APIKEY } from "../../common/global_constant";
import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';

class VerifyToken extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            token : '', 
            loading: false, 
            errormessage: 'A token has been sent to your email. Please enter token to continue',
            successmessage: ''
        };
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }


    render() {
        return(
            <div>
                <div className="container">
                    {/* Success Message */}
                    { this.state.successmessage ? 
                        <div className="alert alert-success" role="alert" style={{position:'fixed', top: '70px' , right: '10px', zIndex:'4'}}>
                            <span className="mt-3">{this.state.successmessage}</span>
                            <button type="button" class="close ml-4" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        :   <span></span>
                    }
                <div className="row form">
                <div className=" col-lg-5 col-md-8 col-sm-10 col-xs-12 mx-auto">

<div className="card bg-light shadow border-0 py-3">
    <div className="card-header bg-transparent text-center">
        <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt=""/>
    </div>
    <div className="card-body py-lg-5 text-muted text-center">
        <form onSubmit={this.handleSubmit} id="forgotpassword">
{/* Error Message */}
{ this.state.errormessage != null && this.state.errormessage.length > 0 ? 
    <div className="alert alert-warning" role="alert">
        {this.state.errormessage}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    :   <span></span>
}
            
            <div className="input-group mb-3">
                <span className="input-group-text bg-white alt" id="email">
                    <i className="fas fa-envelope fa-fw"></i>
                </span>
                {/* <label for="email">Email</label> */}
                <input type="text" className="form-control alt" id="token" name="token" placeholder="Enter Token" aria-label="token"
                    aria-describedby="token" autoComplete="token" required
                    value={this.state.token}
                    onChange={this.handleInputChange}/>
            </div>

            {this.state.loading ? 
            <button type="submit" className="btn btn-sm bg-btn">
                <div className="spinner-border text-secondary" role="status" id="loader">
                    <span className="sr-only">Loading...</span>
                </div>
            </button>
            : <button type="submit" className="btn btn-sm bg-btn">
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

export default withContext(VerifyToken);