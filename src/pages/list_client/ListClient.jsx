import React, {Component} from 'react'
import { Link } from "react-router-dom";
import image from '../../assets/images/dammy.jpg'
import avatar from '../../assets/images/avatar.png'
import {withContext} from '../../common/context';

class ListClient extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.props, 
            showmodal: true
        }

    }

    // showDelete = () => {
    //     this.setS
    // }

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
                                                    <tr>
                                                        <td className="align-middle">
                                                            {/* <img src={image} alt="" width="30" className="rounded-circle" /> */}
                                                            <img src={image} alt="" width="30" className="rounded-circle" /></td>
                                                            <td>Jane Doe</td>
                                                        <td>JohnDoe@mail.com</td>
                                                            <td>0900000000</td>
                                                            <td>John and Sons</td>
                                                        <td>
                                                        <Link to="/viewClient">
                                                        <span class="badge px-3 py-2 mr-2 badge-primary" style={{cursor:"pointer"}}>View</span>
                                                        </Link>
                                                        <Link to="/viewClient">
                                                        <span class="badge px-3 py-2 badge-danger" style={{cursor:"pointer"}}>Delete</span>
                                                        </Link>
                                                        </td>
                               
                                                    </tr>
                                                    <tr>
                                                        <td className="align-middle">
                                                        <img src={avatar} alt="" width="30" height="30" className="rounded-circle" /></td>
                                                            <td>Jane Doe</td>
                                                        <td>JohnDoe@mail.com</td>
                                                            <td>0900000000</td>
                                                            <td>John and Sons</td>
                                                        <td>
                                                        <Link to="/viewClient">
                                                        <span class="badge px-3 py-2 mr-2 badge-primary" style={{cursor:"pointer"}}>View</span>
                                                        </Link>
                                                        <Link to="/viewClient">
                                                        <span class="badge px-3 py-2 badge-danger" style={{cursor:"pointer"}}>Delete</span>
                                                        </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-middle"><img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt=""
                                                            width="30" /></td>
                                                            <td>Jane Doe</td>
                                                        <td>JohnDoe@mail.com</td>
                                                            <td>0900000000</td>
                                                            <td>John and Sons</td>
                                                        <td>
                                                        <Link to="/viewClient">
                                                        <span class="badge px-3 py-2 mr-2 badge-primary" style={{cursor:"pointer"}}>View</span>
                                                        </Link>
                                                        <span class="badge px-3 py-2 badge-danger " data-toggle="modal" data-target="#exampleModal" style={{cursor:"pointer"}}>Delete</span>
                                                       
                                                        </td>
                                                    </tr>
    
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
