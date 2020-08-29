import React, { Component } from 'react';

import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';

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
    
    componentDidMount() {
        console.log('context ',this.context);
        console.log('state ',this.state);
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        const {oldpassword, newpassword, confirmnewpwd} = this.state
       
        //Waste 3 seconds
        if(!Validators.validatePassword(oldpassword,1).status){
            const err = Validators.validatePassword(oldpassword,1).message;
            this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({errormessage: err});
                setTimeout(()=> this.setState({errormessage: ''}),5000);
            }, 3000);
        } else if(!Validators.validatePassword(newpassword,1).status){
            const err = Validators.validatePassword(newpassword,1).message;
            this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({errormessage: err});
                setTimeout(()=> this.setState({errormessage: ''}),5000);
            }, 3000);
        } else if(!Validators.validatePassword(confirmnewpwd,1).status){
            const err = Validators.validatePassword(confirmnewpwd,1).message;
            this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({errormessage: err});
                setTimeout(()=> this.setState({errormessage: ''}),5000);
            }, 3000);
        }else if(newpassword !== confirmnewpwd) {
            const err = "Password does not match!"
            this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({errormessage: err});
                setTimeout(()=> this.setState({errormessage: ''}),5000);
            }, 3000);
        } else {
            this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({successmessage: 'Password Changed Successfully!'});
                setTimeout(() => this.setState({successmessage: false}), 5000);
            }, 3000);
        
            const res = await this.state.changepassword(document.getElementById("changepassword"));

            this.setState({oldpassword: '', newpassword: '', confirmnewpwd: ''})
        }
        console.log('changed successfully!')
    }

    render() {
        return (
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
                <div className="row col-lg-6 col-md-8 col-sm-10 col-xs-12 mx-auto cent">

                    <div className="card bg-light shadow border-0 py-3">
                        <div className="card-header bg-transparent text-center text-dark">
                            <h4>Change Password</h4>
                        </div>
                        <div className="card-body py-lg-5 text-muted text-center">
                            <form onSubmit={this.handleSubmit} id="changepassword">
                            {/* Error Message */}
                            { this.state.errormessage != null && this.state.errormessage.length > 0 ? 
                                <div className="alert alert-warning" role="alert">
                                    <span className="mt-3">{this.state.errormessage}</span>
                                    <button type="button" class="close ml-4" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                :   <span></span>
                            }

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-lock-open fa-fw"></i>
                                    </span>
                                    <label className='sr-only' htmlFor="oldpassword">Current&nbsp;Password</label>
                                    <input type="password" className="form-control form-control-sm alt" id="oldpassword"
                                        name="oldpassword" placeholder="Current Password" aria-label="Current password"
                                        aria-describedby="Current password" autoComplete="off" 
                                        value={this.state.oldpassword} required
                                        onChange={this.handleInputChange}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-lock fa-fw"></i>
                                    </span>
                                    <label className='sr-only' htmlFor="newpassword">New&nbsp;Password</label>
                                    <input type="password" className="form-control form-control-sm alt" id="newpassword" name="newpassword"
                                        placeholder="New Password" aria-label="Confirm New password"
                                        aria-describedby="Confirm New password" autoComplete="off" required
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
                                        autoComplete="off" required
                                        value={this.state.confirmnewpwd}
                                        onChange={this.handleInputChange} />
                                </div>
                                
                                {this.state.loading ? 
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <div className="spinner-border text-secondary" role="status" id="loader">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </button>
                                : 
                                <button type="submit" className="btn btn-sm bg-btn">
                                        <i className="fas fa-save fa-fw"></i>
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
