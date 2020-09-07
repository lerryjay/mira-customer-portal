import React, { Component } from 'react'
import {withContext} from '../../../common/context';
import { HTTPURL, APIKEY,FILEURL } from '../../../common/global_constant';
import placeholder from "../../../assets/images/product-placeholder.gif";


class ViewTicket extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.props, 
            message: '',
            title: '',
            type: '',
            id: '',
            userid: '',
            ticketid: '',
            updateData: false,
            files: [],
            attachedFiles : [],
            inputfiles : [],
            chat: '',
            chats: []   
        }

        this.fileChange = this.fileChange.bind(this);
    }

    componentDidMount() {
            this.getChat();  
            this.getTicket();
    }

    getTicket() {
        const ticketid = this.props.location.pathname.split('/')[2];
        
        const headers = new Headers();
        headers.append('API-KEY', APIKEY );

        fetch(`${HTTPURL}ticket/getticket?userid=${this.state.user.userid}&ticketid=${ticketid}`, {
            method: "GET",
            headers: headers,
        }).then(res => res.json())
        .then(result => {
            if (result.status == true) {
                this.setState({ 
                    type: result.data.type, 
                    message: result.data.message, 
                    title: result.data.title, 
                    id: result.data.id,
                    attachedFiles : JSON.parse(result.data.files)
                })     
                console.log(JSON.parse(result.data.files))  
            }
         
        })
    }

    getChat(){
        const ticketid = this.props.location.pathname.split('/')[2];
        
        const headers = new Headers();
        headers.append('API-KEY',APIKEY);
        fetch(HTTPURL + `ticket/replys?ticketid=${ticketid}&userid=${this.state.user.userid}`, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => data.status && this.setState({chats: data.data}));
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
        headers.append('API-KEY', APIKEY);

        let form = new FormData();
        form.append("message", this.state.chat);
        form.append("userid", this.state.user.userid);
        form.append("ticketid", this.state.id);

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
                        <span className="font-weight-bolder mr-4 ticket-title">TICKET ID: #{this.state.id}</span>
                        <span className="font-weight-bolder mr-5 ticket-title">
                            <span className="uppercase">{this.state.type}</span>: {this.state.title}
                        </span>
                        <div className="mt-4 mb-2">
                           <p> { this.state.message } </p>
                        </div>
                        <div className="row">
                            {
                                this.state.attachedFiles.map(item=>
                                    <div className="col-6 col-md-4 col-lg-2">
                                        <img src={FILEURL+item} onError={(e)=>{e.target.onerror = null; e.target.src= placeholder}}/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
    
                    <div className="card-body" id="chatscroll" style={{ overflowY: 'scroll', minHeight: '400px', maxHeight: '450px' }}>
                        <div id="chat">
                        {this.state.chats.map( chat => {
                                return(
                                <div>
                                {
                                    this.state.admin ? <div className="row mb-4" id="client">
                                        <div className="col-md-7 col-sm-12 ">
                                            <div className="chatbox" style={{background:'#a8afb5'}}>
                                            {chat.message}
                                            <br />
                                            <small>{chat.role}</small>
                                            </div>
                                                {JSON.parse(chat.files).map( file => {
                                                        return(
                                                            <div className="mt-2 ml-3">
                                                                <img src={FILEURL+file} height="50px" />
                                                            </div>
                                                        )
                                                    })
                                                }
                                        <span className="msg_time">{chat.createdat}</span>
                                        </div>
                                        <div className="col-md-5 col-sm-12 p-2">
            
                                        </div>
                                    </div>
                                        :   <div className="row my-2" id="admin">
                                        <div className="col-md-5 col-sm-12 p-2">
                                        </div>
                                        <div className="col-md-7 col-sm-12 p-2 text-right text-white">
                                            {chat.files}
                                            <div className="chatbox bg-secondary">
                                            
                                            {chat.message}
                                            <br />
                                            <small>{chat.role}</small>
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
                        <form onSubmit={this.handleSubmit}  encType="multipart/form-data">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" style={{ backgroundColor: '#0a0b18', border: '#191a35' }} id="chat">
                                    <label className="custom-file-upload" htmlFor="file-upload">
                                        <i className="fas fa-paperclip fa-fw text-white" style={{ cursor: 'pointer' }} ></i>
                                    </label>
                                    <input id="file-upload" name='files' type="file" style={{ display: 'none' }} onChange={this.fileChange} multiple accept=".png,.jpeg,.jpg,.gif" />
                                </span>
                            </div>

                            <input type="text" className="form-control border-right-0"  id="chat" name="chat"
                             placeholder="Message" aria-label="chat" aria-describedby="chat" required
                             value={this.state.chat}  onChange={this.handleInputChange}/>

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