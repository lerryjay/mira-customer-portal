/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Pagination = ( {numberPerPage, currentPage, totalLists, pageNumbers, update}) => {
  // Logic for displaying page numbers
      const pageNumber = [];

      for (let i = 1; i <= Math.ceil(totalLists.length / numberPerPage); i++) {
        pageNumber.push(i);
        pageNumbers = pageNumber
      }
    
    const handleClick = (e) => {
       
        const paginatedbuttons = document.querySelectorAll("a");
      
          currentPage =  e.target.id;
          update(currentPage);

        paginatedbuttons.forEach(btn => {
          if(btn.id == e.target.id) {
            btn.classList.add("active")
          } else {
            btn.classList.remove("active");
          }
        })
    
      }


  return (
        pageNumbers.length > 0 &&<div className="pagination">
          <a href="#">&laquo;</a>
          {pageNumbers.map((pageNumber,index) => {
            if(pageNumber == 1 ) {
              return (
                <a className="active" href="#" id={index + 1}  key={index}  onClick={(e) => handleClick(e, index + 1)}>{pageNumber}</a>
              )
            } else {

              return (
            <a href="#" id={index + 1} key={index} onClick={(e) => handleClick(e, index + 1)}>{pageNumber}</a>
              )}
            }
          )}
          <a href="#">&raquo;</a>
        </div> 
  );
};

export default Pagination;
