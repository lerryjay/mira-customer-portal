import React, { Component } from "react";
import { Link } from "react-router-dom";

class ForgotPassword extends Component {
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
                            <form action="" method="post" id="forgotpwd" name="forgotpwd" >

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-envelope fa-fw"></i>
                                    </span>
                                    {/* <label for="email">Email</label> */}
                                    <input type="text" className="form-control alt" id="email" name="email" placeholder="Email" aria-label="Email"
                                        aria-describedby="email" autocomplete="email"/>
                                </div>

                                <button type="submit" className="btn btn-sm bg-btn">
                                    <i className="fas fa-paper-plane fa-fw"></i>
                                    SEND
                                </button>
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
        )
    }
}

export default ForgotPassword