import React from 'react'

export default function Profile() {
    const edit = () => {
        // Make Form Editable
        let edit = document.querySelector('#edit');
        let input = document.getElementsByTagName('input');


        for (let d = input.length - 1; d >= 0; d--) {
            edit.addEventListener("click", function (e) {
                input[d].removeAttribute("disabled");
            });
        };
    }
    return (
        <div className="container mx-auto">
            <div className="row mt-4">

                <div className="col-md-9 mb-3" id="profile">
                    <form action="">
                        <div className="card">
                            <div className="card-header text-white">
                                Profile Information
                <span className="float-right" id='edit' style={{cursor: 'pointer'}} onClick={edit}><i className="fas fa-pen-square fa-2x"></i>
                                </span>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Name</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="First Name" disabled autoComplete="name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Name</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="Last Name" disabled autoComplete="name" />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Email</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="johndoe@mail.com" disabled autoComplete="email" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Phone-number</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="090 ......." disabled autoComplete="tel" />
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

                <div className="col-md-3 text-center" id='profilePix'>
                    <div className="card">
                        <div className="card-header py-5">
                        </div>
                        <div className="card-body">
                            <img src="https://miratechnologiesng.com/img/icons/miraicon.png"
                                alt="profile picture" className="img-fluid" style= {{ marginTop: '-80px' }} />
                            <p className="text-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Repudiandae veniam ullam excepturi natus perspiciatis distinctio amet error
                            nostrum
                voluptas at accusamus,.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
