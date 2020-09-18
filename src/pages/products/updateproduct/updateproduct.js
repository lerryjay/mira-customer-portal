import React, { Component } from 'react'
import {withContext} from '../../../common/context';
import { HTTPURL, APIKEY } from '../../../common/global_constant';
import placeholder from "../../../assets/images/product-placeholder.gif";

class UpdateProduct extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            name : '', 
            id: '',
            description: '',
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
            console.log(result, "result")
            if (result.status == true) {
                this.setState({ name: result.data.name, description: result.data.description, id: result.data.id})       
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
        form.append('files[]', this.state.file);

        fetch(HTTPURL + 'product/update', {
            method: 'POST',
            body: form,
            headers: headers
        })
        .then(response => response.json())
        .then(json => {
          this.props.history.goBack();
          return json;
        });

        setTimeout(() => {
            this.setState({loading : false});
            // this.setState({successmessage: 'Added Successfully!'})
            setTimeout(() =>{
                this.setState({successmessage: false});
                 this.setState({name: '', description: '', file: ''})
            }, 5000);
        }, 3000);
    
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

                <div className="col-md-8 mb-3 mt-4 box1" id="profile">
                 {/* Error Message */}
                { this.state.errormessage != null && this.state.errormessage.length > 0 ? 
                    <div className="alert alert-warning" role="alert" style={{position:'fixed', top: '70px' , right: '10px', zIndex:'4'}}>
                        {this.state.errormessage}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    :   <span></span>
                }

                    <form onSubmit={this.handleSubmit} id="createproduct"> 
                    
                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    EDIT PRODUCT 
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
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <div className="spinner-border text-secondary" role="status" id="loader">
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
                            {!this.state.imageurl ? 
                            <div className="card-body">
                                <img src={placeholder} alt=""   height="205px" width="250px" />

                            </div>

                            :
                               <div className="card-body">
                                <div className="imgPreview mb-2">
                                    <i className="fa fa-trash" onClick={(e) => this.removeImage(e)}></i>
                                        {imagePreview}
                                </div>
                            </div>
                            }
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