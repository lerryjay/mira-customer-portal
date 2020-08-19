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
                                            <tr>
                                            <th>S/N</th>
                                                <th>Date&nbsp;&&nbsp;Time</th>
                                                <th>Client&nbsp;Name</th>
                                                <th>Email&nbsp;Address</th>
                                                <th>Ticket&nbsp;Type</th>
                                                <th><i className="fas fa-comments"></i>&nbsp;&nbsp;Message</th>
                                                <th>Status</th>
                                                <th>View&nbsp;Ticket</th>
                                            </tr>
                                                
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
       
            <div className="overlay"></div>

<div className="modal fade" id="viewTicket" tabIndex="-1" role="dialog" aria-labelledby="viewTicketTitle"
    aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form action="">
                    <div className="card">
                        <div className="card-header h6">
                            Create Ticket
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="" className="">Email</label>
                                        <input type="text" className="form-control form-control-sm" name="" id=""
                                            value="Johndoe@mail.com" placeholder="" disabled/>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="" className="">Subject</label>
                                        <input type="text" className="form-control form-control-sm" name="" id=""
                                            value="John" placeholder="" disabled/>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="type" className="">Ticket&nbsp;Type</label>
                                        <select name="type" id="type" className="form-select form-select-sm" disabled>
                                            <option value="" defaultValue disabled>--Select&nbsp;Ticket&nbsp;Type--
                                            </option>
                                            <option value="complaint">complaint</option>
                                            <option value="request">Request</option>
                                            <option value="enquiry">Enquiry</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea id="message" name="message" rows="10" cols="50"
                                            className="form-control text-left" disabled>

                                    </textarea>
                                    </div>
                                </div>

                            </div>


                        </div>

                    </div>
                </form>
            </div>

        </div>
    </div>
</div>
        </div>
    )
}
