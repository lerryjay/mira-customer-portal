import React, { Component } from 'react'

import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';

class CreateUser extends Component {
    constructor(props){
        super(props);
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
        this.setState({ [name]: value,errormessage : '' });
    }

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
                    this.setState({title : '', package: '', type: '', message: '', product: ''});
                    this.props.history.push('/createUser')
                }, 5000);
            }, 3000)
        }
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

            <div className="row mt-4 mx-auto">

                <div className="col-md-8 offset-2" id="profile">
                    <form onSubmit={this.handleSubmit}>
                        <div className="card">
                            <div className="card-header bg-medium font-weight-bold text-dark">
                                CREATE USER
                            </div>
                            <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    { this.state.errormessage != null && this.state.errormessage.length > 0 ? 
                                        <div className="alert alert-warning" role="alert">{this.state.errormessage}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>
                                        : 
                                        <span></span>
                                        }
                                </div>
                            </div>
                                <div className="row">

                                <div className="col-md-12 mb-1">
                                        <div className="form-group">
                                    {/* <label for="name">Name</label> */}
                                    <input type="text" className="form-control alt" id="name" name="name" placeholder="Name" aria-label="Name"
                                        aria-describedby="name" autoComplete="name" required
                                        value={this.state.usename}
                                        onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    
                                <div className="col-md-12 mb-1">
                                        <div className="form-group">
                                    {/* <label for="email">Email</label> */}
                                    <input type="text" className="form-control alt" id="email" name="email" placeholder="Email" aria-label="Email"
                                        aria-describedby="email" autoComplete="email" required
                                        value={this.state.email}
                                        onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    
                                <div className="col-md-12 mb-1">
                                        <div className="form-group">
                                    {/* <label for="email">Telephone</label> */}
                                    <input type="tel" className="form-control alt" id="telephone" name="telephone" placeholder="Telephone" aria-label="telephone"
                                        aria-describedby="telephone" autoComplete="tel" required
                                        value={this.state.telephone}
                                        onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    
                                <div className="col-md-12 mb-1">
                                        <div className="form-group">
                                    {/* <label for="password">Password</label> */}
                                    <input type="password" className="form-control alt" id="password" name="password" placeholder="Password..."
                                        aria-label="password" aria-describedby="password" required
                                        value={this.state.password}
                                        onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                
                                   
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                {this.state.loading ? 
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <div className="spinner-border text-secondary" role="status" id="loader">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </button>
                                : <button type="submit" className="btn btn-sm btn-primary px-3">
                                    <i className="fas fa-folder-open mr-2"></i>
                                        Save
                                    </button>
                                }

                                    
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>

        )
    }
}
export default withContext(CreateUser);

         