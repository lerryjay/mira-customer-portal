import React, { Component } from 'react'

import { withContext } from '../../../common/context';
import { HTTPURL, APIKEY, FILEURL } from '../../../common/global_constant';
import placeholder from "../../../assets/images/product-placeholder.gif";

class CreateClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
            title: '',
            description: '',
            cost: '',

            errormessage: '',
            loading: false,
            successmessage: '',
            file: '',
            imagePreviewUrl: '',
            imageError: false,
        };
    }
    
    async componentDidMount(){
        this.state.showLoader();
        this.setState({ loading : false  });
        this.state.hideLoader();
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value, errormessage: '' });
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({ loading: true });

            let myHeaders = new Headers();
            myHeaders.append("api-key", APIKEY);

            var formdata = new FormData();
            formdata.append("title", this.state.title);
            formdata.append("description", this.state.description);
            formdata.append("cost", this.state.cost);
            formdata.append("userid", this.state.user.userid);
            formdata.append('image', this.state.file);

            fetch(`${HTTPURL}training/addcourse`, {
                method: "POST",
                headers: myHeaders,
                body: formdata
            }).then(response => response.json()).
                then(result => {
                    this.setState({ loading: false });
                        if(result.status === true) {
                            this.state.showAlert("success", result.message);
                            this.props.history.push('/courses');
                                this.setState({
                                    title: '', description: '', cost: '',
                            });
                        } else{
                            this.state.showAlert("danger",  result.message)
                        }
                })


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
            <div className="container">
                <div className="row justify-content-center  mt-4">
                <div className="col-md-8">
                <div className="row">
                                <div className="col-md-12">
                                    {this.state.imageError !== false ?
                                        <div className="alert alert-warning"> { this.state.imageError } </div>
                                        : <span></span> }
                                </div>
                            </div>

                        <form onSubmit={this.handleSubmit} id="createclient">

                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    REGISTER COURSE
                                </div>

                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Title</label>
                                                <input type="text" className="form-control form-control-sm" name="title"
                                                    id="title" placeholder="Course Title"
                                                    value={this.state.title} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Description</label>
                                                <input type="text" className="form-control form-control-sm" name="description"
                                                    id="description" placeholder="Course Description"
                                                    value={this.state.description} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Cost</label>
                                                <input type="text" className="form-control form-control-sm" name="cost"
                                                    id="cost" placeholder="Cost"
                                                    value={this.state.cost} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="card-footer">
                                    <div className="text-center">
                                        {this.state.loading ?
                                            <button type="submit" className="btn btn-sm btn-primary px-4">
                                                <div className="spinner-border text-white" role="status" id="loader">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </button>
                                            : <button type="submit" className="btn btn-sm btn-primary px-3">
                                                <i className="fas fa-folder-open mr-2"></i>
                                        Save
                                    </button>
                                        }


                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4 text-center box2" id='img-avatar'>
                <div className="card">
                 <div className="card-body">
                                <div className="imgPreview mb-2" style={{height:'240px'}}>
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
                </div>

        )
    }
}
export default withContext(CreateClient);
