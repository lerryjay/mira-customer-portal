import React, { Component } from 'react'
import { Link } from "react-router-dom";
import avatar from '../../assets/images/avatar.png'
import { withContext } from '../../common/context';
import { HTTPURL, APIKEY } from '../../common/global_constant';

class Clients extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.props,
            showmodal: true,
            loading: true,
            clients: [],
            id: '',
            user_id: ''
        }

    }

    async componentDidMount() {
        this.state.showLoader();
        await this.getClients();
        this.setState({ loading: false });
        this.state.hideLoader();
    }

    getClient(businessname) {
        const selectedClient = this.state.clients.find(client => client.businessname === businessname);
        if (selectedClient) {
            this.setState({
                user_id: selectedClient.user_id
            })
        }
    }

    async getClients() {
        const headers = new Headers();
        headers.append('API-KEY', APIKEY);
        const res = await fetch(HTTPURL + `clients/?userid=${this.state.user.userid}`, {
            method: 'GET',
            headers: headers
        }).then(response => response.json());

        if (res['status']) this.setState({ clients: res['data'] })
    }

    showdeleteModal(e) {
        // this.state.id = e
        let modal = document.getElementById("myModal")
        modal.style.display = "block";
    }

    async deleteModal(id) {


        const { user } = this.state;
        let clientid = id;

        const form = new FormData(document.getElementById('deleteclient'));
        form.append('userid', user.userid);
        form.append('clientid', clientid);
        form.append('deleteuser', true);

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);

        const res = await fetch(`${HTTPURL}clients/delete`, {
            method: "POST",
            headers: headers,
            body: form
        }).then(res => res.json());
    }

    closeModal() {
        let modal = document.getElementById("myModal")
        modal.style.display = "none";
    }

    handleInputChange = e => {
        let { name, value } = e.target
        if (name === 'businessid') {
            const client = this.state.clients.find(client => client.businessname === value);
            if (client) value = client.clientid;
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
                                    <h3>SEARCH CLIENT<i className="fa fa-search pl-5"></i> </h3>
                                </div> 
                                <div className="form-group m-5">
                                    <label htmlFor="business" className="font-weight-bold text-left sr-only">
                                        Search
                                    </label>
                                    <input list="business" name="businessid" id="businessid"
                                        onChange={this.handleInputChange} name="businessid" placeholder="Enter business name to search" className="form-control"
                                        onChange={(e) => {
                                            this.getClient(e.target.value);
                                        }} />
                                    <datalist id="business">
                                        {
                                            this.state.clients.map((client,i) => <option key={i} value={client.businessname} />)
                                        }
                                    </datalist>

                                    <div>
                                        {this.state.user_id === '' ?
                                            <span></span>
                                            :
                                            this.state.user_id &&
                                            <div className="mt-5 text-center">
                                                <Link to={() => `/viewClient/${this.state.user_id}`} >
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
                                                            <Link to={() => `/viewClient/${client.user_id}`} >
                                                                <span className="badge px-3 py-2 m-2 badge-primary" value={client.id} style={{cursor:"pointer"}}>View</span>
                                                            </Link>
                                                            <Link onClick={() => this.showdeleteModal(client.user_id)}>
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
export default withContext(Clients);
