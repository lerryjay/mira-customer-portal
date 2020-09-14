import React, { Component } from 'react'

import image from '../../../assets/images/userid.png'
import profile from '../../../assets/images/profile.png'
import { Link } from "react-router-dom";
import {withContext} from '../../../common/context';

class AddClient extends Component {
 

    render() {
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-md-8 offset-2">
                        <div className="row pt-3">
                            
                            <div className="col pt-3">
                            <div className="card text-center products">
                                <div className="card-body">
                                    <h5 className="card-title">From Existing Users</h5>
                                <img src={image} className="image_product" alt="" />
                                    <Link to='/createclientbyid'>
                                        <span class="badge px-3 py-2 badge-primary" style={{ cursor: "pointer", fontSize: 'medium' }}>Continue</span>
                                    </Link>
                                </div>
                            </div>
                            </div>

                            <div className="col pt-3">
                            <div className="card text-center products">
                                <div className="card-body">
                                    <h5 className="card-title">Setup New Profile</h5>
                                <img src={profile} className="image_product" alt="" />
                                    <Link to='/createclient'>
                                        <span class="badge px-3 py-2 badge-primary" style={{ cursor: "pointer", fontSize: 'medium' }}>Continue</span>
                                    </Link>
                                </div>
                            </div>
                            </div>
              
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default withContext(AddClient);
