import React, { Component } from 'react';

import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';
import { APIKEY, HTTPURL } from '../../common/global_constant';

class ChangePassword extends Component {
    constructor(props){
        super(props);

        this.state = { 
            ...this.props, 
            oldpassword : '' , 
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

        const {oldpassword, newpassword, confirmnewpwd} = this.state
       
        //Waste 3 seconds
        if(!Validators.validatePassword(oldpassword,1).status){
            const err = Validators.validatePassword(oldpassword,1).message;
            if(err){
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
        } else if(!Validators.validatePassword(newpassword,1).status){
            const err = Validators.validatePassword(newpassword,1).message;
            if(err){
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
        } else if(!Validators.validatePassword(confirmnewpwd,1).status){
            const err = Validators.validatePassword(confirmnewpwd,1).message;
            if(err){
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
        }else if(newpassword !== confirmnewpwd) {
            const err = "Password does not match!"
            if(err){
                this.setState({ loading: false });
                this.state.showAlert("danger", err)
            }
        } else {
            let data = document.getElementById("changepassword")
            const headers = new Headers();
            headers.append('API-KEY',APIKEY);
            let form = new FormData(data);
            form.append('userid',this.state.user.userid);
            const res = await fetch(HTTPURL + 'user/updatepassword', {
                method: 'POST',
                body: form,
                headers: headers
            })
            .then(response => response.json())
            this.setState({loading : false});
            if(res.status){
                this.setState({loading : false});
                this.state.showAlert('success',res.message);
                this.setState({oldpassword: '', newpassword: '', confirmnewpwd: ''})
            }else {
                this.setState({loading : false});
                this.state.showAlert('danger',res.message);
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row col-lg-6 col-md-8 col-sm-10 col-xs-12 mx-auto cent">

                    <div className="card bg-light shadow border-0 py-3">
                        <div className="card-header bg-transparent text-center text-dark">
                            <h4>Change Password</h4>
                        </div>
                        <div className="card-body py-lg-5 text-muted text-center">
                            <form onSubmit={this.handleSubmit} id="changepassword">
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-lock-open fa-fw"></i>
                                    </span>
                                    <label className='sr-only' htmlFor="oldpassword">Current&nbsp;Password</label>
                                    <input type="password" className="form-control form-control-sm alt" id="oldpassword"
                                        name="oldpassword" placeholder="Current Password" aria-label="Current password"
                                        aria-describedby="Current password" autoComplete="off" 
                                        value={this.state.oldpassword} 
                                        onChange={this.handleInputChange}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-lock fa-fw"></i>
                                    </span>
                                    <label className='sr-only' htmlFor="newpassword">New&nbsp;Password</label>
                                    <input type="password" className="form-control form-control-sm alt" id="newpassword" name="newpassword"
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
                                    <input type="password" className="form-control form-control-sm alt" id="confirmnewpwd"
                                        name="confirmnewpwd" placeholder="Confirm New password"
                                        aria-label="Confirm New password" aria-describedby="Confirm New password"
                                        autoComplete="off" 
                                        value={this.state.confirmnewpwd}
                                        onChange={this.handleInputChange} />
                                </div>
                                
                                {this.state.loading ? 
                                    <button type="submit" className="btn btn-sm bg-btn">
                                        <div className="spinner-border text-secondary" role="status" id="loader">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                    :<button type="submit" className="btn btn-sm btn-primary px-3">
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
export default withContext(ChangePassword);
