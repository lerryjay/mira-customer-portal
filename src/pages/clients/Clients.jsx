import React, {Component} from 'react'
import { Link } from "react-router-dom";
import avatar from '../../assets/images/avatar.png'
import {withContext} from '../../common/context';
import { HTTPURL, APIKEY } from '../../common/global_constant';

class Clients extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.props, 
            showmodal: true,
            loading : true,
            clients: []
        }

    }

    async componentDidMount(){
        this.state.showLoader();
        await this.getClient();
        this.setState({ loading : false  });
        this.state.hideLoader();
    }

    
    async getClient() {
        const headers = new Headers();
        headers.append('API-KEY', APIKEY );
        const res = await fetch(HTTPURL + `clients/?userid=${this.state.user.userid}`, {
            method: 'GET',
            headers: headers
        }).then(response => response.json());

        if(res['status']) this.setState({ clients : res['data']})
    }

    deleteModal() {
        let modal = document.getElementById("myModal")
        modal.style.display = "block";
    }

    closeModal() {
        let modal = document.getElementById("myModal")
        modal.style.display = "none";
    }

    render() {
        
        return (
            <div className="container-fluid">
                <div className="row mt-4">
            <div className="w-100 text-center">
            <h3>CLIENT LIST </h3>
            </div>

    
                    <div className="col-md-12" >
                                <div className="card-body">
                                {!this.state.loading && this.state.clients.length === 0 ?
                                <div className="card-body">
                                    <div className="alert alert-warning" role="alert">
                                        <h6 className="text-center">No client records!</h6>
                                    </div>
                                    </div>
                                    :
                                    !this.state.loading && <div id='table' className=" pt-2 justify-content-center shadow">
                                        <div className="table-responsive">
                                            <table className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">
                                                <thead>
                                                    <tr>
                                                        <th><i className="fas fa-image"></i></th>
                                                        <th>Name</th>
                                                        <th>Email&nbsp;Address</th>
                                                        <th>Telephone</th>
                                                        <th>Company&nbsp;Name</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.clients.map( client => {
                                                     return(
                                                        <tr>
                                                        <td className="align-middle">
                                                            <img src={avatar} alt="" width="30" height="30" className="rounded-circle" /></td>
                                                            <td>{client.lastname} {client.firstname} {client.othername}</td>
                                                            
                                                        <td>{client.email} </td>
                                                            <td>{client.telephone} </td>
                                                            <td>{client.businessname}</td>
                                                        <td>
                                                            <Link to={() => `/viewClient/${client.user_id}`} >
                                                                <span className="badge px-3 py-2 m-2 badge-primary" value={client.id} style={{cursor:"pointer"}}>View</span>
                                                            </Link>
                                                            <Link onClick={this.deleteModal}>
                                                                <span className="badge px-3 py-2 badge-danger" id="myBtn" style={{cursor:"pointer"}}>Delete</span>
                                                            </Link>
                                                        </td>
                            
                                                    </tr>

                                                     )}
                                                )}
    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                                </div>
    
                            
                            </div>
                    </div>
    
              
              
                    {this.state.showmodal ?  
                    <div id="myModal" className="modal">
                        {/* Modal content  */}
                        <div className="modal-content text-center p-5">
                            {/* <div className="delete-icon">
                                &times;
                            </div> */}
                            <i className="fa fa-exclamation-triangle fa-3x dark-red mb-2" aria-hidden="true"></i>
                            <h3>Are you sure?</h3>
                            <p> Do you really want to delete this file?</p>
                            <div className="row">
                                <div className="col-md-6 col-sm-6">                            
                                    <button onClick={this.closeModal} className="btn-block btn btn-outline-secondary mb-2">Cancel</button>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <button className="btn btn-danger btn-block">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :           
                    <span></span> 
                }
    
                 

            </div>
        )
    }
}
export default withContext(Clients);
