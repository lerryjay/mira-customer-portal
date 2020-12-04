import React from "react";

const TransactionTable = ({ currentLists, role }) => {
  return (
    <div>
      <div id="table" className="mt-3 justify-content-center shadow ">
        <div className="card-header bg-medium font-weight-bold text-dark d-flex justify-content-between py-1">
          <span className="mt-2">TRANSACTION HISTORY</span>
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
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Description</th>
                <th className="text-right">Credit</th>
                <th className="text-right">Debit</th>
                <th>Transaction Log</th>
              </tr>
            </thead>
            <tbody>
              {currentLists.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td className="table-padding">{transaction.tdate}</td>
                    {role == "admin" && (
                      <td className="table-padding">
                        {transaction.businessname}
                      </td>
                    )}
                    <td className="table-padding">{transaction.description}</td>
                    <td className="table-padding text-right">
                      &#8358;{transaction.credit.toLocaleString()}
                    </td>
                    <td className="table-padding text-right">
                      &#8358;{transaction.debit.toLocaleString()}
                    </td>
                    <td className="table-padding">
                      <span
                        className={
                          transaction.status == "Successful"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {transaction.tlog}
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

export default TransactionTable;
