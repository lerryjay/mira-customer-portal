import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withContext } from '../../../common/context';

class VerifyLinkToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            loading:false,
            valid : true,
            tokenError : ''
        };
    }

    verifytoken = async ()=>{
        const token = this.props.location.pathname.split("/")[2];
        if(token != null && token.length > 0){
            const res = await this.state.verifyLinkToken(token);
            if(res.status) this.setState({ loading : false, valid : true });
            else  this.setState({ loading : false, valid : false });
        }else this.setState({ loading : false, valid : false,token : 'Invalid reset token' });
    }

     componentDidMount(){
         this.verifytoken();
    }

    render() {
        return (
            <div>
                <div className="container animated fadeIn">
                    <div className="row form">
                        <div className=" col-lg-5 col-md-8 col-sm-10 col-xs-12 mx-auto">

                            <div className={`card bg-light shadow py-3 ${this.state.valid ? `border-top-green` : `border-top-red`}`}>
                                <div className="card-body py-lg-5 text-muted text-center ">
                                    <div className="mb-3">
                                        {
                                            !this.state.loading && <i className={`fa fa-4x ${ this.state.valid ? 'fa-check-circle text-success' :  'fa-times-circle text-danger'  } bg-white  rounded-circle`}></i>
                                        }
                                    </div>
                                    {
                                        this.state.loading && <h4 className=" mb-3"> Verifying...</h4>
                                    }
                                    {
                                        !this.state.loading && !this.state.valid && <h5 className="mb-3"> Token verification failed! {this.state.tokenError }</h5>
                                    }
                                    {
                                        !this.state.loading && this.state.valid && <p className="text-success my-5" style={{ fontSize:'15px'}}> Congratulations, the link has been verified succesfully! You can now proceed to reset your password.</p>
                                    }
                                    {this.state.loading ?
                                        <button type="submit" className="btn btn-sm btn-primary">
                                            <div className="spinner-border text-white" role="status" id="loader">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </button>
                                        :  this.state.valid ? <Link to="/reset-password" className="btn btn-sm btn-success mt-2 px-5 py-2">
                                            Reset Password
                                            <i className="fas fa-arrow-right fa-fw ml-5"></i>
                                        </Link>: <Link to="/login" className="btn btn-link">Back to login</Link>
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