import React, { Component } from 'react';
import { withContext } from '../../common/context';
import { HTTPURL, APIKEY } from '../../common/global_constant';
import avatar from '../../assets/images/avatar.png'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            firstname: '',
            lastname: '',
            email: '',
            telephone: '',
            country: '',
            state:'',
        }
        console.log(this.props.user.lastname)
    }

    componentDidMount() {
        this.setState({
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            email: this.props.user.email,
            telephone: this.props.user.telephone,
            country: this.props.user.country,
            state: this.props.user.state,
        })
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
        this.setState({ loading: true });

        const headers = new Headers();
        headers.append('API-KEY', APIKEY);
        let form = new FormData(document.getElementById("profileform"));
        form.append("userid", this.state.user.userid);;


        fetch(HTTPURL + 'user/updateprofile', {
            method: 'POST',
            body: form,
            headers: headers
        })
            .then(response => response.json())
            .then(res => {
                setTimeout(() => {
                    this.setState({ loading: false });
                    if(res.status === true) {
                        this.state.showAlert("success", res.message)
                    } else{
                        this.state.showAlert("danger",  res.message)
                    }
                    setTimeout(() => {
                        this.setState({ alertActive : false});
                    }, 3000)
                }, 2000)
            });
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
            imagePreview = (<img src={imagePreviewUrl} className="imagePreview" alt=""/>);
            } 
        return (
            <div className="container mx-auto">
                  {this.state.loader && (
            <div className="spin-center">
              <span class="text-primary ">
                <span
                  class="spinner-grow spinner-grow-sm mr-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span style={{ fontSize: "14px" }}>Loading...</span>
              </span>
            </div>
          )}
           <div>
           </div>
           
           {!this.state.loader &&
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
                                            <input type="text" className="form-control form-control-sm" name="lastname" disabled
                                                id="lastname" value={this.state.lastname}  placeholder="Name" autoComplete="lastname" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group col-md-6 mb-3">
                                            <label htmlFor="" className="sr-only">Firstname</label>
                                            <input type="text" className="form-control form-control-sm" name="firstname" disabled
                                                id="firstname" value={this.state.firstname} placeholder="Name" autoComplete="firstname" onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="row">
                                            <div className="form-group col-md-6 mb-3">
                                                <label htmlFor="" className="sr-only">Email</label>
                                                <input type="text" className="form-control form-control-sm" name="email"
                                                    id="email" value={this.state.email} placeholder="johndoe@mail.com" disabled autoComplete="email" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="form-group col-md-6 mb-3">
                                                <label htmlFor="" className="sr-only">Phone-number</label>
                                                <input type="text" className="form-control form-control-sm" name="telephone"
                                                    id="telephone" value={this.state.telephone} placeholder="090 ......." disabled autoComplete="tel" onChange={this.handleInputChange} />
                                            </div>
                                        

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Country</label>
                                                <input type="text" className="form-control form-control-sm" name="country"
                                                    id="country" value={this.state.country} placeholder="Country" disabled autoComplete="country" onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">State</label>
                                                <input type="text" className="form-control form-control-sm" name="state"
                                                    id="state" value={this.state.state} placeholder="State" disabled autoComplete="state" onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                 

                                </div>

                                <div className="card-footer">
                                    <div className="text-center">
                                        {this.state.loading ?
                                            <button type="submit" className="btn btn-sm bg-btn btn-primary">
                                                <div className="spinner-border text-secondary" role="status" id="loader">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </button>
                                            :
                                            <button type="submit" className="btn btn-sm btn-primary py-2 px-5">
                                                Save
                                             </button>
                                        }
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
          }
             </div>
        )
    }

}

export default withContext(Profile);