import React, { Component } from 'react'

import Validators  from "../../../common/Validators";
import {withContext} from '../../../common/context';
import { HTTPURL, APIKEY } from '../../../common/global_constant';

class CreateClient extends Component {
    constructor(props){
        super(props);
       
        this.state = { 
            ...this.props, 
            email : '', 
            firstname: '',
            lastname: '',
            telephone : '' ,
           
            errormessage: '',
            loading: false, 
            successmessage: '',
        };
        console.log(this.state);
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        const { email} = this.state

        if(!Validators.validateEmail(email).status){
            console.log('Failed email validation');
            const err = Validators.validateEmail(email).message
            this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({errormessage: err});
                setTimeout(()=> this.setState({errormessage: ''}),5000);
            }, 3000);
        }else{
                this.setState({ loading: false })

            let myHeaders = new Headers();
            myHeaders.append("api-key", APIKEY);

            var formdata = new FormData();
            formdata.append("email", this.state.email);
            formdata.append("firstname", this.state.firstname);
            formdata.append("lastname", this.state.lastname);
            formdata.append("telephone", this.state.telephone);
            formdata.append("userid",sessionStorage.getItem('userId') );
            
            fetch(`${HTTPURL}admin/add`, {
                method: "POST",
                headers: myHeaders,
                body:formdata
            }).then(response => response.json())
                .then(result => {
                    if(result.status === false) {
                        setTimeout(() => {
                            this.setState({loading : false});
                            this.setState({errormessage: result.message});
                            setTimeout(() =>{
                                this.setState({errormessage: false});
                            }, 2000);
                        }, 3000);
                    }
                    else{
                        setTimeout(() => {
                            this.setState({loading : false});
                            this.setState({successmessage: result.message})
                            console.log('submitting')
                            this.setState({ 
                                email: '', telephone: '', firstname: '', lastname: ''
                             })
                            setTimeout(() =>{
                                this.setState({successmessage: false});
                            }, 2000);
                        }, 3000);
                    }
                })

           
        }
    }



    render() {
        return (

            
            <div className="container ">
                <div className="row">
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

                <div className="col-md-8 offset-2 mb-3 mt-4" id="profile">
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


                    <form onSubmit={this.handleSubmit} > 
                    
                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    ADD ADDMINISTRATOR
                    </div>
                    
                                <div className="card-body">

                                <div className="row">
                                   <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Lastname</label>
                                            <input type="text" className="form-control form-control-sm" name="lastname"
                                                id="lastname" placeholder="Lastname"
                                                value={this.state.lastname} required
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                    
                                   <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Firstname</label>
                                            <input type="text" className="form-control form-control-sm" name="firstname"
                                                id="firstname" placeholder="Firstname"
                                                value={this.state.firstname} required
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Email</label>
                                            <input type="text" className="form-control form-control-sm" name="email"
                                                id="email" placeholder="Email" 
                                                value={this.state.email} required
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Telephone</label>
                                            <input type="text" className="form-control form-control-sm" name="telephone"
                                                id="telephone" placeholder="Phone no." required
                                                value={this.state.telephone}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="text-center">
                                {this.state.loading ? 
                                <button type="submit" className="btn btn-sm btn-primary px-4">
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
export default withContext(CreateClient);