import React from "react";

const DeleteModal = ({ selectedTicket, deleteModal, loading }) => {
   const closedeleteModal = () => {
        let modal = document.getElementById("deleteModal");
        modal.style.display = "none";
      }

  return (
      
    <div id="deleteModal" className="modal">
    {/* Modal content  */}
    <div className="modal-content modal-del text-center p-5">
      {/* <div className="delete-icon">
              &times;
          </div> */}
      <i className="fa fa-exclamation-triangle fa-3x dark-red mb-2" aria-hidden="true"></i>
      <h3>Are you sure?</h3>
      <p> Do you really want to delete this ticket?</p>
      <div className="row">
        <div className="col-md-6">
          <button onClick={closedeleteModal} className="btn-block btn btn-outline-secondary mb-2">Cancel</button>
        </div>
        <div className="col-md-6">
          {loading ? (
            <button
              type="submit"
              className="btn btn-block btn-danger"
            >
              <div
                className="spinner-border "
                role="status"
                id="loader"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </button>
          ) : (
              <button onClick={() => deleteModal(selectedTicket.id)} className="btn btn-danger btn-block">Delete</button>
            )}
        </div>
      </div>
    </div>
  </div>
 
  );
};

export default DeleteModal;
