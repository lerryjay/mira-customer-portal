import React from 'react'

const PageLoader = () => {
  return (
    <div className="spin-center">
      <div className="loader"></div> 
      {/* <span className="text-primary ">
        <span
          className="spinner-grow spinner-grow-sm mr-2"
          role="status"
          aria-hidden="true"
        ></span>
        <span style={{ fontSize: "16px" }}>Loading...</span>
      </span> */}
    </div>
  );
};

export default PageLoader;