import React, { Component } from 'react'
import {withContext} from '../../common/context';
import { HTTPURL } from '../../common/global_constant';


class ViewTicket extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.props, 
            message: '',
            userid: '',
            ticketid: '',
            updateData: false,
            files: '',
            inputfiles : [],
            chats: []   
        }

        this.fileChange = this.fileChange.bind(this);
    }

    componentDidMount() {
            this.getChat();  

    }
    getChat(){
        // Set the userid and ticketid
        this.setState({userid: '5f3e930330e28', ticketid: '5f447cb8e7b31'})
        
        const headers = new Headers();
        headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
        fetch(HTTPURL + 'ticket/replys?ticketid=5f447cb8e7b31&userid=5f3e930330e28', {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => this.setState({chats: data.data}));
        this.setState({updateData: false});

    }
    componentDidUpdate(){
       if(this.state.updateData) this.getChat()

    // Automatically scroll down to new messages
       var objDiv = document.getElementById("chatscroll");
       objDiv.scrollTop = objDiv.scrollHeight;

    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value });
    }

    handleSubmit = async e => {
        e.preventDefault()
        // console.log(e.target[0].files[0])


        const headers = new Headers();
        headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
        let form = new FormData(document.getElementById("chatform"));

        this.state.inputfiles.forEach(item=>{
            form.append('files[]', item);
        })

        fetch(HTTPURL + 'ticket/replyticket', {
            method: 'POST',
            body: form,
            headers: headers
        })
        .then(response => response.json())
        .then(json => {
        console.log(json);
        return json;
        });

        // const res = await this.state.getchat(document.getElementById("chatform"));
        console.log('Message sent!')
         
        this.setState({message: '', files: ''})
        this.setState({updateData: true});
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
         this.state.files = this.state.inputfiles.map(file=>{
            return <img  src={URL.createObjectURL(file)} className="col-md-3"/>
        });
        return (
            <div className="container mx-auto mt-md-5 shadow" id="profile">
                <div className="card home-chart mt-md-4">
                    <div className="card-header bg-medium font-weight-bold text-dark">
                        
                    <span className="font-weight-bolder mr-4 ticket-title">TICKET ID: #{this.props.getTicket.id}</span>
                                              
                    <span className="font-weight-bolder mr-4 ticket-title">
                     <span className="uppercase">{this.props.getTicket.type}</span>: {this.props.getTicket.title}</span>
                        <div className="form-group  mt-2">
                            <textarea id="message" name="message" rows="5" cols="50" className="form-control text-left" 
                            value={this.props.getTicket.message} required placeholder="Message" disabled
                                />
                        </div>
                    </div>
    
                    <div className="card-body" id="chatscroll" style={{ overflowY: 'scroll', minHeight: '400px', maxHeight: '450px' }}>
                        <div id="chat">
                        {this.state.chats.map( chat => {
                                                     return(
                                                        <div>
                                                        {
                                                            this.state.admin ? <div className="row mb-2" id="client">
                                                                <div className="col-md-7 col-sm-12 ">
                                                                    <div className="chatbox" style={{background:'#a8afb5'}}>
                                                                    {chat.message}
                                                                    <br />
                                                                    <small>{chat.sender_id}</small>
                                                                    </div>
                                                                <span className="msg_time">{chat.createdat}</span>
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
                                                                    <small>{chat.sender_id}</small>
                                                                    </div>
                                                                <span className="msg_time">{chat.createdat}</span>
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
                        <form onSubmit={this.handleSubmit} id="chatform"  encType="multipart/form-data">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" style={{ backgroundColor: '#0a0b18', border: '#191a35' }} id="chat">
                                    <label className="custom-file-upload" htmlFor="file-upload">
                                        <i className="fas fa-paperclip fa-fw text-white" style={{ cursor: 'pointer' }} ></i>
                                    </label>
                                    <input id="file-upload" name='files' type="file" style={{ display: 'none' }} onChange={this.fileChange} multiple accept=".png,.jpeg,.jpg,.gif" />
                                </span>
                            </div>

                            <input type="text" className="form-control border-right-0"  id="message" name="message"
                             placeholder="Message" aria-label="chat" aria-describedby="chat" required
                             value={this.state.message}  onChange={this.handleInputChange}/>

                             <input type="hidden" className="form-control border-right-0"  id="userid" name="userid"
                             placeholder="UserID" aria-label="chat" aria-describedby="chat" required
                             value={this.state.userid}  onChange={this.handleInputChange} />

                             <input type="hidden" className="form-control border-right-0"  id="ticketid" name="ticketid"
                             placeholder="TicketID" aria-label="chat" aria-describedby="chat" required
                             value={this.state.ticketid}  onChange={this.handleInputChange} />

                            <button className="input-group-append">
                                <span className="input-group-text bg-white" id="chat">
                                    <i type="submit" className="fas fa-paper-plane fa-fw" style={{ cursor: 'pointer', color: '#0a0b18' }}></i>
                                </span>
                            </button>
                        </div>
                        <label id="file-name" className="text-white"></label>
    
                        <div className="row" id="preview">
                            {this.state.files}
                        </div>
                        </form>
    
                    </div>
                </div>
            </div>
        )
    }
}
export default withContext(ViewTicket);