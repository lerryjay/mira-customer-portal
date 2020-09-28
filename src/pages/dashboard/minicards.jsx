import React from 'react'
const Minicards = ({ title, total, icon, iconBackground }) => {
  return (
    <div className="col-md-6 p-2">
    <div className="px-3 card py-5">
      <div className="row align-items-center">
        <div className="col text-center">
          <i className={`${iconBackground}  py-2 px-3 text-white ${icon} fa-2x `}></i>
          <br/>
          <span className="text-large">
            {total}
          </span>
          <br/>
          <span className=" ">
          {title}
          </span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Minicards;