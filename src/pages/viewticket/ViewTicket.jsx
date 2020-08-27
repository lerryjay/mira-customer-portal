import React, { Component } from 'react'

export default class ViewTicket extends Component {
    constructor(props) {
        super(props)

        this.state = {
              inputfiles : [],
              chats: [
                  {
                      "role": "Admin",
                      "date": "8:40 AM, Today",
                      "message": "hello, thanks for reaching out!",
                  },
                  {
                      "name": "John Doe",
                      "date": "8:53 AM, Today",
                      "message": "consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae",
                  },
                  {
                      "name": "John Doe",
                      "date": "8:54 AM, Today",
                      "message": "consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae",
                  },
                  {
                      "role": "Admin",
                      "date": "8:56 AM, Today",
                      "message": "Lorem ipssum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?",
                  },
                  {
                      "name": "John Doe",
                      "date": "9:00 AM, Today",
                      "message": "consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae",
                  },
                  {
                      "role": "Admin",
                      "date": "9:01 AM, Today",
                      "message": "consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae",
                  },
                  {
                      "name": "John Doe",
                      "date": "9:02 AM, Today",
                      "message": "consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae",
                  },
                  {
                      "role": "Admin",
                      "date": "9:02 AM, Today",
                      "message": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?",
                  },
                  {
                      "name": "John Doe",
                      "date": "9:04 AM, Today",
                      "message": "consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae!",
                  },
                  {
                      "role": "Admin",
                      "date": "9:06 AM, Today",
                      "message": "consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae",
                  },
                  {
                      "name": "John Doe",
                      "date": "9:10 AM, Today",
                      "message": "Thanks for resolving it!",
                  }
              ]   
        }

        this.fileChange = this.fileChange.bind(this);
    }

    fileChange = function () {
        let input = document.getElementById('file-upload');
        let inputfiles = [];
        for (let index = 0; index < input.files.length; index++) {
            inputfiles.push(input.files[index]);
            console.log(input.files[index].name)
        }

            this.setState({ inputfiles  });
    }

    render() {
        const reader = new FileReader();
        const files = this.state.inputfiles.map(file=>{
            return <img  src={URL.createObjectURL(file)} className="col-md-3"/>
        });
        return (
            <div className="container mx-auto mt-md-5 shadow" id="profile">
                <div className="card home-chart mt-md-4">
                    <div className="card-header bg-medium font-weight-bold text-dark">
                    <span className="font-weight-bolder mr-4">TICKET ID: #023</span>
                    <span className="font-weight-bolder mr-4">TYPE: Complaint</span>
                    <span className="font-weight-bolder">TICKET TITLE: Order Issues</span>
                        <div className="form-group  mt-2">
                            <textarea id="message" name="message" rows="5" cols="50" className="form-control text-left" 
                            value="I was unable to view past orders" required placeholder="Message" disabled
                                />
                        </div>
                    </div>
    
                    <div className="card-body" style={{ overflowY: 'scroll', minHeight: '400px', maxHeight: '450px' }}>
                        <div id="chat">
                        {this.state.chats.map( chat => {
                                                     return(
                                                        <div>
                                                        {
                                                            chat.role == "Admin" ? <div className="row mb-2" id="client">
                                                                <div className="col-md-7 col-sm-12 ">
                                                                    <div className="chatbox" style={{background:'#a8afb5'}}>
                                                                    {chat.message}
                                                                    <br />
                                                                    <small>{chat.role}</small>
                                                                    </div>
                                                                <span class="msg_time">{chat.date}</span>
                                                                </div>
                                                                <div className="col-md-5 col-sm-12 p-2">
                                    
                                                                </div>
                                                            </div>
                                                                :   <div className="row my-2" id="admin">
                                                                <div className="col-md-5 col-sm-12 p-2">
                                                                </div>
                                                                <div className="col-md-7 col-sm-12 p-2 text-right text-white">
                                                                    <div className="chatbox bg-secondary">
                                                                    
                                                                    {chat.message}
                                                                    <br />
                                                                    <small>{chat.name}</small>
                                                                    </div>
                                                                <span class="msg_time">{chat.date}</span>
                                                                </div>
                                                            </div>
                                                        }
                                                            
                           
                                                        </div>

                                )
                            })  
                        }  

                         
                        </div>
                    </div>
    
    
    
                    <div className="card-footer p-0">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" style={{ backgroundColor: '#0a0b18', border: '#191a35' }} id="chat">
                                    <label className="custom-file-upload" htmlFor="file-upload">
                                        <i className="fas fa-paperclip fa-fw text-white" style={{ cursor: 'pointer' }} ></i>
                                    </label>
                                    <input id="file-upload" name='upload_cont_img' type="file" style={{ display: 'none' }} onChange={this.fileChange} multiple accept=".png,.jpeg,.jpg,.gif" />
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
    
                        <div className="row" id="preview">
                            {files}
                        </div>
    
                    </div>
                </div>
            </div>
        )
    }
}