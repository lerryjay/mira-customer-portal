import React, { Component } from 'react'
import {withContext} from '../../common/context';

class CreateProduct extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            name : '', 
            userid: '',
            description: '',
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
       const res = await this.state.createproduct(document.getElementById("createproduct"));
    
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

                    <form onSubmit={this.handleSubmit} id="createproduct"> 
                    
                            <div className="card">
                                <div className="card-header text-white">
                                    Add New Product
                    </div>
                    
                                <div className="card-body">

                            <div className="row">
                                <div className="col-md-12">
                                    { this.state.errormessage != null && this.state.errormessage.length > 0 ? 
                                        <div className="alert alert-warning" role="alert">{this.state.errormessage}
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
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

                                <div className="col-md-12 mb-1">
                                        <div className="form-group">
                                            <input type="text" className="form-control form-control-sm" name="userid"
                                                id="userid" placeholder="User ID" 
                                                value={this.state.userid} required
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-1">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Product Name</label>
                                            <input type="text" className="form-control form-control-sm" name="name"
                                                id="name" placeholder="Product Name" 
                                                value={this.state.name}
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Product Description</label>
                                            <textarea type="text" className="form-control form-control-sm" name="description"
                                                id="description" placeholder="Product Description"
                                                value={this.state.description}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-1"> 
                                    {this.state.imageError !== false ? 
                                        <div className="other_files mb-2">
                                            <i className="fa fa-trash" onClick={(e) => this.removeOtherImage(e)}></i>
                                            {this.state.file.name}
                                        </div>
                                        :
                                        <div className="imgPreview mb-2">
                                            <i className="fa fa-trash" onClick={(e) => this.removeImage(e)}></i>
                                                {imagePreview}
                                            </div>
                                       }
                                        <div className="form-group">
                                            <label htmlFor="" >Upload an Image</label> <br/>
                                            <input type="file" className="form-file form-file-sm" name="image"
                                                id="image" placeholder="" 
                                                onChange={(e)=>this.handleImageChange(e)} />
                                        </div>    
                                    </div>

                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="float-right">

                                    <button type="submit" className="btn btn-sm btn-primary">
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
export default withContext(CreateProduct);
