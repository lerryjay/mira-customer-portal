import React from 'react'

export default function TicketList() {
    return (
        <div className="container">
            <div className="row mt-4">

                <div className="col-md-12 mb-3" id="profile">
                    <form action="">
                        <div className="card home-chart">
                            <div className="card-header text-white">
                                Ticket List
            </div>
                            <div className="card-body">

                                <div id='table' className="card pt-2 mt-3 justify-content-center shadow px-2">
                                    <div className="table-responsive">
                                        <table
                                            className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-white home-chart">
                                            <caption>Hello World!</caption>
                                            <thead>
                                                <th>S/N</th>
                                                <th>Date&nbsp;&&nbsp;Time</th>
                                                <th>Client&nbsp;Name</th>
                                                <th>Email&nbsp;Address</th>
                                                <th>Ticket&nbsp;Type</th>
                                                <th><i className="fas fa-comments"></i>&nbsp;&nbsp;Message</th>
                                                <th>Status</th>
                                                <th>View&nbsp;Ticket</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>2020&nbsp;-&nbsp;08&nbsp;-&nbsp;17&nbsp;/&nbsp;09:15:56
                                    </td>
                                                    <td>John&nbsp;Doe</td>
                                                    <td>john@mail.com</td>
                                                    <td>Complaint</td>
                                                    <td>Lorem ipsum dolor sit amet consectetur, adipisicing
                                        elit. Ducires...!</td>
                                        <td className="align-middle">
                                                        <button
                                                            className="btn btn-sm btn-success d-none"><i
                                                                className="fas fa-check-double">Approved</i></button>
                                                        <button
                                                            className="btn btn-sm btn-danger"><i
                                                                className="fas fa-times">Cancelled</i></button>
                                                        <button className="btn btn-sm btn-warning d-none"><i
                                                            className="fas fa-comments">Pending</i></button>
                                                    </td>
                                                    <td className="align-middle"><i className="fas fa-eye" data-toggle="modal"
                                                        data-target="#viewTicket"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>2020&nbsp;-&nbsp;08&nbsp;-&nbsp;17&nbsp;/&nbsp;09:15:56
                                    </td>
                                                    <td>doe&nbsp;jane</td>
                                                    <td>doe@mail.com</td>
                                                    <td>Enquiry</td>
                                                    <td>Lorem ipsum dolor sit amet consectetur, adipisicing
                                        elit. Ducires...!</td>
                                        <td className="align-middle">
                                                        <button
                                                            className="btn btn-sm btn-success"><i
                                                                className="fas fa-check-double">Approved</i></button>
                                                        <button
                                                            className="btn btn-sm btn-danger d-none"><i
                                                                className="fas fa-times">Cancelled</i></button>
                                                        <button className="btn btn-sm btn-warning d-none"><i
                                                            className="fas fa-comments">Pending</i></button>
                                                    </td>
                                                    <td className="align-middle"><i className="fas fa-eye" data-toggle="modal"
                                                        data-target="#viewTicket"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>2020&nbsp;-&nbsp;08&nbsp;-&nbsp;17&nbsp;/&nbsp;09:15:56
                                    </td>
                                                    <td>jane&nbsp;Doe</td>
                                                    <td>jane@mail.com</td>
                                                    <td>Suggestion</td>
                                                    <td>Lorem ipsum dolor sit amet consectetur, adipisicing
                                        elit. Ducires...!</td>
                                        <td className="align-middle">
                                                        <button
                                                            className="btn btn-sm btn-success d-none"><i
                                                                className="fas fa-check-double">Approved</i></button>
                                                        <button
                                                            className="btn btn-sm btn-danger d-none"><i
                                                                className="fas fa-times">Cancelled</i></button>
                                                        <button className="btn btn-sm btn-warning"><i
                                                            className="fas fa-comments">Pending</i></button>
                                                    </td>
                                                    <td className="align-middle"><i className="fas fa-eye" data-toggle="modal"
                                                        data-target="#viewTicket"></i></td>
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
