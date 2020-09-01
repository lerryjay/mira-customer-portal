import React, {Component} from 'react'
import { Link } from "react-router-dom";
import image from '../../assets/images/dammy.jpg'
import avatar from '../../assets/images/avatar.png'
import {withContext} from '../../common/context';
import { HTTPURL } from '../../common/global_constant';

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
        headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
        fetch(HTTPURL + 'clients/?userid=5f44c8e94593e', {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            this.setState({clients: data.data})
        });
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
    
                                    <div id='table' className="card pt-2 mt-3 justify-content-center shadow px-2">
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
                                                            <img src={avatar} alt="" width="30" className="rounded-circle" /></td>
                                                            <td>{client.name} </td>
                                                        <td>{client.email} </td>
                                                            <td>{client.telephone} </td>
                                                            <td>{client.businessname}</td>
                                                        <td>
                                                        <Link to="/viewClient">
                                                        <span class="badge px-3 py-2 mr-2 badge-primary" style={{cursor:"pointer"}}>View</span>
                                                        </Link>
                                                        <Link to="/viewClient">
                                                        <span class="badge px-3 py-2 badge-danger" style={{cursor:"pointer"}}>Delete</span>
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
    
              
              
    
                  {/* Modal  */}
                  {this.state.showmodal ? <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    : <span></span> 
    }
                </div>
            </div>
        )
    }
}
export default withContext(ListClient);
