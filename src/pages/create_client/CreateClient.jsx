import React, { Component } from 'react'

import Validators  from "../../common/Validators";
import {withContext} from '../../common/context';
import { HTTPURL } from '../../common/global_constant';

class CreateClient extends Component {
    constructor(props){
        super(props);
       
        this.state = { 
            ...this.props, 
            email : '', 
            telephone : '' , 
            name: '',
<<<<<<< HEAD
            // company: '',
            // companyadr: '',
            errormessage: '',
            // file: '',
            // imagePreviewUrl: '',
=======
            businessname: '',
           
            errormessage: '',
            loading: false, 
            successmessage: '',
>>>>>>> 20660585eeaf6f7ff7ace8b4752e6df21848b9d6
            imageError: false,
        };
        console.log(this.state);
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
            this.setState({loading : true});
            setTimeout(() => {
                this.setState({loading : false});
                this.setState({errormessage: err});
                setTimeout(()=> this.setState({errormessage: ''}),5000);
            }, 3000);
        }else{
<<<<<<< HEAD
            await this.setState({loading : true});
            setTimeout(() =>this.setState({loading : false}), 3000);
           const res = await this.state.createclient(document.getElementById("createclient"));
            console.log('submitting')
        }
    }

    // removeImage(e) {
    //     console.log(e, "Image removed")
    //     this.setState({imagePreviewUrl: ''})
    // }

    // removeOtherImage(e) {
    //     console.log(e, "Image removed")
    //     this.setState({ file: '',imageError : false})
    //     setTimeout(()=> this.setState({imageError: ''}),5000);
    //     // let myElement = document.querySelector(".other_files");
    //     // myElement.style.display = "none";
    // }
    // handleImageChange(e) {
    //     e.preventDefault();

    //     let reader = new FileReader();
    //     let file = e.target.files[0];

    //     let images = []
    //     for (var i = 0; i < e.target.files.length; i++) {
    //         images[i] = e.target.files.item(i);
    //     }
    //     images = images.filter(file => file.name.match(/\.(jpg|jpeg|png|gif)$/))
        
    //     if (images.length === 0){

    //         reader.onloadend = () => {
    //             this.setState({
    //                 file: file,
    //                 imagePreviewUrl: '',
    //                 imageError: "Upload a valid Image"
    //             });
                
                
    //         }
            
            
    //     } else {
    //         this.setState({imageError: false})
    //             reader.onloadend = () => {
    //                 this.setState({
    //                     file: file,
    //                     imagePreviewUrl: reader.result
    //                 });
    //             }
    //         }

    //     reader.readAsDataURL(file)
    // }
=======
            this.setState({ loading: true });
            let myHeaders = new Headers();
            myHeaders.append("api-key", this.state.apiKey);

            var formdata = new FormData();
            formdata.append("email", this.state.email);
            formdata.append("businessname", this.state.businessname);
            formdata.append("telephone", this.state.telephone);
            formdata.append("name", this.state.name);
            formdata.append("userid", this.props.userId);
            
            fetch(`${HTTPURL}clients/add`, {
                method: "POST",
                headers: myHeaders,
                body:formdata
            }).then(response => response.json()).
                then(result => {
                    if (result.status) {
                        setTimeout(() => {
                            this.setState({ loading: false });
                            this.setState({ successmessage: 'Added Successfully!' })
                            setTimeout(() => {
                                this.setState({ successmessage: false });
                                // const res = this.state.createclient(document.getElementById("createclient"));
                                console.log('submitting')
                                this.setState({ name: '', email: '', telephone: '' })
                            }, 5000);
                        }, 3000);
                    } else {
                        this.setState({ loading: true });
                        setTimeout(() => {
                            this.setState({ loading: false });
                            this.setState({ errormessage: result.message });
                            setTimeout(() => this.setState({ errormessage: '' }), 5000);
                        }, 3000);   
                    }
                  
                })

           
        }
    }

    addClient() {
        
    }
>>>>>>> 20660585eeaf6f7ff7ace8b4752e6df21848b9d6


    render() {
<<<<<<< HEAD
        // let {imagePreviewUrl} = this.state;
        //     let imagePreview = null;
        //     if (imagePreviewUrl) {
        //     imagePreview = (<img src={imagePreviewUrl} className="imagePreview" alt="preview"/>);
        //     } 
=======
>>>>>>> 20660585eeaf6f7ff7ace8b4752e6df21848b9d6
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

                <div className="col-md-8 offset-2 mb-3 mt-4" id="profile">
                    {/* Error Message */}
                    { this.state.errormessage != null && this.state.errormessage.length > 0 ? 
                        <div className="alert alert-warning" role="alert">
                            {this.state.errormessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        :   <span></span>
                    }

                    {/* Image Error */}
                    {this.state.imageError !== false ?
                        <div className="alert alert-warning" role="alert">
                            <span className="mt-3">{ this.state.imageError }</span>
                            <button type="button" class="close ml-4" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        : <span></span> 
                    }

                    <form onSubmit={this.handleSubmit} id="createclient"> 
                    
                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    ADD CLIENT
                    </div>
                    
                                <div className="card-body">

                                <div className="row">

                                    {/* <div className="col-md-12 mb-3">
                                        <div className="form-group">
<<<<<<< HEAD
                                            <label htmlFor="" className="sr-only">Telephone</label>
                                            <input type="text" className="form-control form-control-sm" name="telephone"
                                                id="telephone" placeholder="00000000000000"
                                                value={this.state.telephone}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>


                                    {/* <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company&nbsp;Name</label>
                                            <input type="text" className="form-control form-control-sm" name="company"
                                                id="company" placeholder="John" />
                                        </div>
                                    </div> */}
                                   <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Peronal&nbsp;Name</label>
                                            <input type="text" className="form-control form-control-sm" name="name"
                                                id="name" placeholder="Doe"
                                                value={this.state.name}
=======
                                            <label htmlFor="" className="sr-only">User ID</label>
                                            <input type="text" className="form-control form-control-sm" name="userid"
                                                id="userid" placeholder="UserID" required
                                                value={this.state.userid}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                         */}
                                   <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Peronal&nbsp;Name</label>
                                            <input type="text" className="form-control form-control-sm" name="name"
                                                id="name" placeholder="Enter Fullname"
                                                value={this.state.name} required
>>>>>>> 20660585eeaf6f7ff7ace8b4752e6df21848b9d6
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

<<<<<<< HEAD
                                    {/*  <div className="col-md-6 mb-3">
=======
                                    <div className="col-md-12 mb-3">
>>>>>>> 20660585eeaf6f7ff7ace8b4752e6df21848b9d6
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Email</label>
                                            <input type="text" className="form-control form-control-sm" name="email"
                                                id="email" placeholder="Enter Email" 
                                                value={this.state.email} required
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div> */}

<<<<<<< HEAD
                                    {/* <div className="col-md-6 mb-3"> 
                                    {this.state.imageError !== false ? 
                                        <div className="other_files mb-2">
                                            <i className="fa fa-trash" onClick={(e) => this.removeOtherImage(e)}></i>
                                            {this.state.file.name}
=======
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Telephone</label>
                                            <input type="text" className="form-control form-control-sm" name="telephone"
                                                id="telephone" placeholder="Phone no." required
                                                value={this.state.telephone}
                                                onChange={this.handleInputChange} />
>>>>>>> 20660585eeaf6f7ff7ace8b4752e6df21848b9d6
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
<<<<<<< HEAD
                                            <label htmlFor="" className="sr-only">Image</label>
                                            <input type="file" className="form-file form-file-sm" name="image"
                                                id="image" placeholder="" 
                                                onChange={(e)=>this.handleImageChange(e)} />
                                        </div>    
                                    </div> */}
=======
                                            <label htmlFor="" className="sr-only">Business Nmae</label>
                                            <input type="text" className="form-control form-control-sm" name="businessname"
                                                id="businesname" placeholder="Business Name" required
                                                value={this.state.businessname}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
>>>>>>> 20660585eeaf6f7ff7ace8b4752e6df21848b9d6

                                </div>


                            </div>

                            <div className="card-footer">
<<<<<<< HEAD
                                <div className="float-right">

                                    <button type="submit" className="btn btn-sm btn-primary">
                                        <i className="fas fa-folder-open"></i>
                            Save
                        </button>&nbsp;
                                    <button className="btn btn-sm btn-danger" type="reset">
                                        <i className="fas fa-history"></i>
                            Reset
                        </button>
=======
                                <div className="text-center">
                                {this.state.loading ? 
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <div className="spinner-border text-secondary" role="status" id="loader">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </button>
                                : <button type="submit" className="btn btn-sm btn-primary px-3">
                                    <i className="fas fa-folder-open mr-2"></i>
                                        Save
                                    </button>
                                }

                                    
>>>>>>> 20660585eeaf6f7ff7ace8b4752e6df21848b9d6
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
