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
            isloading: true,
            clients: [],
            id: '',
            user_id: ''
        }

    }

    async componentDidMount() {
        this.state.showLoader();
        await this.getClients();
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

        if (res['status']) this.setState({ clients: res['data'] , isloading: false})
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
                {!this.state.isloading &&
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

                                    }

            


            </div>
        )
    }
}
export default withContext(Clients);
