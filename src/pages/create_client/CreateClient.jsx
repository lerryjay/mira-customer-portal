import React, { Component } from 'react'

import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';

class CreateClient extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            email : '', 
            number : '' , 
            name: '',
            company: '',
            companyadr: '',
            errormessage: '',
            file: '',
            imagePreviewUrl: '',
            imageError: false,
        };
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()

        const { email} = this.state

        if(!Validators.validateEmail(email).status){
            const err = Validators.validateEmail(email).message
            this.setState({errormessage: err});
            setTimeout(()=> this.setState({errormessage: ''}),5000);
        }else{
            console.log('submitting')
        }
    }

    removeImage(e) {
        console.log(e, "Image removed")
        this.setState({imagePreviewUrl: ''})
    }

<<<<<<< HEAD
            <div className="container-fluid row">

                <div className="col-lg-10 mb-3 mt-4 mx-auto" id="profile">
                    <form action="">
                        <div className="card">
                            <div className="card-header text-white">
                                Add Client
                </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Email</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="Johndoe@mail.com" />
=======
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
        let file = e.target.files[0];

        let images = []
        for (var i = 0; i < e.target.files.length; i++) {
            images[i] = e.target.files.item(i);
        }
        images = images.filter(file => file.name.match(/\.(jpg|jpeg|png|gif)$/))
        
        if (images.length === 0){

            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: '',
                    imageError: "Upload a valid Image"
                });
                
                
            }
            
            
        } else {
            this.setState({imageError: false})
                reader.onloadend = () => {
                    this.setState({
                        file: file,
                        imagePreviewUrl: reader.result
                    });
                }
            }

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
            let imagePreview = null;
            if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} className="imagePreview"/>);
            } 
        return (

            <div className="container mx-auto row">

                <div className="col-md-10 mb-3 mt-4" id="profile">

                    <form onSubmit={this.handleSubmit}> 
                    
                            <div className="card">
                                <div className="card-header text-white">
                                    Add Client
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

                                    {this.state.imageError !== false ?
                                        <div className="alert alert-warning"> { this.state.imageError } </div>
                                        : <span></span> }
                                </div>
                            </div>
                                <div className="row">
                               
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Email</label>
                                            <input type="text" className="form-control form-control-sm" name="email"
                                                id="email" placeholder="Johndoe@mail.com" 
                                                value={this.state.email}
                                                onChange={this.handleInputChange}/>
>>>>>>> auth
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Phone-number</label>
<<<<<<< HEAD
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="0900000000000000" />
=======
                                            <input type="text" className="form-control form-control-sm" name="number"
                                                id="number" placeholder="00000000000000"
                                                value={this.state.number}
                                                onChange={this.handleInputChange} />
>>>>>>> auth
                                        </div>
                                    </div>


                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company&nbsp;Name</label>
<<<<<<< HEAD
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="Company Name" />
=======
                                            <input type="text" className="form-control form-control-sm" name="company"
                                                id="company" placeholder="John" />
>>>>>>> auth
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Peronal&nbsp;Name</label>
<<<<<<< HEAD
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="Personal Name" />
=======
                                            <input type="text" className="form-control form-control-sm" name="name"
                                                id="name" placeholder="Doe" />
>>>>>>> auth
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company&nbsp;Address</label>
<<<<<<< HEAD
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="Company Address" />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Image</label>
                                            <input type="file" className="form-file form-file-sm" name=""
                                                id="" placeholder="" />
=======
                                            <input type="text" className="form-control form-control-sm" name="companyadr"
                                                id="companyadr" placeholder="No 6 Hello World close" />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3"> 
                                    {this.state.imageError !== false ? 
                                        <div className="other_files mb-2">
                                            <i className="fa fa-trash" onClick={(e) => this.removeOtherImage(e)}></i>
                                            {this.state.file.name}
>>>>>>> auth
                                        </div>
                                        :
                                        <div className="imgPreview mb-2">
                                            <i className="fa fa-trash" onClick={(e) => this.removeImage(e)}></i>
                                                {imagePreview}
                                            </div>
                                       }
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Image</label>
                                            <input type="file" className="form-file form-file-sm" name="image"
                                                id="image" placeholder="" 
                                                onChange={(e)=>this.handleImageChange(e)} />
                                        </div>    
                                    </div>

                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="float-right">

                                    <button className="btn btn-sm btn-primary">
                                        <i className="fas fa-folder-open"></i>
                            Save
                        </button>&nbsp;
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

        )
    }
}
export default withContext(CreateClient);
