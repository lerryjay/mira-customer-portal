import React, { Component } from 'react';
import {withContext} from '../../common/context';

class Profile extends Component{
    constructor(props){
        super(props);
    }

     edit() {
        // Make Form Editable
        let edit = document.querySelector('#edit');
        let input = document.getElementsByTagName('input');


        for (let d = input.length - 1; d >= 0; d--) {
            edit.addEventListener("click", function (e) {
                input[d].removeAttribute("disabled");
            });
        };
    }

   render() {
    return (
        <div className="container mx-auto">
        {this.props.profile.map(profile => 
            <div className="row mt-4">

                <div className="col-md-8 mb-3" id="profile">
                    <form action="">
                        <div className="card">
                            <div className="card-header text-white">
                                Profile Information
                <span className="float-right"  id='edit' style={{ cursor: 'pointer' }} onClick={this.edit()}><i className="fas fa-pen-square fa-2x"></i>
                                </span>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Name</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value={profile.fullname} placeholder="Name" disabled autoComplete="name" />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Email</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value={profile.email} placeholder="johndoe@mail.com" disabled autoComplete="email" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Phone-number</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value={profile.telephone} placeholder="090 ......." disabled autoComplete="tel" />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company&nbsp;Name</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="john & Sons" disabled autoComplete="name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company&nbsp;Address</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="lorem lorem lorem" disabled autoComplete="name" />
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Name</label>
                                            <input type="file" className="file form-control-sm" name=""
                                                id="" value="" placeholder=""/>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="card-footer">
                                <div className="float-right">

                                    <button className="btn btn-sm btn-primary px-3">
                                        <i className="fas fa-folder-open pr-2"></i>
                        Save
                    </button>
                                
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-md-4 text-center" id='profilePix'>
                    <div className="card">
                        <div className="card-header">
                        </div>
                        <div className="card-body">
                            <img src="https://miratechnologiesng.com/img/icons/miraicon.png"
                                alt="profile picture" className="img-fluid" style={{ marginTop: '-80px' }} />
                                <h6 className="mt-3">{profile.name} </h6>
                                <p className="mt-2"><i class="fa fa-map-marker" aria-hidden="true"></i> Lagos <br/>
                                <i class="fa fa-envelope" aria-hidden="true"></i> {profile.email} </p>
                        </div>
                    </div>
                </div>

       
            </div>
                 )}
        </div>
    )
   }

}

export default withContext(Profile);