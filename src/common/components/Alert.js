import React from 'react'
const Alert = ({ type, message }) => {
  return (
    <div className={`alert alert-${type}`} role="alert" style={{ position: 'fixed', top: '70px', right: '10px', zIndex: '4' }}>
      <span className="mt-3">{message}</span>
    </div>
  );
};

export default Alert;