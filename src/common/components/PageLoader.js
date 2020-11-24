import React from 'react'

const PageLoader = () => {
  return (
    <div className="spin-center">
      <section>
    <div className="loader loader-1">
      <div className="loader-outter"></div>
      <div className="loader-inner"></div>
    </div>
  </section>
      {/* <div className="loader"></div>  */}
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