import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row col-lg-6 col-md-8 col-sm-10 col-xs-12 mx-auto cent">

                    <div className="card bg-light shadow border-0 py-3">
                        <div className="card-header bg-transparent text-center">
                            <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt="" />
                        </div>
                        <div className="card-body py-lg-5 text-muted text-center">
                            <form action="" method="post" id="forgotpwd" name="forgotpwd">

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-lock-open fa-fw"></i>
                                    </span>
                                    <label className='sr-only' htmlFor="currentpwd">Current&nbsp;Password</label>
                                    <input type="password" className="form-control form-control-sm alt" id="currentpwd"
                                        name="currentpwd" placeholder="Current Password" aria-label="Current password"
                                        aria-describedby="Current password" autoComplete="off" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-lock fa-fw"></i>
                                    </span>
                                    <label className='sr-only' htmlFor="newpwd">New&nbsp;Password</label>
                                    <input type="password" className="form-control form-control-sm alt" id="newpwd" name="newpwd"
                                        placeholder="New Password" aria-label="Confirm New password"
                                        aria-describedby="Confirm New password" autoComplete="off" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-lock fa-fw"></i>
                                    </span>
                                    <label className='sr-only' htmlFor="confirmnewpwd">Confirm&nbsp;New&nbsp;Password</label>
                                    <input type="password" className="form-control form-control-sm alt" id="confirmnewpwd"
                                        name="confirmnewpwd" placeholder="Confirm New password"
                                        aria-label="Confirm New password" aria-describedby="Confirm New password"
                                        autoComplete="off" />
                                </div>

                                <button type="submit" className="btn btn-sm bg-btn">
                                    <i className="fas fa-save fa-fw"></i>
                                Save
                            </button>
                            </form>
                        </div>
                    </div>



                    <div className="mt-4 bottom_link">

                        <small>
                            <Link to="/login">&nbsp;&#8592;&nbsp;Login</Link>
                            <span className="float-right">
                                <Link to="/signup">Register&nbsp;&#8594;&nbsp;</Link>
                            </span>
                        </small>
                    </div>

                </div>
            </div>
        )
    }
}
