import React, { Component } from 'react'

import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';

class CreateUser extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            firstname : '', 
            lastname : '' , 
            email: '',
            number: '',
            errormessage: ''
        };
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        const { email} = this.state

        if(!Validators.validateEmail(email).status){
            const err = Validators.validateEmail(email).message
            this.setState({errormessage: err});
            setTimeout(()=> this.setState({errormessage: ''}),5000);
        }else{
            console.log('submitting')
        }
    }

    render() {
        return (
            <div className="container">

            <div className="row mt-4 mx-auto">

                <div className="col-md-12" id="profile">
                    <form onSubmit={this.handleSubmit}>
                        <div className="card">
                            <div className="card-header text-white">
                                Create User
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

                                    
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Name</label>
                                            <input type="text" className="form-control form-control-sm" name="firstname"
                                                id="firstname" placeholder="First Name" 
                                                value={this.state.firstname}
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Name</label>
                                            <input type="text" className="form-control form-control-sm" name="lastname"
                                                id="lastname" placeholder="Last Name"
                                                value={this.state.lastname}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Email</label>
                                            <input type="email" className="form-control form-control-sm" name="email"
                                                id="email"  placeholder="johnDoe@mail.com" 
                                                value={this.state.email}
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Phone-number</label>
                                            <input type="text" className="form-control form-control-sm" name="number"
                                                id="number" placeholder="090 ..........." 
                                                value={this.state.number}
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>

                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="float-right">

                                    <button className="btn btn-sm btn-primary">
                                        <i className="fas fa-folder-open"></i>
            Save
        </button>
        &nbsp;<button className="btn btn-sm btn-danger" type="reset">
                                        <i className="fas fa-history"></i>
            Reset
        </button>
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

         