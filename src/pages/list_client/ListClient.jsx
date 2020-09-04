import React, {Component} from 'react'
import { Link } from "react-router-dom";
import image from '../../assets/images/dammy.jpg'
import avatar from '../../assets/images/avatar.png'
import {withContext} from '../../common/context';
import { HTTPURL, APIKEY } from '../../common/global_constant';
import ViewClient from '../view_client/ViewClient';

class ListClient extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.props, 
            showmodal: true,
            clients: []

        }

    }

    componentDidMount(){
        this.getClient();
    }

    getClient() {
        const headers = new Headers();
        headers.append('API-KEY', APIKEY );
        fetch(HTTPURL + `clients/?userid=${sessionStorage.getItem("userId")}`, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
            .then(data => {
                console.log(data);
            this.setState({clients: data.data})
        });
    }

    handleViewMore = e => {
        console.log(e.target.attributes.value.value)
        // this.props.viewclient(e)
        // this.props.history.push('/viewClient');
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
    
                    <div className="col-md-12 mb-3" id="profile">
                            <div className="card">
                                <div className="card-header text-dark font-weight-bold">
                                    List Client
                </div>
                                <div className="card-body">
    
                                    <div id='table' className=" pt-2 mt-3 justify-content-center shadow px-2">
                                        <div className="table-responsive">
                                            <table
                                                className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark">
                                               
                                                <thead>
                                                    <tr>
                                                        <th><i className="fas fa-image">&nbsp;Image</i></th>
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
                                                                <span class="badge px-3 py-2 mr-2 badge-primary" value={client.id} style={{cursor:"pointer"}}>View</span>
                                                            </Link>
                                                            <Link onClick={this.deleteModal}>
                                                                <span class="badge px-3 py-2 badge-danger" id="myBtn" style={{cursor:"pointer"}}>Delete</span>
                                                            </Link>
                                                        </td>
                            
                                                    </tr>

                                                     )}
                                                )}
    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
    
                                </div>
    
                            
                            </div>
                    </div>
    
              
              
                    {this.state.showmodal ?  
                    <div id="myModal" class="modal">
                        {/* Modal content  */}
                        <div class="modal-content text-center p-5">
                            {/* <div className="delete-icon">
                                &times;
                            </div> */}
                            <i class="fa fa-exclamation-triangle fa-3x dark-red mb-2" aria-hidden="true"></i>
                            <h3>Are you sure?</h3>
                            <p> Do you really want to delete this file?</p>
                            <div className="row">
                                <div className="col-md-6">                            
                                    <button onClick={this.closeModal} className="btn-block btn btn-outline-secondary">Cancel</button>
                                </div>
                                <div className="col-md-6">
                                    <button className="btn btn-danger btn-block">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :           
                    <span></span> 
                }
    
                 

                </div>
            </div>
        )
    }
}
export default withContext(ListClient);
