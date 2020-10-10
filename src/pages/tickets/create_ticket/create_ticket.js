/* eslint-disable eqeqeq */
import React, { Component } from 'react';

import { HTTPURL, APIKEY } from '../../../common/global_constant';
import { withContext } from '../../../common/context';
import pdf_placeholder from "../../../assets/images/pdf.png";

class create_ticket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
            title: '',
            type: '',
            message: '',
            customerid: '',
            loading: false,
            files: [],
            users: [],
            previews: '',
            imagePreviewUrl: '',
            successmessage: ''
        };
    }

    handleInputChange = e => {
        let { name, value } = e.target
        if (name === 'customerid') {
            const user = this.state.users.find(user => user.firstname + ' ' + user.lastname === value);
            if (user) value = user.userid;
        }
        this.setState({ [name]: value, errormessage: '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        this.setState({ loading: true });

        const headers = new Headers();
        headers.append('API-KEY', APIKEY);
        let form = new FormData(document.getElementById("createticket"));
        form.append("userid", this.state.user.userid);

        this.state.files.length < 1 && form.delete('files[]');
        if (this.state.user.role == 'admin') {
            if (form.get('customerid').length < 1) this.state.showAlert('danger','Please select a client to creaate a ticket');
            else {
                const customer = form.get('customerid');
                const user = this.state.users.find(user => user.firstname + ' ' + user.lastname === customer);
                if (user) form.set('customerid', user.userid);
            }
        }
        
        fetch(HTTPURL + 'ticket/add', {
            method: 'POST',
            body: form,
            headers: headers
        }).then(response => response.json())
        .then(result => { 
                this.setState({ loading: false });
                if(result.status === true) {
                    this.setState({ loading: false });
                    this.state.showAlert("success", result.message)
                    this.setState({ imagePreviewUrl: '', title: '', type: '', message: '', customerid: '', file: []})
                } else{
                    this.setState({ loading: false });
                    this.state.showAlert("danger",  result.message)
                }
        })
    }

    removeImage = (e) => {
        e.preventDefault();
        this.setState({imagePreviewUrl: '', imageurl: '', files: []})
    }

    removeOtherImage(e) {
        this.setState({ file: '', imageError: false, imagePreviewUrl: ''  })
    }

    handleImageChange(e) {
        e.preventDefault();

        let files = [];

        for (let i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i])
        }

        this.setState({ files: files });
    }


    async getUsers() {
        const headers = new Headers();
        headers.append('API-KEY', APIKEY);
        const res = await fetch(HTTPURL + `user?userid=${this.props.user.userid}`, {
            headers: headers
        })
            .then(response => response.json());
        if (res['status']) {
            this.setState({ users: res['data'] });
        }
    }

    componentDidMount() {
        this.props.user.role === 'admin' && this.getUsers();
    }

    render() {
        let files = this.state.files.map((file, index) => {
            // this.state.imagePreviewUrl = URL.createObjectURL(file)
            // this.setState({imagePreviewUrl: URL.createObjectURL(file) })
            return (
                file.name.match(/\.(jpg|jpeg|png)$/) 
                     ?  <img src={URL.createObjectURL(file)} className="col-md-3" alt="attachment"/>
                     : <span>
                            <img
                                alt="pdf placeholder"
                                src={pdf_placeholder}
                                style={{ width: "100px", height: "100px" }}
                                className="m-2"
                            />
                            <br/>
                            {file.name}
                        </span>
            )
            // return (
            //     file.name.match(/\.(jpg|jpeg|png)$/)
            //         ? < div className="imgPreview  m-2" id="files">
            //             <i className="fa fa-trash position-absolute" onClick={(e) => this.removeImage(e,file,index)}></i>
            //             <img src={this.state.imagePreviewUrl} className="col-md-3" />
            //         </div>
            //         :
            //         <div className="other_files   m-2" id="otherfiles" >
            //             <i className="fa fa-trash" onClick={(e) => this.removeOtherImage(e)}></i>
            //             {file.name}
            //         </div>
            // )
        })
        return (
            <div className="container text-white mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-10 " id="profile">
                        <form onSubmit={this.handleSubmit} id="createticket" encType="multipart/form-data">
                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    CREATE TICKET
                            </div>
                                <div className="card-body">
                                    <div className="row">


                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <select onChange={this.handleInputChange} name="type" id="type" 
                    className="custom-select custom-select-md"
                    defaultValue=""
                                                       >
                                                         <option value="">-- Select&nbsp;Ticket&nbsp;Type --</option>
                                                    <option value="complaint" >Complaint</option>
                                                    <option value="enquiry">Enquiry</option>
                                                    <option value="support">Support</option>
                                                </select>
                                            </div>
                                        </div>
                                        {
                                            this.state.user.role == 'admin' &&
                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <input list="customers" name="customerid" id="customerid" onChange={this.handleInputChange} placeholder="Enter customer name" className="form-control" />
                                                    <datalist id="customers">
                                                        {
                                                            this.state.users.map( (user,i) => <option key={i} value={user.firstname + ' ' + user.lastname} />)
                                                        }
                                                    </datalist>

                                                </div>
                                            </div>
                                        }


                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-md" name="title"
                                                    id="title" placeholder="Title"
                                                    value={this.state.title} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>


                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <textarea id="message" name="message" rows="5" cols="50" className="form-control text-left"
                                                    value={this.state.message}  placeholder="Message"
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="row justify-content-center position-relative" id="preview">
                                            {files}
                                        </div>
                                    </div>


                                </div>

                                <div className="card-footer">
                                    <label htmlFor="files" className="btn btn-sm btn-primary py-2 px-3">Attach File</label>
                                    <i className="font-weight-bold"> The only accepted files are *pdf, *jpg and *png</i>
                                    <input style={{ display: 'none' }} type={"file"} id="files"
                                        className="form-file form-file-sm" name="files[]" placeholder="" multiple
                                        onChange={(e) => this.handleImageChange(e)} />
                                    <div className="float-right">
                                        {this.state.loading ?
                                            <button type="submit" className="btn btn-sm btn-primary">
                                                <div className="spinner-border text-white" role="status" id="loader">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </button>
                                            :
                                            <button type="submit" className="btn btn-sm btn-primary py-2 px-3">
                                                <i className="fas fa-folder-open  mr-2"></i>
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

export default withContext(create_ticket);