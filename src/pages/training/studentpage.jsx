import React, { Component } from 'react'

import image from '../../assets/images/addstudent.png'
import profile from '../../assets/images/liststudent.png'
import { Link } from "react-router-dom";
import {withContext} from '../../common/context';

class StudentPage extends Component {
 

    render() {
        return (
            <div className="container ">
            <div className="row justify-content-center ">
                <div className="col-md-8">
                    <div className="row justify-content-center pt-3">
                            
                            <div className="col pt-3">
                            <div className="card text-center products">
                                <div className="card-body">
                                    <h5 className="card-title">Add New Student</h5>
                                <img src={image} className="image_product" alt="" />
                                    <Link to='/addstudent'>
                                        <span className="btn btn-primary" style={{ cursor: "pointer", fontSize: 'medium' }}>Continue</span>
                                    </Link>
                                </div>
                            </div>
                            </div>

                            <div className="col pt-3">
                            <div className="card text-center products">
                                <div className="card-body">
                                    <h5 className="card-title">All Students</h5>
                                <img src={profile} className="image_product" alt="" />
                                    <Link to='/students'>
                                        <span className="btn  btn-primary" style={{ cursor: "pointer", fontSize: 'medium' }}>Continue</span>
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
export default withContext(StudentPage);
