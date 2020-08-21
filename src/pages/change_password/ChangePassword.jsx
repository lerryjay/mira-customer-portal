import React, { Component } from 'react';

import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';

class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            currentpwd : '' , 
            newpwd: '',
            confirmnewpwd: '',
            loading: false, 
            errormessage: ''
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

        const {currentpwd, newpwd, confirmnewpwd} = this.state
       
        //Waste 3 seconds
        if(!Validators.validatePassword(currentpwd,1,false,false,false,false).status){
            const err = Validators.validatePassword(currentpwd,1,false,false,false,false).message;
           await this.setState({errormessage: err});
            setTimeout(()=> this.setState({errormessage: ''}),5000);
        } else if(!Validators.validatePassword(newpwd,1,false,false,false,false).status){
            const err = Validators.validatePassword(newpwd,1,false,false,false,false).message;
           await this.setState({errormessage: err});
            setTimeout(()=> this.setState({errormessage: ''}),5000);
        } else if(!Validators.validatePassword(confirmnewpwd,1,false,false,false,false).status){
            const err = Validators.validatePassword(confirmnewpwd,1,false,false,false,false).message;
           await this.setState({errormessage: err});
            setTimeout(()=> this.setState({errormessage: ''}),5000);
        }else{
            await this.setState({loading : true});
            setTimeout(() =>this.setState({loading : false}), 3000);
            this.state.changepassword(currentpwd,newpwd, confirmnewpwd);
        }
        console.log('changed successfully!')
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
                            <form onSubmit={this.handleSubmit}>

                            { this.state.errormessage != null && this.state.errormessage.length > 0 ? 
                                    <div className="alert alert-warning" role="alert">{this.state.errormessage}
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    </div>
                                    : 
                                    <span></span>
                                }

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-lock-open fa-fw"></i>
                                    </span>
                                    <label className='sr-only' htmlFor="currentpwd">Current&nbsp;Password</label>
                                    <input type="password" className="form-control form-control-sm alt" id="currentpwd"
                                        name="currentpwd" placeholder="Current Password" aria-label="Current password"
                                        aria-describedby="Current password" autocomplete="off" 
                                        value={this.state.currentpwd} required
                                        onChange={this.handleInputChange}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-lock fa-fw"></i>
                                    </span>
                                    <label className='sr-only' htmlFor="newpwd">New&nbsp;Password</label>
                                    <input type="password" className="form-control form-control-sm alt" id="newpwd" name="newpwd"
                                        placeholder="New Password" aria-label="Confirm New password"
                                        aria-describedby="Confirm New password" autocomplete="off" required
                                        value={this.state.newpwd}
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
                                        autocomplete="off" required
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
