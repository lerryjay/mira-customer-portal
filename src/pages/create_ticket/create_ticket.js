import React, { Component } from 'react';

import {withContext} from '../../common/context';

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
            imagePreviewUrl: ''
        };
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        console.log('changed successfully!')
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

        let reader = new FileReader();
        let files = [];
        // console.log(typeof e.target.files, "rubbish")
        // let files = [];
        for (let i = 0;i < e.target.files.length; i++){
            files.push(e.target.files[i])
        //     if(file.name.match(/\.(jpg|jpeg|png|gif)$/)){
        //         let image = reader.readAsDataURL(file);
        //         console.log(file.name,"file name",image)
        //     }else{
        //         // docs.push(file);
        //         document.querySelector("#preview").insertAdjacentHTML('beforeend',`<div class="other_files mb-2">
        //         <i class="fa fa-trash" onClick="${(e) => this.removeOtherImage(e)}"></i>
        //         ${file.name}
        //         </div>`);
        //     }
        }

        // let previews = '';
        // let images = [];
        // let docs = [];

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
            <div className="row">

                <div className="col-md-12" id="profile">
                    <form onSubmit={this.handleSubmit}>


                        <div className="card">
                            <div className="card-header">
                                Create Ticket
                                <i class="fa fa-tachometer-alt"></i>
                            </div>
                            <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
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
                                    

                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-sm" name="title"
                                            id="title" placeholder="Title" 
                                            value={this.state.title} required
                                            onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <input type="text" className="form-control form-control-sm" name="userid"
                                                id="userid" placeholder="User ID" 
                                                value={this.state.userid} required
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <select name="customerid" id="customerid" className=" form-control form-select form-select-sm">
                                                <option value="" selected disabled>--Select&nbsp;CustomerID&nbsp;--</option>
                                                <option value="complaint">complaint</option>
                                                <option value="request">Request</option>
                                                <option value="enquiry">Enquiry</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <select name="type" id="type" className=" form-control form-select form-select-sm">
                                                    <option value="" selected disabled>--Select&nbsp;Ticket&nbsp;Type--</option>
                                                    <option value="complaint">complaint</option>
                                                    <option value="request">Request</option>
                                                    <option value="enquiry">Enquiry</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <select name="product" id="product" className=" form-control form-select form-select-sm">
                                                    <option value="" selected disabled>--Select&nbsp;Product &nbsp;--</option>
                                                    <option value="complaint">complaint</option>
                                                    <option value="request">Request</option>
                                                    <option value="enquiry">Enquiry</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <select name="package" id="package" className=" form-control form-select form-select-sm">
                                                    <option value="" selected disabled>--Select&nbsp;Package&nbsp;--</option>
                                                    <option value="complaint">complaint</option>
                                                    <option value="request">Request</option>
                                                    <option value="enquiry">Enquiry</option>
                                                </select>
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
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Image</label>
                                            <input type="file" className="form-file form-file-sm" name="image"
                                                 placeholder="" multiple
                                                onChange={(e)=>this.handleImageChange(e)} />
                                        </div>  
                                    </div>
                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="float-right">

                                    <button className="btn btn-sm btn-primary mr-2">
                                        <i className="fas fa-folder-open"></i>
                                        Save
                                    </button>
                                    <button className="btn btn-sm btn-danger" type="reset">
                                        <i className="fas fa-history"></i>
                                        Reset
                                    </button>
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