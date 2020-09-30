import React from 'react'
const Maincards = ({ title, total, icon, iconBackground }) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-3">
    <div className="px-3 card py-4 zoom-effect">
      <div className="row align-items-center">
        <div className="col">
          <i className={`${iconBackground} py-3 px-4 text-white ${icon} fa-2x `}></i>
        </div>
        <div className="col font-card text-right">
          <span className=" ">
          {title}
          </span>
          <br/>
          <span className="text-large">
            {total}
          </span>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Maincards;