import React, { Component } from 'react';
import { withContext } from '../../common/context';
import { HTTPURL, APIKEY, FILEURL } from '../../common/global_constant';
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
            imageurl: '',
            isloading: true,
        }
    }

    componentDidMount() {
        this.state.showLoader();
        this.setState({
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            email: this.props.user.email,
            telephone: this.props.user.telephone,
            country: this.props.user.country,
            state: this.props.user.state,
            imageurl:this.props.user.imageurl,
            isloading: false,
        })
        this.state.hideLoader();
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

        let data = {
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            email: this.state.email,
            telephone: this.state.telephone,
            country: this.state.country,
            state: this.state.state
        }
        let form = document.getElementById("profileform")
        // const res =  await this.state.updateProfile(form);
        const res = await this.props.updateProfile(data,form )

        this.setState({ loading: false });
        
        if(res['status']){
            this.setState({ loading: false });
            this.state.showAlert("success", res.message)
        } else{
            this.state.showAlert("danger", res.message)
        }

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
    async handleImageUpdate(e) {
        let data = this.state.imageurl;
        let form = document.getElementById("imageForm")
        // const res =  await this.state.updateProfile(form);
        const res = await this.props.updateProfileImage(data,form )

        this.setState({ loading: false });
        
        if(res['status']){
            this.setState({ loading: false });
            this.setState({imageurl: res.data})
            this.state.showAlert("success", res.message)
        } else{
            this.state.showAlert("danger", res.message)
        }


        
        // const { user } = this.state;
        // const form = new FormData(document.getElementById('imageForm'));
        // form.append('userid', user.userid);
        // const headers = new Headers();
        // headers.append("API-KEY", APIKEY);
        // const res = await fetch(`${HTTPURL}user/updateimage`, {
        //   method: "POST",
        //   headers: headers,
        //   body: form
        // }).then(res => res.json());
        // if (res['status']) {
        //     this.state.user.imageurl = res.data
        //   this.state.showAlert("success", res.message)
        // }
        // else{
        //   this.state.showAlert("danger",  res.message)
        // }
      }

    render() {
        let {imagePreviewUrl} = this.state;
            let imagePreview = null;
            if (imagePreviewUrl) {
                this.props.user.imageurl = imagePreviewUrl
            imagePreview = (<img src={this.props.user.imageurl} className="imagePreview" alt=""/>);
            } 
        return (
            <div className="container mx-auto">
          
           {!this.state.isloading &&
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
                                                    id="country" value={this.state.country || ''} placeholder="Country" disabled autoComplete="country" onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">State</label>
                                                <input type="text" className="form-control form-control-sm" name="state"
                                                    id="state" value={this.state.state || ''} placeholder="State" disabled autoComplete="state" onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                 

                                </div>

                                <div className="card-footer">
                                    <div className="text-center">
                                        {this.state.loading ?
                                            <button type="submit" className="btn btn-sm  btn-primary">
                                                <div className="spinner-border text-white" role="status" id="loader">
                                                    <span className="sr-only text-white">Loading...</span>
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
                            <div className="card-body position-relative mb-5">
                                <form id="imageForm">
                                <img src={ avatar} alt="" className="image_sidebar"  height="170px" width="170px" style={{ marginTop: '-80px' }}/>

                                <label htmlFor="file" ><i className="fas fa-2x text-purple fa-camera-retro"></i> </label> 
                                <input style={{display:'none'}} type={"file"}  id="file" 
                                className="form-file form-file-sm" name="file"  placeholder=""
                                onChange={(e)=>this.handleImageChange(e)}
                                onChange={(e)=> this.handleImageUpdate(e)} />
                                </form>
                            </div>
                            : <div className="card-body position-relative mb-5">
                            <form id="imageForm">
                                <img className="image_sidebar" height="170px" width="170px"  style={{ marginTop: '-80px' }} src={FILEURL + this.props.user.imageurl} />
                            <label htmlFor="file" ><i className="fas fa-2x text-purple fa-camera-retro"></i> </label> 
                                <input style={{display:'none'}} type={"file"}  id="file" 
                                className="form-file form-file-sm" name="file"  placeholder=""
                                onChange={(e)=>this.handleImageChange(e)} 
                                onChange={(e)=> this.handleImageUpdate(e)}/>
                                </form>

                            </div>
                            }
                                
                        </div>
                    </div>


                </div>
          }
             </div>
        )
    }

}

export default withContext(Profile);