import React from 'react'

export default function ListClient() {
    return (
        <div className="container-fluid">
            <div className="row mt-4">

                <div className="col-md-12 mb-3" id="profile">
                    <form action="">
                        <div className="card">
                            <div className="card-header text-white">
                                List Client
            </div>
                            <div className="card-body">

                                <div id='table' className="card pt-2 mt-3 justify-content-center shadow px-2">
                                    <div className="table-responsive">
                                        <table
                                            className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-white">
                                            <caption>Hello World!</caption>
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Date&nbsp;&&nbsp;Time</th>
                                                    <th>Email&nbsp;Address</th>
                                                    <th>Telephone</th>
                                                    <th>Company&nbsp;Name</th>
                                                    <th>Personal&nbsp;Name</th>
                                                    <th>Contact&nbsp;Address</th>
                                                    <th><i className="fas fa-image">&nbsp;Image</i></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>2020&nbsp;-&nbsp;08&nbsp;-&nbsp;17&nbsp;/&nbsp;09:15:56</td>
                                                    <td>JohnDoe@mail.com</td>
                                                    <td>0900000000</td>
                                                    <td>John and Sons</td>
                                                    <td>Jane Doe</td>
                                                    <td>No. 5, lorem ipsum lagos</td>
                                                    <td className="align-middle"><img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt=""
                                                        width="30" /></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="float-right">

                                    <button className="btn btn-sm btn-primary">
                                        <i className="fas fa-folder-open"></i>
                        Save
                    </button>&nbsp;
                    <button className="btn btn-sm btn-danger" type="reset">
                                        <i className="fas fa-history"></i>
                        Reset
                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
