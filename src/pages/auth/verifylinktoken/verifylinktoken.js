import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withContext } from '../../../common/context';

class VerifyLinkToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            loading:false,
            valid : false,
            tokenError : ''
        };
    }

    async componentDidMount(){
        this.setState({ loading : true });
        const token = this.props.location.pathname.split("/")[2];
        const res = await this.state.VerifyLinkToken(token);
        if(res.status) this.setState({ loading : false, valid : true });
        else  this.setState({ loading : false, valid : false });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row form">
                        <div className=" col-lg-5 col-md-8 col-sm-10 col-xs-12 mx-auto">

                            <div className="card bg-light shadow py-3 border-top-green">
                                <div className="card-body py-lg-5 text-muted text-center ">
                                    <div className="mb-3">
                                        <i className="fa fa-check-circle fa-4x bg-white text-success rounded-circle"></i>
                                    </div>
                                    {
                                        !this.state.loading && <p className="text-dnager mb-3"> Verifying token ...</p>
                                    }
                                    {
                                        !this.state.loading && !this.state.valid && <p className="text-dnager mb-3"> Token verification failed! {this.state.tokenError }</p>
                                    }
                                    {
                                        !this.state.loading && this.state.valid && <p className="text-success mb-3"> Congratulations, the link has been verified succesfully! You can now proceed to reset your password.</p>
                                    }
                                    {this.state.loading ?
                                        <button type="submit" className="btn btn-sm btn-primary">
                                            <div className="spinner-border text-white" role="status" id="loader">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </button>
                                        : <Link to="/resetpassword" className="btn btn-sm btn-success px-5 py-2">
                                            <i className="fas fa-paper-plane fa-fw mr-2"></i>
                                            CONTINUE
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