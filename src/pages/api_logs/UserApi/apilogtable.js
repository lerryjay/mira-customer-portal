import React from "react";

const ApiLogTable = ({ currentLists, role }) => {
  return (
    <div>
      <div
        id="table"
        className="mt-3 shadow"
      >      
      <div className="card-header bg-medium font-weight-bold text-dark  d-flex justify-content-between py-1">
          <span className="mt-2">API USAGE STATISTICS</span>
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
        <div className="table-responsive">
          <table
            className="table table-hover table-bordered table-md text-center align-middle mb-0 text-dark home-chart"
            id="myTable"
          >
            {/* <caption>Hello World!</caption> */}
            <thead>
              <tr>
                <th className="table-padding">Date</th>
                <th>Client</th>
                <th className="table-padding">Product</th>
                <th>Request IP</th>
                <th>Service Code</th>
                <th>Request Count</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentLists.map((request, index) => {
                return (
                  <tr key={index} >
                  <td className="table-padding">
                    {(new Date(request.date).toDateString())}
                  </td>
                  {role == "admin" && (
                      <td 
                      className="table-padding">
                        {request.businessname }
                      </td>
                    )}
                  <td className="table-padding">
                    {request.productname}
                  </td>
                  <td className="table-padding">{request.ip}</td>
                  <td className="table-padding">
                      <span >{request.servicecode }</span>
                  </td>
                  <td className="table-padding">
                      <span >{request.count}</span>
                  </td>
                    <td className="table-padding"
                      style={{ minWidth: "100px", maxWidth: "100px" }}
                    >
                      <span>{request.statuscode == '0' ? 'success' : 'failed' }</span>
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

export default ApiLogTable;
