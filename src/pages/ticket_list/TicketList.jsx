import React, { Component } from 'react';
import { HTTPURL } from '../../common/global_constant';
import {withContext} from '../../common/context';
import { Link } from 'react-router-dom';

class TicketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            currentPage: 1,
            numberPerPage: 10,
            ticket: [],
            id: 1,
            tickets : [],
            currentList: []
        }
    }


    componentDidMount(){
        console.log(this.state,"props")
        const headers = new Headers();
        headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
        fetch(HTTPURL + 'ticket/?userid=5f3e930330e28', {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            // let value = data.data
            // //Get current list
            // const indexOfLastPage = this.state.currentPage * this.state.numberPerPage;
            // const indexOfFirstPage = indexOfLastPage - this.state.numberPerPage
            // const currentList = value.slice(indexOfFirstPage, indexOfLastPage)
            // console.log(currentList,"data data")
            this.setState({tickets: data.data})
            // this.setState({currentList: currentList})
        });

        let ticket = []
        console.log('changed successfully!', ticket)
        for (let i = 0; i < this.state.tickets.length; i++) {
            console.log(this.state.tickets[i])
            ticket.push(this.state.tickets[i])
            this.setState({ ticket: ticket });
        }

    }

    handleViewMore = e => {
         this.state.viewmore(e)
        this.props.history.push('/viewticket');
    }
    // handleRoute = e => {
    //      // Get Ticket by ID
    //     const headers = new Headers();
    //     headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');

    //         let ticketid = e.target.attributes.value.value
    //         // let ticketid = "5f4509c0c26d1"
    //         let userid = "5f3e930330e28"

    //     fetch(HTTPURL +`ticket/getticket?userid=${userid}&ticketid=${ticketid}`, {
    //         method: 'GET',
    //         headers: headers
    //     })
    //     .then(response => response.json())
    //     .then(data => console.log(data.data, "data"))
    //     this.props.history.push(`/viewticket/${ticketid}`);
    // }
    
     changeStatus(e,ticket) {
        

        const tickets = this.state.tickets.map(item=>{ 
            console.log(e.target.value);
            if(item.ticketid == ticket.ticketid) item.ticketstatus  = e.target.value;
            return item;
        })

        this.setState({tickets});
        
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

                                    <div id='table' className="card pt-2 mt-3 justify-content-center shadow px-2">
                                        <div className="table-responsive">
                                            <table
                                                className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">
                                                {/* <caption>Hello World!</caption> */}
                                                <thead>
                                                    <tr>
                                                        <th>S/N</th>
                                                        <th>Date&nbsp;&&nbsp;Time</th>
                                                        <th>Client&nbsp;Name</th>
                                                        <th>Email&nbsp;Address</th>
                                                        <th>Ticket&nbsp;Type</th>
                                                        <th><i className="fas fa-comments"></i>&nbsp;&nbsp;Message</th>
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
                                                                {ticket.createdat}
                                                            </td>
                                                            <td  onClick={this.handleRoute}>
                                                                {ticket.client_name}
                                                            </td>
                                                            <td>
                                                                {ticket.email}
                                                            </td>
                                                            <td>
                                                                {ticket.type}
                                                            </td>
                                                            <td style={{minWidth: "120px", textAlign: "left"}}>
                                                                {ticket.message}
                                                            </td>
                                                            <td className="align-middle" style={{minWidth: "105px"}}>
                                                            <select className="custom-select custom-select-sm" onChange={(e) =>this.changeStatus(e,ticket)}>
                                                                <option value="" selected > {ticket.ticketstatus}</option>
                                                                <option className="btn btn-sm text-success" value="approved">
                                                                    &#10003;
                                                                    Approved</option>
                                                                <option className="btn btn-sm text-danger" value="cancelled">
                                                                    &#1008;
                                                                    Cancelled</option>
                                                                <option className="btn btn-sm btn-light text-warning" value="pending">
                                                                    &#10070;
                                                                    Pending</option>
                                                            </select>
                                                            </td>
                                                            <td className="align-middle" style={{cursor:"pointer"}}>
                                                                <Link onClick={this.handleViewMore}>
                                                    <span class="badge px-3 py-2 badge-primary" value={ticket.id} style={{cursor:"pointer"}}>View</span>
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


                                </div>

                            </div>
                        </form>
                    </div>
                </div>
                

               <div className="row justify-content-center text-center">
                <div class="pagination">
                        <a href="#">&laquo;</a>
                        <a href="#">1</a>
                        <a class="active" href="#">2</a>
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

export default withContext(TicketList);