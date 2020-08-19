import React from 'react'

export default function CreateUser() {



        return (
            <div className="container">

                    <div className="row mt-4 mx-auto">

                        <div className="col-md-12" id="profile">
                            <form action="">
                                <div className="card">
                                    <div className="card-header text-white">
                                        Create User
                                    </div>
                                    <div className="card-body">

                                        <div className="row">

                                            
                                            <div className="col-md-6 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="" className="sr-only">Name</label>
                                                    <input type="text" className="form-control form-control-sm" name=""
                                                        id="" value="" placeholder="First Name" />
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-6 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="" className="sr-only">Name</label>
                                                    <input type="text" className="form-control form-control-sm" name=""
                                                        id="" value="" placeholder="Last Name" />
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="" className="sr-only">Email</label>
                                                    <input type="email" className="form-control form-control-sm" name=""
                                                        id="" value="" placeholder="johnDoe@mail.com" />
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="" className="sr-only">Phone-number</label>
                                                    <input type="text" className="form-control form-control-sm" name=""
                                                        id="" value="" placeholder="090 ..........." />
                                                </div>
                                            </div>

                                        </div>


                                    </div>

                                    <div className="card-footer">
                                        <div className="float-right">

                                            <button className="btn btn-sm btn-primary">
                                                <i className="fas fa-folder-open"></i>
                    Save
                </button>
                &nbsp;<button className="btn btn-sm btn-danger" type="reset">
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
