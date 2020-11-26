import React, { Component } from 'react'
import {withContext} from '../../../common/context';
import { HTTPURL, APIKEY, FILEURL } from '../../../common/global_constant';
import placeholder from "../../../assets/images/product-placeholder.gif";

class UpdateProduct extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            name : '', 
            id: '',
            description: '',
            imageurl:'',
            errormessage: '',
            loading: false,
            successmessage: '',
            file: '',
            imagePreviewUrl: '',
            imageError: false,
        };

    }

    componentDidMount() {
        this.getProduct();
    }

    getProduct() {
        const productid = this.props.location.pathname.split('/')[2];
        
        const headers = new Headers();
        headers.append('API-KEY', APIKEY );

        fetch(`${HTTPURL}product/getproduct?productid=${productid}&userid=${this.state.user.userid}`, {
            method: "GET",
            headers: headers,
        }).then(res => res.json())
        .then(result => {
            if (result.status) {
                this.setState({ name: result.data.name, description: result.data.description, id: result.data.id, imageurl: result.data.imageurl})       
            }
         
        })
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({loading : true});

        const headers = new Headers();
        headers.append('API-KEY', APIKEY);

        let form = new FormData();
        form.append("userid", this.state.user.userid);
        form.append("productid", this.state.id);
        form.append("name", this.state.name);
        form.append("description", this.state.description);
        form.append('file', this.state.file);

        fetch(HTTPURL + 'product/update', {
            method: 'POST',
            body: form,
            headers: headers
        })
        .then(response => response.json())
        .then(async data => {
          
            this.setState({ loading: false });
            if(data.status === true) {
                this.state.showAlert("success", data.message);
                await this.state.getProducts();
                this.props.history.goBack();

            } else{
                this.state.showAlert("danger",  data.message)
            }
        });
    
    }

    removeImage(e) {
        this.setState({imagePreviewUrl: ''})
    }

    removeOtherImage(e) {
        this.setState({ file: '',imageError : false})
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
            }  else{
                imagePreview = (<img src={FILEURL + this.state.imageurl} onError={(e) => { e.target.onerror = null; e.target.src = placeholder }} className="imagePreview"/>);
            }
        return (

            <div className="container mx-auto row">
                <div className="col-md-8 mb-3 mt-4 box1" id="profile">

                    <form onSubmit={this.handleSubmit} id="createproduct"> 
                    
                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    EDIT PRODUCT 
                    </div>
                    
                                <div className="card-body">

                            <div className="row">
                                <div className="col-md-12">
                                    {this.state.imageError !== false ?
                                        <div className="alert alert-warning"> { this.state.imageError } </div>
                                        : <span></span> }
                                </div>
                            </div>
                                <div className="row">

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


                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="float-right">

                                     {this.state.loading ? 
                                <button type="submit" className="btn btn-sm btn-primary">
                                    <div className="spinner-border text-white" role="status" id="loader">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </button>
                                : <button type="submit" className="btn btn-sm btn-primary px-3 py-2">
                                    <i className="fas fa-folder-open mr-2"></i>
                                        Save
                                    </button>
                                }

                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-md-4 text-center mt-4 box2" id='img-avatar'>
                <div className="card">
                 <div className="card-body">
                                <div className="imgPreview mb-2">
                                    {/* <i className="fa fa-trash" onClick={(e) => this.removeImage(e)}></i> */}
                                        {imagePreview}
                                </div>
                            </div>

                            <label htmlFor="file" className="btn btn-sm btn-primary py-2 px-3">Attach Image</label>
                                <input style={{display:'none'}} type={"file"}  id="file" 
                                className="form-file form-file-sm" name="file"  placeholder=""
                                onChange={(e)=>this.handleImageChange(e)} />
                                
                        </div>
                </div>
           
            </div>

        )
    }
}
export default withContext(UpdateProduct);
