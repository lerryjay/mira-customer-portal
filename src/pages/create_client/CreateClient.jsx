import React, { Component } from 'react'

export default class CreateClient extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (

            <div class="container mx-auto row">

                <div class="col-md-10 mb-3 mt-4" id="profile">
                    <form action="">
                        <div class="card">
                            <div class="card-header text-white">
                                Add Client
                </div>
                            <div class="card-body">

                                <div class="row">

                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <label htmlFor="" class="sr-only">Email</label>
                                            <input type="text" class="form-control form-control-sm" name=""
                                                id="" value="Johndoe@mail.com" placeholder="" />
                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <label htmlFor="" class="sr-only">Phone-number</label>
                                            <input type="text" class="form-control form-control-sm" name=""
                                                id="" value="00000000000000" placeholder="" />
                                        </div>
                                    </div>


                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <label htmlFor="" class="sr-only">Company&nbsp;Name</label>
                                            <input type="text" class="form-control form-control-sm" name=""
                                                id="" value="John" placeholder="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <label htmlFor="" class="sr-only">Peronal&nbsp;Name</label>
                                            <input type="text" class="form-control form-control-sm" name=""
                                                id="" value="Doe" placeholder="" />
                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <label htmlFor="" class="sr-only">Company&nbsp;Address</label>
                                            <input type="text" class="form-control form-control-sm" name=""
                                                id="" value="No 6 Hello World close" placeholder="" />
                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <label htmlFor="" class="sr-only">Image</label>
                                            <input type="file" class="form-file form-file-sm" name=""
                                                id="" placeholder="" />
                                        </div>
                                    </div>

                                </div>


                            </div>

                            <div class="card-footer">
                                <div class="float-right">

                                    <button class="btn btn-sm btn-primary">
                                        <i class="fas fa-folder-open"></i>
                            Save
                        </button>&nbsp;
                                    <button class="btn btn-sm btn-danger" type="reset">
                                        <i class="fas fa-history"></i>
                            Reset
                        </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}
