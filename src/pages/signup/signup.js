import React, { Component } from "react";
import { Link } from "react-router-dom";

import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';

class SignUp extends Component {
    constructor(props) {
        super(props)
        //state variables
        this.state = { 
            ...this.props, 
            name: '', 
            email : '', 
            password : '' ,
            telephone: '',
            loading: false, 
            errormessage: '',
            successmessage: ''
        };
      }
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value, errormessage : '' });
    }

      //handles form submission
    handleSubmit = async e => {
        e.preventDefault()
        const { name, email, password, telephone } = this.state
        await this.setState({loading : true});
        setTimeout(() =>this.setState({loading : false}), 3000);
        //Waste 3 seconds
        setTimeout(() =>this.setState({loading : false}), 5000);
        if(!Validators.validateEmail(email).status){
            console.log('Failed email validation');
            const err = Validators.validateEmail(email).message
            this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({errormessage: err});
                setTimeout(()=> this.setState({errormessage: ''}),5000);
            }, 3000);
        }else if(!Validators.validatePassword(password,1).status){
            console.log('Failed password validation');
            const err = Validators.validatePassword(password,1).message;
            this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({errormessage: err});
                setTimeout(()=> this.setState({errormessage: ''}),5000);
            }, 3000);
        }else{
            await this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({successmessage: 'Registered Successfully!'})
                setTimeout(() =>{
                    this.setState({successmessage: false});
                    const res =  this.state.signup(document.getElementById("signupform"));
                    // this.props.history.push('/login')
                }, 5000);
            }, 3000);
        
        //    if (!res['status']) this.setState({errormessage: res['message']});
        //     else{
        //         //find a way to redirect here 
        //         this.props.history.push('/login');
        //     }
        }
        // console.log(
        //     `
        //     name: ${this.state.name}
        //     email:${this.state.email}
        //     password:${this.state.password}
        //     telephone: ${this.state.telephone}`
        // )
    }

    render() {
        return(
            <div>
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
                <div className="row col-lg-5 col-md-8 col-sm-10 col-xs-12 mx-auto cent">

                    <div className="card bg-light shadow border-0 py-3">
                        <div className="card-header bg-transparent text-center">
                            <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt=""/>
                        </div>
                        <div className="card-body py-lg-5 text-muted text-center">
                            <form onSubmit={this.handleSubmit} id='signupform'>
                    {/* Error Message */}
                    { this.state.errormessage != null && this.state.errormessage.length > 0 ? 
                        <div className="alert alert-warning" role="alert">
                            {this.state.errormessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        :   <span></span>
                    }

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="name">
                                        <i className="fas fa-user fa-fw"></i>
                                    </span>
                                    {/* <label for="name">Name</label> */}
                                    <input type="text" className="form-control alt" id="name" name="name" placeholder="Name" aria-label="Name"
                                        aria-describedby="name" autoComplete="name" required
                                        value={this.state.usename}
                                        onChange={this.handleInputChange}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="email">
                                        <i className="fas fa-envelope fa-fw"></i>
                                    </span>
                                    {/* <label for="email">Email</label> */}
                                    <input type="text" className="form-control alt" id="email" name="email" placeholder="Email" aria-label="Email"
                                        aria-describedby="email" autoComplete="email" required
                                        value={this.state.email}
                                        onChange={this.handleInputChange}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="telephone">
                                        <i className="fas fa-phone fa-fw"></i>
                                    </span>
                                    {/* <label for="email">Telephone</label> */}
                                    <input type="tel" className="form-control alt" id="telephone" name="telephone" placeholder="Telephone" aria-label="telephone"
                                        aria-describedby="telephone" autoComplete="tel" required
                                        value={this.state.telephone}
                                        onChange={this.handleInputChange}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white alt" id="password">
                                        <i className="fas fa-lock-open fa-fw"></i>
                                    </span>
                                    {/* <label for="password">Password</label> */}
                                    <input type="password" className="form-control alt" id="password" name="password" placeholder="Password..."
                                        aria-label="password" aria-describedby="password" required
                                        value={this.state.password}
                                        onChange={this.handleInputChange}/>
                                </div>
                                
                                {this.state.loading ? 
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <div className="spinner-border text-secondary" role="status" id="loader">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </button>
                                :
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <i className="fas fa-sign-in-alt fa-fw"></i>
                                    SIGN UP
                                </button>
                                }
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

export default withContext(SignUp);