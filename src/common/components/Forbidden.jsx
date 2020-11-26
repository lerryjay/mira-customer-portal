import React from 'react'
import forbidden from "../../assets/images/forbidden2.png";

const Forbidden = () => {
  return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-2">
            <div style={{ marginTop: "calc((90vh - 400px)/ 2)" }} className="text-center mt-5">
              <img src={forbidden} alt="Forbidden Error" width="600px" height="inherit" />
              {/* <h5 className="text-danger">Oops! You do not have the permission to access this page.</h5> */}
            </div>
          </div>
      </div>
      </div>
  );
};

export default Forbidden;