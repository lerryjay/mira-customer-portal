import React, { Component } from 'react';
import { withContext } from '../../../common/context';
import { HTTPURL, APIKEY,ADMINPERMISSIONS } from "../../../common/global_constant";
import avatar from '../../../assets/images/avatar.png'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            loading: false,
            users: [],
            selectedUser: {
                permissions : []
            },
            permissions: ADMINPERMISSIONS,
            selectedPermissions: [],
            successmessage: ''
        }
        console.log(this.props.user.lastname)
    }

    componentDidMount()
    {
      this.getAdmins();
    }

    async getAdmins()
    {
      const adminid = this.props.location.pathname.split("/")[2];
      const headers = new Headers();
      headers.append('API-KEY',APIKEY);
      const res = await fetch(HTTPURL + `admin?userid=${ this.props.user.userid }`, {
          headers: headers
      })
      .then(response => response.json());
      console.log(res['data'])
      if(res['status']){
          this.setState({ users : res['data']});

        // Admin's Profile info
        const selectedUser = this.state.users.find(
            (item) => item.adminid === adminid
        );
        await this.setState({ selectedUser });
      }
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

    handleCheck = ({ target }) => {
        if (target.checked) {
          target.removeAttribute("checked");
          this.addPermission(target.value);
        } else {
          target.setAttribute("checked", true);
          this.removePermission(target.value);
        }

        const index = this.state.user.permissions.findIndex(item=> item === target.value);
        const { user } = this.state;
        if (index > -1) {
            user.permissions.splice(index,1);
        } else {
            user.permissions.push(target.value);
        }
        this.setState({ user });

      }

      addPermission = async (value) => {
        await this.setState((prevState) => ({
          selectedPermissions:
            prevState.selectedPermissions.length == 0
              ? [value]
              : [...prevState.selectedPermissions, value],
        }));
        console.log(this.state.selectedPermissions, "addPermission")
      };


      removePermission = async (value) => {
        await this.setState((prevState) => ({
            selectedPermissions: prevState.selectedPermissions.filter(
            (perm) => perm != value
          ),
        }));
        console.log(this.state.selectedPermissions, "removePermission")
      };

      
    setPermission = (e) =>{
        e.preventDefault();
        this.setState({ loading: true });

        let data = this.state.selectedPermissions;
        let adminid = this.props.location.pathname.split("/")[2]

        this.state.updateAdminPermission(data, adminid )
        
        setTimeout(() => {
            this.setState({ loading: false });
            this.setState({successmessage:"Permission Updated Successfully"});
            setTimeout(() => {
                this.setState({successmessage: false});
            }, 2000)
        }, 2000)
        
        
        
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
            {/* Success Message */}
            { this.state.successmessage ? 
                <div className="alert alert-success" role="alert" style={{position:'fixed', top: '70px' , right: '10px', zIndex:'4'}}>
                    <span className="mt-3">{this.state.successmessage}</span>
                </div>
                :   <span></span>
            }
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
                                                id="fullname" value={this.state.selectedUser.lastname}  placeholder="Name" autoComplete="fullname" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group col-md-6 mb-3">
                                            <label htmlFor="" className="sr-only">Firstname</label>
                                            <input type="text" className="form-control form-control-sm" name="fullname"
                                                id="fullname" value={this.state.selectedUser.firstname} placeholder="Name" autoComplete="fullname" onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="row">
                                            <div className="form-group col-md-6 mb-3">
                                                <label htmlFor="" className="sr-only">Email</label>
                                                <input type="text" className="form-control form-control-sm" name="email"
                                                    id="email" value={this.state.selectedUser.email} placeholder="johndoe@mail.com" disabled autoComplete="email" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="form-group col-md-6 mb-3">
                                                <label htmlFor="" className="sr-only">Phone-number</label>
                                                <input type="text" className="form-control form-control-sm" name="telephone"
                                                    id="telephone" value={this.state.selectedUser.telephone} placeholder="090 ......." disabled autoComplete="tel" onChange={this.handleInputChange} />
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
          
                <div className="row mt-4">
                    <div className="col-md-12 mb-4">
                    <form id="permissions" onSubmit={this.setPermission}>
                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    Set and manage permissions for this user
                                    <span className="float-right" id='edit' style={{ cursor: 'pointer' }} ><i className="fas fa-pen-square fa-2x"></i>
                                    </span>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                    {
                                    this.state.permissions.map((permission) => (
                                        <div className="col-md-3">
                                          <p className="list-group-item px-2" style={{ fontSize: "12px"}}>
                                            {permission.name}{" "}
                                            <label className="switch float-right">
                                              {" "}
                                              <input
                                                type="checkbox"
                                                value={permission.name}
                                                onClick={this.handleCheck}
                                                checked={ this.state.selectedUser.permissions.findIndex(item=>item === permission.name) > -1}
                                              />
                                              <span className="slider round"></span>
                                            </label>
                                          </p>
                                        </div>
                                    ))
                                    }
                                    </div>
                                </div>

                                  <div className="card-footer">
                                    <div className="text-center">
                                    {this.state.loading ? (
                                    <button type="submit" className="btn btn-sm btn-primary px-4">
                                        <div className="spinner-border text-secondary " role="status" id="loader">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                     
                                    ) : (
                                        <button type="submit" className="btn btn-sm btn-primary py-2 px-5">
                                            Save
                                         </button>
                                        )}
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

export default withContext(Profile);