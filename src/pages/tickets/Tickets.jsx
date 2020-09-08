import React, { Component } from 'react';
import { HTTPURL, APIKEY } from '../../common/global_constant';
import {withContext} from '../../common/context';
import { Link } from 'react-router-dom';

class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            currentPage: 1,
            numberPerPage: 10,
            id: 1,
            tickets : [],
            currentList: []
        }
    }

    componentDidMount(){
        this.getTickets();
    }

    async getTickets() {
        
        const headers = new Headers();
        headers.append('API-KEY', APIKEY);
        const res = await fetch(HTTPURL + `ticket/?userid=${this.state.user.userid}`, {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
        if(res['status']) {
            let tickets = res['data']
            for (let i = 0; i < this.state.tickets.length; i++) {
                tickets.push(this.state.tickets[i])
            }
            this.setState({ tickets });
        }
    }

    // handleViewMore = e => {
    //      this.state.viewmore(e)
    //     this.props.history.push('/viewticket');
    // }

    ticketStatusUpdated(e,ticket) {
        const tickets = this.state.tickets.map(item=>{ 
            console.log(e.target.value);
            if(item.id == ticket.id){ 
                item.ticketstatus  = e.target.value;
                this.updateTicketStatus(ticket.id,e.target.value);
            }
            return item;
        })

        this.setState({tickets});
        
    }

    async updateTicketStatus(ticketid,status){
        const headers = new Headers();
        headers.append('API-KEY', APIKEY);
        const form = new FormData();
        
        form.append('ticketid',ticketid);
        form.append('status',status);
        form.append('userid',this.state.user.userid);
        const res =  await fetch(HTTPURL + `ticket/updatestatus`, {
            method: 'POST',
            headers: headers,
            body : form

        }).then(response => response.json());
        if(res['status']){

        }
    }
    
    render() {

        return (
            <div className="container">
                <div className="row mt-4">

                    <div className="col-md-12 mb-3" id="profile">
                        <form action="">
                            <div className="card home-chart">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    TICKET LIST
                </div>
                                <div className="card-body">
                                {this.state.tickets == '' ?
                                    <div className="alert alert-warning" role="alert">
                                        <h6 className="text-center">No ticket records!</h6>
                                    </div>
                                    :
                                    <div id='table' className="card pt-2 mt-3 justify-content-center shadow px-2">
                                    <div className="table-responsive">
                                     <table className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">
                                            {/* <caption>Hello World!</caption> */}
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Date&nbsp;&&nbsp;Time</th>
                                                    { this.state.user.role == 'admin' && <th >Client&nbsp;Name</th> }
                                                    { this.state.user.role == 'admin' && <th>Email</th> }
                                                    <th>Ticket&nbsp;Type</th>
                                                    <th>Status</th>
                                                    <th>View&nbsp;Ticket</th>
                                                </tr>

                                            </thead>
                                            <tbody> 
                                                
                                            {this.state.tickets.map( ticket => {
                                                 return(

                                                    <tr>
                                                        <td>
                                                            {this.state.id++}
                                                        </td>
                                                        <td>
                                                            { (new Date(ticket.createdat)).toLocaleDateString() }
                                                        </td>
                                                        { this.state.user.role == 'admin' &&  <td  onClick={this.handleRoute}>
                                                            {ticket.clientname}
                                                        </td> }
                                                        { this.state.user.role == 'admin' &&  <td>
                                                            {ticket.email} 
                                                        </td> }
                                                        <td>
                                                            {ticket.type}
                                                        </td>
                                                        <td>
                                                        <select className="custom-select custom-select-sm" value={ticket.ticketstatus} onChange={(e) =>this.ticketStatusUpdated(e,ticket)}>
                                                            <option className="btn btn-sm text-success" value="resolved"> &#10003;&nbsp;&nbsp;Resolved </option>
                                                            <option className="btn btn-sm text-danger" value="cancelled">&#1008;&nbsp;&nbsp;Cancelled</option>
                                                            <option className="btn btn-sm btn-light text-warning" value="pending">&#10070;&nbsp;&nbsp;Pending</option>
                                                        </select>
                                                        </td>
                                                        <td className="align-middle" style={{cursor:"pointer"}}>
                                                            <Link to={() => `/viewticket/${ticket.id}`}>
                                                <span className="badge px-3 py-2 badge-primary" value={ticket.id} style={{cursor:"pointer"}}>View</span>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                 )
                                                })  
                                            } 
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            }
                                 

                                </div>

                            </div>
                        </form>
                    </div>
                </div>
                

               <div className="row justify-content-center text-center">
                <div className="pagination">
                        <a href="#">&laquo;</a>
                        <a href="#">1</a>
                        <a className="active" href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#">6</a>
                        <a href="#">&raquo;</a>
                    </div> 
               </div>
                
                        
                <div className="overlay"></div>

                <div className="modal fade" id="viewTicket" tabIndex="-1" role="dialog" aria-labelledby="viewTicketTitle"
                    aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="card">
                                        <div className="card-header h6">
                                            Create Ticket
                            </div>
                                        <div className="card-body">

                                            <div className="row">

                                                <div className="col-md-12 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="" className="">Email</label>
                                                        <input type="text" className="form-control form-control-sm" name="" id=""
                                                            value="Johndoe@mail.com" placeholder="" disabled />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="" className="">Subject</label>
                                                        <input type="text" className="form-control form-control-sm" name="" id=""
                                                            value="John" placeholder="" disabled />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="type" className="">Ticket&nbsp;Type</label>
                                                        <select name="type" id="type" className="form-select form-select-sm" disabled>
                                                            <option value="" defaultValue disabled>--Select&nbsp;Ticket&nbsp;Type--
                                                </option>
                                                            <option value="complaint">complaint</option>
                                                            <option value="request">Request</option>
                                                            <option value="enquiry">Enquiry</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="message">Message</label>
                                                        <textarea id="message" name="message" rows="10" cols="50"
                                                            className="form-control text-left" disabled>

                                                        </textarea>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>

                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withContext(Tickets);