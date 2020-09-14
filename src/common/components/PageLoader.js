import React from 'react'

const PageLoader = () => {
  return (
    <div className="spin-center">
      <span class="text-primary ">
        <span
          class="spinner-grow spinner-grow-sm mr-2"
          role="status"
          aria-hidden="true"
        ></span>
        <span style={{ fontSize: "16px" }}>Loading...</span>
      </span>
    </div>
  );
};

export default PageLoader;