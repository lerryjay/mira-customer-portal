import React from 'react'
import { Link } from "react-router-dom";

export default function ListClient() {
    return (
        <div className="container-fluid">
            <div className="row mt-4">

                <div className="col-md-12 mb-3" id="profile">
                    <form action="">
                        <div className="card">
                            <div className="card-header text-dark font-weight-bold">
                                List Client
            </div>
                            <div className="card-body">

                                <div id='table' className="card pt-2 mt-3 justify-content-center shadow px-2">
                                    <div className="table-responsive">
                                        <table
                                            className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark">
                                           
                                            <thead>
                                                <tr>
                                                    <th><i className="fas fa-image">&nbsp;Image</i></th>
                                                    <th>Name</th>
                                                    <th>Email&nbsp;Address</th>
                                                    <th>Telephone</th>
                                                    <th>Company&nbsp;Name</th>
                                                    <th>View&nbsp;Client</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="align-middle"><img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt=""
                                                        width="30" /></td>
                                                        <td>Jane Doe</td>
                                                    <td>JohnDoe@mail.com</td>
                                                        <td>0900000000</td>
                                                        <td>John and Sons</td>
                                                    <td>
                                                    <Link to="/viewClient">
                                                    <span class="badge px-3 py-2 badge-primary" style={{cursor:"pointer"}}>View</span>
                                                    </Link>
                                                    </td>
                           
                                                </tr>
                                                <tr>
                                                    <td className="align-middle"><img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt=""
                                                        width="30" /></td>
                                                        <td>Jane Doe</td>
                                                    <td>JohnDoe@mail.com</td>
                                                        <td>0900000000</td>
                                                        <td>John and Sons</td>
                                                    <td>
                                                    <Link to="/viewClient">
                                                    <span class="badge px-3 py-2 badge-primary" style={{cursor:"pointer"}}>View</span>
                                                    </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="align-middle"><img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt=""
                                                        width="30" /></td>
                                                        <td>Jane Doe</td>
                                                    <td>JohnDoe@mail.com</td>
                                                        <td>0900000000</td>
                                                        <td>John and Sons</td>
                                                    <td>
                                                    <Link to="/viewClient">
                                                    <span class="badge px-3 py-2 badge-primary" style={{cursor:"pointer"}}>View</span>
                                                    </Link>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>


                            </div>

                        
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
