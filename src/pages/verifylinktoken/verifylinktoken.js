import React, { Component } from "react";
import { Link } from "react-router-dom";

import { HTTPURL,APIKEY } from "../../common/global_constant";
import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';

class VerifyLinkToken extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
        };
    }


    render() {
        return(
            <div>
                <div className="container">
                <div className="row form">
                <div className=" col-lg-5 col-md-8 col-sm-10 col-xs-12 mx-auto">

<div className="card bg-light shadow py-3 border-top-green">
    <div className="card-body py-lg-5 text-muted text-center ">
            <div className="mb-3">
                <i className="fa fa-check-circle fa-4x bg-white text-success rounded-circle"></i>
            </div>

            <p className="text-success mb-3"> Congratulations, the link has been verified succesfully! You can now proceed to reset your password.</p>

            {this.state.loading ? 
            <button type="submit" className="btn btn-sm btn-primary">
                <div className="spinner-border text-white" role="status" id="loader">
                    <span className="sr-only">Loading...</span>
                </div>
            </button>
            : <Link to="/resetpassword">
                <button type="submit" className="btn btn-sm btn-success px-5 py-2">
                <i className="fas fa-paper-plane fa-fw mr-2"></i>
                CONTINUE
            </button>
                </Link>
            }
    </div>
</div>
</div>

                </div>

                </div>
        </div>
        )
    }
}

export default withContext(VerifyLinkToken);