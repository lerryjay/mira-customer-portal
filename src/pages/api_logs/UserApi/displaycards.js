import React from 'react'

const DisplayCards = ({totalapi, sucessapi, errorapi, cancelledapi}) => {

  return (
      
    <div className="row my-4 d-flex justify-content-end ">
    <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3  hover-effect">
      <div className="px-3 card py-4">
        <div className="row align-items-center">
          <div className="col">
          <i className=" border-radius-4 fa fa-database py-3 px-4 text-white btn-primary fa-2x"></i>
          </div>
          <div className="col font-card text-right">
            <span className=" ">Total</span>
            <br />
            <span className="text-large">{totalapi}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3 hover-effect">
      <div className="px-3 card py-4">
        <div className="row align-items-center">
          <div className="col">
          <i className=" border-radius-4 fa fa-check py-3 px-4 text-white bg-success fa-2x"></i>
          </div>
          <div className="col font-card text-right">
            <span className=" ">Success</span>
            <br />
            <span className="text-large">{sucessapi}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3 hover-effect">
      <div className="px-3 card py-4">
        <div className="row align-items-center">
          <div className="col">
          <i className=" border-radius-4 fa fa-exclamation-triangle py-3 px-4 text-white bg-orangered fa-2x"></i>
          </div>
          <div className="col font-card text-right">
            <span className=" ">Error</span>
            <br />
            <span className="text-large">{errorapi}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3 hover-effect">
      <div className="px-3 card py-4">
        <div className="row align-items-center">
          <div className="col">
          <i className=" border-radius-4 fa fa-times py-3 px-4 text-white bg-danger fa-2x"></i>
          </div>
          <div className="col font-card text-right">
            <span className=" ">Cancelled</span>
            <br />
            <span className="text-large">{cancelledapi}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  
    );
};

export default DisplayCards;