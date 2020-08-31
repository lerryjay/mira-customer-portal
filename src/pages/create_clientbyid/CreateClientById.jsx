import React, { Component } from 'react'

import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';
import { HTTPURL } from '../../common/global_constant';

class CreateClientById extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            clientid : '', 
            userid : '' , 
            businessname: '',
            errormessage: '',
            loading: false, 
            successmessage: '',
            clients: []
        };
    }
    componentWillMount() {
        this.getClient()
    }

    getClient = () => {
        fetch(`${HTTPURL}clients?userid=${this.state.userId}`, {
            method: "GET",
            headers: { "api-key": this.state.apiKey },
        }).then(res => res.json()).then(result => {
            if (result.status) {
                this.setState({ clients: result.data });
            }
        })
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        const { businessname, clientid } = this.state

        if(!businessname){
           this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({errormessage: 'Business name is required'});
                setTimeout(()=> this.setState({errormessage: ''}),5000);
            }, 3000);
        }else{
            this.setState({ loading: true });
            let myHeaders = new Headers();
            myHeaders.append("api-key", this.state.apiKey);

            var formdata = new FormData();
            formdata.append("businessname", this.state.businessname);
            formdata.append("clientid", clientid);
            formdata.append("userid", this.props.userId);

            fetch(`${HTTPURL}clients/add`, {
                method: "POST",
                headers: myHeaders,
                body: formdata
            }).then(response => response.json()).
                then(result => { console.log(result) })


            setTimeout(() => {
                this.setState({loading : false});
                this.setState({successmessage: 'Added Successfully!'})
                setTimeout(() =>{
                    this.setState({successmessage: false});
                     console.log('submitting')
                     this.setState({name: '', email: '', telephone: ''})
                }, 5000);
            }, 3000);
        }
    }

    render() {
        
        return (

            <div className="container mx-auto row">
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

                    <form onSubmit={this.handleSubmit} id="createclient"> 
                    
                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    ADD CLIENT BY USERID
                    </div>
                    
                                <div className="card-body">

                                <div className="row">

                                        
                                   <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Client&nbsp;ID</label>
                                            <select required onChange={this.handleInputChange} className="form-control form-control-sm" name="clientid">
                                               <option value="">Please select Client</option>
                                                {this.state.clients.length > 0 ? this.state.clients.map(client => <option value={client.id} >{client.name}</option>) : null}
                                            </select>
                                            
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Business Nmae</label>
                                            <input type="text" className="form-control form-control-sm" name="businessname"
                                                id="businesname" placeholder="Business Name" required
                                                value={this.state.businessname}
                                                onChange={this.handleInputChange} />
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

        )
    }
}
export default withContext(CreateClientById);
