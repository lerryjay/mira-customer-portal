import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignUp extends Component {
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
                            <form action="" method="post" id="register" >

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="username">
                                        <i className="fas fa-user fa-fw"></i>
                                    </span>
                                    {/* <label for="username">Name</label> */}
                                    <input type="text" className="form-control alt" id="username" name="username" placeholder="Name" aria-label="Name"
                                        aria-describedby="username" autocomplete="name"/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-envelope fa-fw"></i>
                                    </span>
                                    {/* <label for="email">Email</label> */}
                                    <input type="text" className="form-control alt" id="email" name="email" placeholder="Email" aria-label="Email"
                                        aria-describedby="email" autocomplete="email"/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="password">
                                        <i className="fas fa-lock-open fa-fw"></i>
                                    </span>
                                    {/* <label for="pwd">Password</label> */}
                                    <input type="password" className="form-control alt" id="pwd" name="pwd" placeholder="Password..."
                                        aria-label="password" aria-describedby="password"/>
                                </div>

                                <button type="submit" className="btn btn-sm bg-btn">
                                    <i className="fas fa-sign-in-alt fa-fw"></i>
                                    SIGN UP
                                </button>
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

export default SignUp