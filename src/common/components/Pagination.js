/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Pagination = ({
  numberPerPage,
  currentPage,
  totalLists,
  pageNumbers,
  update,
}) => {

   // calculate total pages
   let totalPages = Math.ceil(totalLists / numberPerPage);
console.log(totalPages,totalLists,numberPerPage);

   // ensure current page isn't out of range
   if (currentPage < 1) {
       currentPage = 1;
   } else if (currentPage > totalPages) {
       currentPage = totalPages;
   }

  // Logic for displaying page numbers
  const pageNumber = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
    pageNumbers = pageNumber;
  }
  // let firstNum = currentPage;
  // let lastNum = pageNumber.length;

  var btn_next = document.getElementById("btn_next");
  var btn_prev = document.getElementById("btn_prev");

  const handleClick = (e) => {
    const paginatedbuttons = document.querySelectorAll("a");

    currentPage = e.target.id;
    update(currentPage);

    paginatedbuttons.forEach((btn) => {
      if (btn.id == e.target.id) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  };

  const prevPage = (e) => {
    const paginatedbuttons = document.querySelectorAll("a");
    if (currentPage > 1) {
      
    
      currentPage--;
      update(currentPage);

    if (currentPage == 1) {
      btn_prev.style.visibility = "hidden";
    } else {
      btn_prev.style.visibility = "visible";
    }

      paginatedbuttons.forEach((btn) => {
        if (btn.id == currentPage) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }
  };

  const nextPage = (e) => {
    const paginatedbuttons = document.querySelectorAll("a");
    if (currentPage < totalPages) {
      currentPage++;
      update(currentPage);

      paginatedbuttons.forEach((btn) => {
        if (btn.id == currentPage) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }

    if (currentPage == totalPages) {
      console.log(totalPages);
      btn_next.style.visibility = "hidden";
    } else {
      btn_next.style.visibility = "visible";
    }
  };

  return (
    pageNumbers.length > 0 && (
      <div className="pagination">
        <a href="#" id="btn_prev" onClick={(e) => prevPage(e)}>
          &laquo;
        </a>
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber == 1) {
            return (
              <a
                className="active"
                href="#"
                id={index + 1}
                key={index}
                onClick={(e) => handleClick(e, index + 1)}
              >
                {pageNumber}
              </a>
            );
          } else {
            return (
              <a
                href="#"
                id={index + 1}
                key={index}
                onClick={(e) => handleClick(e, index + 1)}
              >
                {pageNumber}
              </a>
            );
          }
        })}
        <a href="#" id="btn_next" onClick={(e) => nextPage(e)}>
          &raquo;
        </a>
      </div>
    )
  );
};

export default Pagination;
