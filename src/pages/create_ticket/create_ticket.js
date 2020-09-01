import React, { Component } from 'react';
import { HTTPURL } from '../../common/global_constant';
import {withContext} from '../../common/context';
import './createticket.css'

class create_ticket extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            title : '' , 
            userid: '',
            customerid: '',
            type: '',
            product: '',
            package: '',
            message: '',
            loading: false, 
            files: [],
            previews: '',
            imagePreviewUrl: '',
            successmessage: ''
        };
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        this.setState({loading : true});

        const headers = new Headers();
        headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
        let form = new FormData(document.getElementById("createticket"));

        this.state.files.forEach(item=>{
            form.append('files[]', item);
        })

        fetch(HTTPURL + 'ticket/add', {
            method: 'POST',
            body: form,
            headers: headers
        })
        .then(response => response.json())
        .then(json => {
        console.log(json);
        return json;
        });
         

        setTimeout(() => {
            this.setState({loading : false});
            this.setState({successmessage: 'Ticket Created Successfully'})
            setTimeout(() => this.setState({successmessage: false}), 5000);
        }, 3000);
        // const res = await this.state.createticket(document.getElementById("createticket"));
        this.setState({title : '', package: '', type: '', message: '', product: ''});
    

        
    }
    
    removeImage(e) {
        console.log(e, "Image removed")
        this.setState({imagePreviewUrl: ''})
    }

    removeOtherImage(e) {
        console.log(e, "Image removed")
        this.setState({ file: '',imageError : false})
        setTimeout(()=> this.setState({imageError: ''}),5000);
        // let myElement = document.querySelector(".other_files");
        // myElement.style.display = "none";
    }
    handleImageChange(e) {
        e.preventDefault();

        let files = [];
        // console.log(typeof e.target.files, "rubbish")
        // let files = [];
        for (let i = 0;i < e.target.files.length; i++){
            files.push(e.target.files[i])
        }

        this.setState({ files :  files });
    }

    render() {
        let files = this.state.files.map( file=> {
            this.state.imagePreviewUrl = URL.createObjectURL(file)
            return (
             file.name.match(/\.(jpg|jpeg|png|gif)$/)
                ?< div className="imgPreview m-2" id="files">
            <i className="fa fa-trash" onClick={(e) => this.removeImage(e)}></i>
            <img src={this.state.imagePreviewUrl} className="imagePreview" />
            </div> : <div className="other_files m-2" id="otherfiles" >
            <i className="fa fa-trash" onClick={(e) => this.removeOtherImage(e)}></i>
                {file.name}
            </div>
        )} )
        return (
            <div className="container-fluid content text-white">
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
            <div className="row">

                <div className="col-md-8 offset-2" id="profile">
                    <form onSubmit={this.handleSubmit} id="createticket" encType="multipart/form-data">


                        <div className="card">
                            <div className="card-header bg-medium font-weight-bold text-dark">
                                CREATE TICKET
                            </div>
                            <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* Error Message */}
                                    { this.state.errormessage != null && this.state.errormessage.length > 0 ? 
                                        <div className="alert alert-warning" role="alert">{this.state.errormessage}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>
                                        : 
                                        <span></span>
                                        }
                                </div>
                            </div>
                                <div className="row">
                                    
                                    
                                <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <select onChange={this.handleInputChange} name="type" id="type" className=" form-control form-select form-select-sm">
                                                    <option value="" selected disabled>--Select&nbsp;Ticket&nbsp;Type--</option>
                                                    <option value="Complaint">Complaint</option>
                                                    <option value="Request">Request</option>
                                                    <option value="Enquiry">Enquiry</option>
                                                </select>
                                            </div>
                                        </div>
                                
                                <div className="col-md-12 mb-3">
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-sm" name="title"
                                            id="title" placeholder="Title" 
                                            value={this.state.title} required
                                            onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                
                                        
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <textarea id="message" name="message" rows="5" cols="50" className="form-control text-left" 
                                            value={this.state.message} required placeholder="Message"
                                            onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                    
                                    <div className="images">
                                        { files }
                                    </div>
                                </div>


                            </div>

                            <div className="card-footer">
                                <label htmlFor="files" className="btn btn-sm btn-primary py-2 px-3">Attach File</label>
                                <input style={{display:'none'}} type={"file"}  id="files" 
                                className="form-file form-file-sm" name="files[]"  placeholder="" multiple
                                onChange={(e)=>this.handleImageChange(e)} />
                                <div className="float-right">
                                {this.state.loading ? 
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <div className="spinner-border text-secondary" role="status" id="loader">
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