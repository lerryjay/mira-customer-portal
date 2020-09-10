import React, { Component } from 'react';
import { withContext } from '../../../common/context';
import { HTTPURL } from '../../../common/global_constant';
import avatar from '../../../assets/images/avatar.png'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            fullname: ''
        }
        console.log(this.props.user.lastname)
    }
    
    editp() {
        // Make Form Editable
        const edit = document.querySelector('#edit');
        let input = document.getElementsByTagName('input');

        for (let d = input.length - 1; d >= 0; d--) {
            edit.addEventListener("click", function (e) {
                input[d].removeAttribute("disabled");
            });
        };
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value });
    }

    handleSubmit = async e => {
        e.preventDefault()

        const headers = new Headers();
        headers.append('API-KEY', '97899c-7d0420-1273f0-901d29-84e2f8');
        let form = new FormData(document.getElementById("profileform"));


        fetch(HTTPURL + 'user/updateprofile', {
            method: 'POST',
            body: form,
            headers: headers
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                return json;
            });

        console.log('Profile Updated!')
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
                this.props.user.imageurl = true
            imagePreview = (<img src={imagePreviewUrl} className="imagePreview"/>);
            } 
        return (
            <div className="container mx-auto">
                <div className="row mt-4">

                    <div className="col-md-8 box1 mb-3" id="profile">

                        <form id="profileform" onSubmit={this.handleSubmit}>
                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    Profile Information
                                    <span className="float-right" id='edit' style={{ cursor: 'pointer' }} onClick={this.editp}><i className="fas fa-pen-square fa-2x"></i>
                                    </span>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-md-6 mb-3">
                                            <label htmlFor="" className="sr-only">Lastname</label>
                                            <input type="text" className="form-control form-control-sm" name="fullname"
                                                id="fullname" value={this.props.user.lastname}  placeholder="Name" autoComplete="fullname" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group col-md-6 mb-3">
                                            <label htmlFor="" className="sr-only">Firstname</label>
                                            <input type="text" className="form-control form-control-sm" name="fullname"
                                                id="fullname" value={this.props.user.firstname} placeholder="Name" autoComplete="fullname" onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="row">
                                            <div className="form-group col-md-6 mb-3">
                                                <label htmlFor="" className="sr-only">Email</label>
                                                <input type="text" className="form-control form-control-sm" name="email"
                                                    id="email" value={this.props.user.email} placeholder="johndoe@mail.com" disabled autoComplete="email" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="form-group col-md-6 mb-3">
                                                <label htmlFor="" className="sr-only">Phone-number</label>
                                                <input type="text" className="form-control form-control-sm" name="telephone"
                                                    id="telephone" value={this.props.user.telephone} placeholder="090 ......." disabled autoComplete="tel" onChange={this.handleInputChange} />
                                            </div>
                                        

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Country</label>
                                                <input type="text" className="form-control form-control-sm" name="country"
                                                    id="country" value="" placeholder="Country" disabled autoComplete="country" onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">State</label>
                                                <input type="text" className="form-control form-control-sm" name="state"
                                                    id="state" value="" placeholder="State" disabled autoComplete="state" onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                 

                                </div>

                                <div className="card-footer">
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-sm btn-primary py-2 px-5">
                                            Save
                                         </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-4 text-center box2 mb-3" id='profilePix'>
                        <div className="card">
                            <div className="card-header">
                            </div>
                            {!this.props.user.imageurl ? 
                            <div className="card-body">
                                <img src={avatar} alt="" className="image_sidebar"  height="inherit" width="170px" style={{ marginTop: '-80px' }}/>

                            </div>
                            : <div className="card-body">
                                <div className="image_sidebar" alt="" height="110px" width="110px" style={{ marginTop: '-80px' }} >
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
            </div>
        )
    }

}

export default withContext(Profile);