import React, { Component } from 'react'
import {withContext} from '../../../common/context';
import { HTTPURL, APIKEY,FILEURL } from '../../../common/global_constant';
import placeholder from "../../../assets/images/product-placeholder.gif";
import pdf_placeholder from  "../../../assets/images/pdf.png";


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
            chats: [],
            previewFile : ''
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
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async e => {
        e.preventDefault()

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
    showModal = (e,file)=> {
        this.setState({previewFile: file });
        let modal2 = document.getElementById("myModal")
        modal2.style.display = "block";

        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() { 
            modal2.style.display = "none";
        }
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
                                       {
                                        item.match(/\.(jpg|jpeg|png)$/) ? <img id="img"  style={{ width : '100px', height : '100px'}} onClick={(e)=>this.showModal(e,item)} src={FILEURL+item} onError={(e)=>{e.target.onerror = null; e.target.src= placeholder}}/> 
                                        : <img src={pdf_placeholder} onClick={(e)=>this.showModal(e,item)} style={{ width : '100px', height : '100px'}}/>
                                    }
                                        
                                    </div>
                                )
                            }
                        </div>
                    </div>

                   {/* The Modal */}
                    <div id="myModal" className="modal2">
                        <div className="px-2 d-flex">
                            <a download href={FILEURL+this.state.previewFile}  target="_blank" className="btn btn-primary rounded-0 top-left mr-auto" style={{ position: 'absolute'}}>Download</a> //implement download button later
                            <span className="close">&times;</span>
                        </div>
                        <div className="d-flex justify-content-center align-content-center">
                            <div className="bg-white">
                            {
                                this.state.previewFile.match(/\.(jpg|jpeg|png)$/) ? <img src={ FILEURL+this.state.previewFile } /> : <img src={ pdf_placeholder } />
                            }
                                
                            </div>
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
    
    
    
                    <div className="card-footer p-0 pb-3">
                        <form onSubmit={this.handleSubmit}  encType="multipart/form-data">
                            
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                <textarea name="chat" id="chat" cols="20" rows="4" required
                                placeholder="Message" type="text" className="form-control my-3"
                                value={this.state.chat}  onChange={this.handleInputChange}></textarea>
                                
                                <label id="file-name" className="text-white"></label>
                                    <div className="row" id="preview">
                                        {this.state.files}
                                    </div>

                                <label htmlFor="file-upload" className="btn btn-sm btn-primary py-2 px-3">Attach File</label> 
                                <i className="font-weight-bold"> The only accepted files are *pdf, *jpg, *jpeg and *png</i>
                                <input id="file-upload" name='files' type="file" style={{ display: 'none' }} onChange={this.fileChange} multiple accept=".png,.jpeg,.jpg,.gif" />


                                
                                <button type="submit" className="btn btn-sm btn-primary py-2 px-3 float-right">
                                    <i className="fas fa-paper-plane fa-fw  mr-2"></i>
                                    Send
                                </button>

                                </div>
                            </div>
                        </div>
{/* 
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
                        */}
                        </form>
    
                    </div>
                </div>
            </div>
        )
    }
}
export default withContext(ViewTicket);