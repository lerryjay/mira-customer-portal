import React from 'react'
import notfound from "../../assets/images/404_not_found.png";

const NotFound = () => {
  return (
    <div id="content">
    <div style={{ marginTop: "calc((90vh - 400px)/ 2)" }} className="text-center">
      <img src={notfound} alt="Not Found" width="600px" height="300px" />
    </div>
    </div>
  );
};

export default NotFound;