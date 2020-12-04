import React from "react";
import { Link } from "react-router-dom";

const TicketTable = ({ currentLists, role, ticketStatusUpdated, showdeleteModal}) => {
 
   return (
    <div>
       <div className="row ">
        <div className="col-md-12 d-flex justify-content-end">
        <span>
            <button
              className="btn btn-primary rounded-0 btn-sm mr-2"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Filter
            </button>
            <button className="btn btn-info rounded-0 btn-sm">Print</button>
          </span>
        </div>
       </div>
      <div id="table" className=" mt-3 justify-content-center shadow">
        <div className="table-responsive">
          <table
            className="table table-hover table-bordered table-md text-center align-middle mb-0 text-dark home-chart"
            id="myTable"
          >
            {/* <caption>Hello World!</caption> */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                {role == "admin" && <th>Client&nbsp;Name</th>}
                <th>Type</th>
                <th>Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentLists.map((ticket, index) => {
                return (
                  <tr key={index} className="py-0">
                    <td>#{ticket.id}</td>
                    <td>{new Date(ticket.createdat).toLocaleDateString()}</td>
                    {role == "admin" && (
                      <td>{ticket.clientname}</td>
                    )}
                    <td>{ticket.type}</td>
                    <td>{ticket.title}</td>

                    <td
                      style={{ minWidth: "100px", maxWidth: "100px" }}
                      className=" py-1"
                    >
                      <select
                        className="custom-select custom-select-sm"
                        value={ticket.ticketstatus}
                        onChange={(e) => ticketStatusUpdated(e, ticket)}
                      >
                        <option
                          className="btn btn-sm text-success"
                          value="resolved"
                        >
                          {" "}
                          &#10003;&nbsp;&nbsp;Resolved{" "}
                        </option>
                        <option
                          className="btn btn-sm text-danger"
                          value="cancelled"
                        >
                          &#1008;&nbsp;&nbsp;Cancelled
                        </option>
                        <option
                          className="btn btn-sm btn-light text-warning"
                          value="pending"
                        >
                          &#10070;&nbsp;&nbsp;Pending
                        </option>
                      </select>
                    </td>
                    <td
                      className="align-middle py-0"
                      style={{ cursor: "pointer" }}
                    >
                      <Link to={() => `/viewticket/${ticket.id}`}>
                        <span
                          className="btn btn-sm btn-primary"
                          value={ticket.id}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fas fa-eye fa-fw "></i>
                        </span>
                      </Link>

                      <span
                        className="btn btn-sm ml-2 btn-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => showdeleteModal(ticket.id)}
                      >
                        <i className="fa fa-trash  text-white"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TicketTable;
