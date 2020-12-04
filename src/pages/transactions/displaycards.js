import React from 'react'

const DisplayCards = ({totalLists}) => {

  return (
              <div className="row my-4 d-flex justify-content-end ">
              <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3  hover-effect">
                <div className="px-3 card py-4">
                  <div className="row align-items-center">
                    <div className="col">
                    <i className=" border-radius-4 fa fa-chart-line py-3 px-4 text-white btn-primary fa-2x"></i>
                    </div>
                    <div className="col font-card text-right">
                      <span className=" ">Total<br/> Transactions</span>
                      <br />
                      <span className="text-large">{totalLists}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3 hover-effect">
                <div className="px-3 card py-4">
                  <div className="row align-items-center">
                    <div className="col">
                    <i className=" border-radius-4 fa fa-check-circle py-3 px-4 text-white bg-success fa-2x"></i>
                    </div>
                    <div className="col font-card text-right">
                      <span className=" ">Successful<br/> Transactions</span>
                      <br />
                      <span className="text-large">0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3 hover-effect">
                <div className="px-3 card py-4">
                  <div className="row align-items-center">
                    <div className="col">
                    <i className=" border-radius-4 fab fa-bandcamp py-3 px-4 text-white bg-orangered fa-2x"></i>
                    </div>
                    <div className="col font-card text-right">
                      <span className=" ">Cancelled<br/> Transactions</span>
                      <br />
                      <span className="text-large">0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3 hover-effect">
                <div className="px-3 card py-4">
                  <div className="row align-items-center">
                    <div className="col">
                    <i className=" border-radius-4 fa fa-times-circle py-3 px-4 text-white bg-danger fa-2x"></i>
                    </div>
                    <div className="col font-card text-right">
                      <span className=" ">Failed <br/> Transactions</span>
                      <br />
                      <span className="text-large">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              
    );
};

export default DisplayCards;