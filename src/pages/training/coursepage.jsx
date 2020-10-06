import React, { Component } from 'react'

import image from '../../assets/images/addstudent.png'
import profile from '../../assets/images/liststudent.png'
import { Link } from "react-router-dom";
import {withContext} from '../../common/context';

class CoursePage extends Component {
 

    render() {
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-md-8 offset-2">
                        <div className="row pt-3">
                            
                            <div className="col pt-3">
                            <div className="card text-center products">
                                <div className="card-body">
                                    <h5 className="card-title">Add New Course</h5>
                                <img src={image} className="image_product" alt="" />
                                    <Link to='/addcourse'>
                                        <span class="btn btn-primary" style={{ cursor: "pointer", fontSize: 'medium' }}>Continue</span>
                                    </Link>
                                </div>
                            </div>
                            </div>

                            <div className="col pt-3">
                            <div className="card text-center products">
                                <div className="card-body">
                                    <h5 className="card-title">All Courses</h5>
                                <img src={profile} className="image_product" alt="" />
                                    <Link to='/courses'>
                                        <span class="btn  btn-primary" style={{ cursor: "pointer", fontSize: 'medium' }}>Continue</span>
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
export default withContext(CoursePage);
