import React from 'react'
import notfound from "../../assets/images/404_not_found.png";

const NotFound = () => {
  return (
    <div  className="content">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-2">
            <div style={{ marginTop: "calc((90vh - 400px)/ 2)" }} className="text-center mt-5">
              <img src={notfound} alt="Not Found" width="600px" height="300px" />
            </div>
          </div>
      </div>
      </div>
    </div>
  );
};

export default NotFound;