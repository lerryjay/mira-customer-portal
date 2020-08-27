import React, { Component } from 'react';

class Chat extends Component {

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
            <div>
                   
        <div className="container-fluid mx-auto">
            <div className="row mt-4">

                <div className="col-md-10 offset-1 mb-3" id="profile">
                    <form action="">
                        <div className="card">
                            <div className="card-header bg-medium font-weight-bold text-dark">
                                VIEW TICKET
                <span className="float-right" id='edit' style={{ cursor: 'pointer' }} onClick={this.edit}><i className="fas fa-pen-square fa-2x"></i>
                                </span>
                            </div>
                            <div className="card-body">

                                <div className="row">


                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Email</label>
                                            <input type="email" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="johnDoe@mail.com" autoComplete="email" disabled />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Phone-number</label>
                                            <input type="tel" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="090 ......" autoComplete="tel" disabled />
                                        </div>
                                    </div>

                                    {/* <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company&nbsp;Name</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="Company Name" autoComplete="name" disabled />
                                        </div>
                                    </div> */}

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Personal&nbsp;Name</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="Name" autoComplete="name" disabled />
                                        </div>
                                    </div>

                                    {/* <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company&nbsp;Address</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="Company Address" autoComplete="text" disabled />
                                        </div>
                                    </div> */}

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <textarea id="message" name="message" rows="5" cols="50" className="form-control text-left" 
                                            value="Message is undefined" required placeholder="Message"
                                             />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Ticket&nbsp;Type</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="Complaint" placeholder="Ticket Type" autoComplete="text" disabled />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <select className="custom-select custom-select-sm">
                                                <option value="" selected disabled>--Select&nbsp;Status&nbsp;--</option>
                                                <option className="btn btn-sm text-success" value="approved">
                                                    &#10003;
                                                    Approved</option>
                                                <option className="btn btn-sm text-danger" value="cancelled">
                                                    &#1008;
                                                    Cancelled</option>
                                                <option className="btn btn-sm btn-light text-warning" value="pending">
                                                    &#10070;
                                                    Pending</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Image</label>
                                            <input type="file" className="form-file form-file-sm" name=""
                                                id="" placeholder="" />
                                        </div>
                                    </div>

                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="float-right">

                                    <button className="btn btn-sm btn-primary">
                                        <i className="fas fa-folder-open mr-1"></i>
                        Save
                    </button>
                                   &nbsp; <button className="btn btn-sm btn-danger" type="reset">
                                        <i className="fas fa-trash mr-1"></i>
                        Delete
                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
        
          </div>
        </div>
                
            </div>
        );
    }
}

export default Chat;

