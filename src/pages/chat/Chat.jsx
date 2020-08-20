import React from 'react'

export default function Chat() {

    const fileChange = () => {


        const file = document.querySelector("#file-upload");

        file.onchange = function () {
            document.querySelector("#file-name").textContent = this.files[0].name;
        }

    }
    //   multiple
        // const fileChange = function() {
        //     var input = document.getElementById('file-upload');
        //     var output = document.getElementById('file-name');

        //     output.innerHTML = '<ul>';
        //     for (var i = 0; i < input.files.length; ++i) {
        //       output.innerHTML += '<li>' + input.files.item(i).name + '</li>';
        //     }
        //     output.innerHTML += '</ul>';
        //   }
    
    return (
        <div className="container mx-auto mt-md-5 shadow" id="profile">
            <div className="card home-chart mt-md-4">
                <div className="card-header text-white">
                    Ticket Chat
                </div>


                <div className="card-body" style={{ overflowY: 'scroll', minHeight: '400px', maxHeight: '450px' }}>
                    <div id="chat">
                        <div className="row mb-2" id="client">
                            <div className="col-md-7 col-sm-12 p-2 bg-light">
                                hello
                                <br />
                                <small>John Doe</small>
                            </div>
                            <div className="col-md-5 col-sm-12 p-2">

                            </div>
                        </div>
                        <div className="row my-2" id="admin">
                            <div className="col-md-5 col-sm-12 p-2">

                            </div>
                            <div className="col-md-7 col-sm-12 p-2 bg-secondary text-right text-white">
                                world
                                <br />
                                <small>Admin<span>29-04-06</span></small>
                            </div>
                        </div>
                        <div className="row my-2" id="admin">
                            <div className="col-md-5 col-sm-12 p-2">

                            </div>
                            <div className="col-md-7 col-sm-12 p-2 bg-secondary text-right text-white">
                                Okay
                                <br />
                                <small>Admin<span>&nbsp;29-04-06,&nbsp;18:46</span></small>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 col-sm-12 p-2 bg-light">
                                hello
                                <br />
                                <small>John Doe</small>
                            </div>
                            <div className="col-md-6 col-sm-12 p-2">

                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-6 col-sm-12 p-2">

                            </div>
                            <div className="col-md-6 col-sm-12 p-2 bg-secondary text-right text-white">
                                world
                                <br />
                                <small>Admin<span>29-04-06</span></small>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 col-sm-12 p-2 bg-light">
                                hello
                                <br />
                                <small>John Doe</small>
                            </div>
                            <div className="col-md-6 col-sm-12 p-2">

                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-6 col-sm-12 p-2">

                            </div>
                            <div className="col-md-6 col-sm-12 p-2 bg-secondary text-right text-white">
                                world
                                <br />
                                <small>Admin<span>29-04-06</span></small>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 col-sm-12 p-2 bg-light">
                                hello
                                <br />
                                <small>John Doe</small>
                            </div>
                            <div className="col-md-6 col-sm-12 p-2">

                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-6 col-sm-12 p-2">

                            </div>
                            <div className="col-md-6 col-sm-12 p-2 bg-secondary text-right text-white">
                                world
                                <br />
                                <small>Admin<span>29-04-06</span></small>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 col-sm-12 p-2 bg-light">
                                hello
                                <br />
                                <small>John Doe</small>
                            </div>
                            <div className="col-md-6 col-sm-12 p-2">

                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-6 col-sm-12 p-2">

                            </div>
                            <div className="col-md-6 col-sm-12 p-2 bg-secondary text-right text-white">
                                world
                                <br />
                                <small>Admin<span>29-04-06</span></small>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="card-footer p-0">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#0a0b18', border: '#191a35' }} id="chat">
                                <label className="custom-file-upload" htmlFor="file-upload">
                                    <i className="fas fa-paperclip fa-fw text-white" style={{ cursor: 'pointer' }} onClick={fileChange}></i>
                                </label>
                                <input id="file-upload" name='upload_cont_img' type="file" style={{ display: 'none' }} />
                            </span>
                        </div>
                        <input type="text" className="form-control border-right-0" placeholder="Message" aria-label="chat" aria-describedby="chat" />
                        <div className="input-group-append">
                            <span className="input-group-text bg-white" id="chat">
                                <i className="fas fa-paper-plane fa-fw" style={{ cursor: 'pointer', color: '#0a0b18' }}></i>
                            </span>
                        </div>
                    </div>
                    <label id="file-name" className="text-white"></label>
                </div>
            </div>
        </div>
    )
}


// #fileUpload