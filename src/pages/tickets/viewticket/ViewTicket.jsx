import React, { Component } from "react";
import { withContext } from "../../../common/context";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import placeholder from "../../../assets/images/product-placeholder.gif";
import pdf_placeholder from "../../../assets/images/pdf.png";
import avatar from "../../../assets/images/avatar.svg";


class ViewTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      message: "",
      title: "",
      type: "",
      id: "",
      userid: "",
      ticketid: "",
      updateData: false,
      files: [],
      attachedFiles: [],
      inputfiles: [],
      chat: "",
      chats: [],
      previewFile: "",
    };

    this.fileChange = this.fileChange.bind(this);
  }

  async componentDidMount() {
    this.state.showLoader();
    await this.getChat();
    await this.getTicket();
    this.state.hideLoader();
  }

  componentDidUpdate(){
    if(this.state.updateData) this.getChat()
  }

  async getTicket() {
    const ticketid = this.props.location.pathname.split("/")[2];

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    const result = await fetch(
      `${HTTPURL}ticket/getticket?userid=${this.state.user.userid}&ticketid=${ticketid}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((res) => res.json());
    if (result.status) {
      this.setState({
        type: result.data.type,
        message: result.data.message,
        title: result.data.title,
        id: result.data.id,
        attachedFiles: JSON.parse(result.data.files),
      });
    }
  }

  getChat() {
    const ticketid = this.props.location.pathname.split("/")[2];

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    fetch(
      HTTPURL +
        `ticket/replys?ticketid=${ticketid}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => data.status && this.setState({ chats: data.data }));
    this.setState({ updateData: false });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);

    let form = new FormData();
    form.append("message", this.state.chat);
    form.append("userid", this.state.user.userid);
    form.append("ticketid", this.state.id);

    this.state.inputfiles.forEach((item) => {
      form.append("files[]", item);
    });

    fetch(HTTPURL + "ticket/replyticket", {
      method: "POST",
      body: form,
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ loading: false });
        if(result.status === true) {
            this.state.showAlert("success", result.message)
            this.getChat();
        } else{
            this.state.showAlert("danger",  result.message)
        }      
      });

    this.setState({ updateData: true });
    this.setState({ chat: "", inputfiles: [] });
  };

  fileChange = function () {
    let input = document.getElementById("file-upload");
    let inputfiles = [];
    for (let index = 0; index < input.files.length; index++) {
      inputfiles.push(input.files[index]);
    }

    this.setState({ inputfiles });
  };
  showModal = (e, file) => {
    this.setState({ previewFile: file });
    let modal2 = document.getElementById("myModal");
    modal2.style.display = "block";


    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      modal2.style.display = "none";
    };
  };

  render() {
    const reader = new FileReader();
    this.state.files = this.state.inputfiles.map((file) => {
      return <img src={URL.createObjectURL(file)} className="col-md-3" alt="attachment"/>;
    });
    return (
      <div className="container mx-auto mt-md-5" id="profile">
          <div className="card bg-white  mt-4">
            <div className="card-header bg-white font-weight-bold text-dark">
              <span className="font-weight-bolder mr-4 ticket-title">
                TICKET ID: #{this.state.id}
              </span>
              <span className="font-weight-bolder mr-5 ticket-title">
                <span className="uppercase">{this.state.type}</span>:{" "}
                {this.state.title}
              </span>
              <div className="mt-4 mb-2">
                <p> {this.state.message} </p>
              </div>
              <div className="row">
                {this.state.attachedFiles.map((item,i) => (
                  <div className="col-6 col-md-4 col-lg-2" 
                  key={i}>
                    {item.match(/\.(jpg|jpeg|png)$/) ? (
                      <img
                      key={i}
                      alt="TicketImage"
                        id="img"
                        style={{ width: "100px", height: "100px" }}
                        className="m-2"
                        onClick={(e) => this.showModal(e, item)}
                        src={FILEURL + item}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = placeholder;
                        }}
                      />
                    ) : (
                      <img
                      key={i}
                      alt="TicketImage"
                        src={pdf_placeholder}
                        onClick={(e) => this.showModal(e, item)}
                        style={{ width: "100px", height: "100px" }}
                        className="m-2"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* The Modal */}
            <div id="myModal" className="modal2">
              <div className="px-2 d-flex">
                <a
                  download
                  href={FILEURL + this.state.previewFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary rounded-0 top-left mr-auto"
                  style={{ position: "absolute" }}
                >
                  Download
                </a>{" "}
                <span className="close">&times;</span>
              </div>
              <div className="d-flex justify-content-center align-content-center">
                  {this.state.previewFile.match(/\.(jpg|jpeg|png)$/) ? (
                    <img src={FILEURL + this.state.previewFile} />
                  ) : (
                    <img src={pdf_placeholder} />
                  )}
              </div>
            </div>

            <div
              className="card-body"
              id="chatscroll"
              style={{
                overflowY: "scroll",
                minHeight: "400px",
                maxHeight: "450px",
              }}
            >
              <div id="chat">
                {this.state.chats.map((chat,i) => {
                  return (
                    <div key={i}>
                      {chat.role === "admin" ? (
                        <div className="row mb-4" id="client">
                          <div className="col-md-7">
                            <div className="row">
                              <div className="col-md-2">
                                <img src={avatar} alt="admin-pic" className="image-fit" />
                              </div>
                              <div className="col-md-10">
                                <div className="card shadow p-3 bg-white">
                                  <p className="font-weight-bold capitalize"> {chat.role} <span className="msg_time ml-3">{chat.createdat}</span></p>
                                  <p>{chat.message} </p>   
                                  {JSON.parse(chat.files).map((file,i) => {
                                      return (
                                        <div
                                        key={i}>
                                          <img src={FILEURL + file} height="50px" alt={file}/>
                                        </div>
                                      );
                                    })}                     
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-5 col-sm-12 "></div>
                        </div>
                      ) : (
                        <div className="row mb-4" id="admin">
                        <div className="col-md-5 col-sm-12 "></div>
                        <div className="col-md-7">
                          <div className="row">
                            <div className="col-md-10">
                              <div className="card shadow p-3 bg-white">
                                <p className="font-weight-bold capitalize"> {chat.role} <span className="msg_time ml-3">{chat.createdat}</span></p>
                                <p>{chat.message} </p>   
                                {JSON.parse(chat.files).map((file,i) => {
                                    return (
                                      <div
                                      key={i}>
                                        <img src={FILEURL + file} height="50px" alt={file}/>
                                      </div>
                                    );
                                  })}                     
                              </div>
                            </div>
                            <div className="col-md-2">
                              <img src={avatar} alt="client-pic" className="image-fit" />
                            </div>
                          </div>
                        </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
          
          <div className="card bg-white py-3 mt-3">
              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <textarea
                        name="chat"
                        id="chat"
                        cols="20"
                        rows="4"
                        placeholder="Message"
                        type="text"
                        className="form-control mb-2"
                        value={this.state.chat}
                        onChange={this.handleInputChange}
                      ></textarea>

                      <label id="file-name" className="text-white"></label>
                      <div className="row" id="preview">
                        {this.state.files}
                      </div>

                      <label
                        htmlFor="file-upload"
                        className="btn btn-sm btn-primary py-2 px-3"
                      >
                        Attach File
                      </label>
                      <i className="font-weight-bold">
                        {" "}
                        The only accepted files are *pdf, *jpg, *jpeg and *png
                      </i>
                      <input
                        id="file-upload"
                        name="files"
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.fileChange}
                        multiple
                        accept=".png,.jpeg,.jpg,.gif"
                      />

                      <button
                        type="submit"
                        className="btn btn-sm btn-primary py-2 px-3 float-right"
                      >
                        <i className="fas fa-paper-plane fa-fw  mr-2"></i>
                        Send
                      </button>
                    </div>
                  </div>
                </div>

              </form>
            </div>
      </div>
    );
  }
}
export default withContext(ViewTicket);
