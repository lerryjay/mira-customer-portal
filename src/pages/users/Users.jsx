import React, { Component } from 'react'
import { Link } from "react-router-dom";
import avatar from '../../assets/images/avatar.png'
import { withContext } from '../../common/context';
import { HTTPURL, APIKEY } from '../../common/global_constant';

class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.props,
            showmodal: true,
            loading: true,
            id: '',
            userid: ''
        }

    }

    getUser(lastname) {
        const selectedUser = this.state.users.find(user => user.lastname + user.firstname === (lastname) );
        if (selectedUser) {
            this.setState({
                userid: selectedUser.userid
            })
        }
    }

    handleInputChange = e => {
        let { name, value } = e.target
        if (name === 'userid') {
            const user = this.state.users.find(user => user.lastname + user.firstname === value);
            if (user) value = user.userid;
        }
        this.setState({ [name]: value, errormessage: '' });
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row d-flex align-items-center justify-content-center form">

                    <div className="col-md-6 ">
                        <div className="card">
                            <div className="card-body">
                                <div className="text-center">
                                    <h3>SEARCH CUSTOMERS<i className="fa fa-search pl-5"></i> </h3>
                                </div> 
                                <div className="form-group m-5">
                                    <label htmlFor="name" className="font-weight-bold text-left sr-only">
                                        Search
                                    </label>
                                    <input list="name" name="user" id="user"
                                        onChange={this.handleInputChange} name="user" placeholder="Enter customer name to search" className="form-control"
                                        onChange={(e) => {
                                            this.getUser(e.target.value);
                                        }} />
                                    <datalist id="name">
                                        {
                                            this.state.users.map( (user,i) => <option key={i} value={user.lastname + user.firstname} />)
                                        }
                                    </datalist>

                                    <div>
                                        {this.state.userid === '' ?
                                            <span></span>
                                            :
                                            this.state.userid &&
                                            <div className="mt-5 text-center">
                                                <Link to={() => `/userprofile/${this.state.userid}`} >
                                                    <button className="btn btn-primary rounded-0 px-5" value={this.state.id} style={{ cursor: "pointer", fontSize: '16px' }}>View</button>
                                                </Link>
                                            </div>
                                        }
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12" >


                    </div>
                </div>




                {/* <div className="col-md-12" >
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
                                                            <Link to={() => `/viewClient/${client.userid}`} >
                                                                <span className="badge px-3 py-2 m-2 badge-primary" value={client.id} style={{cursor:"pointer"}}>View</span>
                                                            </Link>
                                                            <Link onClick={() => this.showdeleteModal(client.userid)}>
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
    
    
               */}

                {this.state.showmodal ?
                    <div id="myModal" className="modal">
                        {/* Modal content  */}
                        <div className="modal-content text-center p-5">
                            <i className="fa fa-exclamation-triangle fa-3x dark-red mb-2" aria-hidden="true"></i>
                            <h3>Are you sure?</h3>
                            <p> Do you really want to delete this file?</p>
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                    <button onClick={this.closeModal} className="btn-block btn btn-outline-secondary mb-2">Cancel</button>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <form id="deleteclient">
                                        <button onClick={() => this.deleteModal(this.state.id)} className="btn btn-danger btn-block">Delete</button>
                                    </form>
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
export default withContext(Users);
