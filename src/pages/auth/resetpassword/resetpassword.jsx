import React, { Component } from 'react';

import Validators  from "../../../common/Validators";
import {withContext} from '../../../common/context';
import { APIKEY, HTTPURL } from '../../../common/global_constant';

class ResetPassword extends Component {
    constructor(props){
        super(props);

        this.state = { 
            ...this.props, 
            newpassword: '',
            confirmnewpwd: '',
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
        this.setState({ loading: true });
        let err = false;
        const { newpassword, confirmnewpwd} = this.state
        if(!Validators.validatePassword(newpassword,1).status)err = Validators.validatePassword(newpassword,1).message;
        else if(newpassword !== confirmnewpwd)  err = "Password does not match!"
        if(!err) {
            const res = await this.state.resetPassword(newpassword);
            if(res.status){
                this.state.showAlert('success',res.message);
                this.setState({ newpassword: '', confirmnewpwd: ''});
                this.props.history.push('/login');
            }else this.state.showAlert('danger',res.message);
        } else this.state.showAlert("danger", err)
        this.setState({loading : false});
    }

    render() {
        return (
            <div className="container animated fadeIn">
                <div className="row col-lg-6 col-md-8 col-sm-10 col-xs-12 mx-auto cent">

                    <div className="card bg-light shadow border-0 py-3">
                        <div className="card-header bg-transparent text-center text-dark">
                            <h4>Reset Password</h4>
                        </div>
                        <div className="card-body py-lg-5 text-muted text-center">
                            <form onSubmit={this.handleSubmit} id="changepassword">

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-lock fa-fw"></i>
                                    </span>
                                    <label className='sr-only' htmlFor="newpassword">New&nbsp;Password</label>
                                    <input type="password" className="form-control form-control alt" id="newpassword" name="newpassword"
                                        placeholder="New Password" aria-label="Confirm New password"
                                        aria-describedby="Confirm New password" autoComplete="off" 
                                        value={this.state.newpassword}
                                        onChange={this.handleInputChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-lock fa-fw"></i>
                                    </span>
                                    <label className='sr-only' htmlFor="confirmnewpwd">Confirm&nbsp;New&nbsp;Password</label>
                                    <input type="password" className="form-control form-control alt" id="confirmnewpwd"
                                        name="confirmnewpwd" placeholder="Confirm New password"
                                        aria-label="Confirm New password" aria-describedby="Confirm New password"
                                        autoComplete="off" 
                                        value={this.state.confirmnewpwd}
                                        onChange={this.handleInputChange} />
                                </div>
                                
                                {this.state.loading ? 
                                    <button type="submit" className="btn btn-sm bg-primary mt-3">
                                        <div className="spinner-border text-secondary" role="status" id="loader">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                    : 
                                    <button type="submit" className="btn btn-sm btn-primary mt-3 px-5 py-2">
                                            <i className="fas fa-save fa-fw pr-2"></i>
                                        Save
                                    </button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withContext(ResetPassword);
