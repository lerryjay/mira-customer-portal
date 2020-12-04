import React from "react";
import Pagination from "../../common/components/Pagination";

const Paginated = ({
  totalLists,
  numberPerPage,
  currentPage,
  pageNumbers,
  currentLists,
  update,
  getpageLimit,
}) => {
  return (
    <div className="row mt-5">
      <div className="col-md-4">
        <div className="form-group mt-1">
          {totalLists > 0 && (
            <select
              onChange={(e) => {
                getpageLimit(e.target.value);
              }}
              style={{ maxWidth: "180px" }}
              name="page"
              id="page"
              className="custom-select custom-select-sm"
              defaultValue="10"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          )}
        </div>
      </div>

      <div className="col-md-8 ">
        <div className="row  justify-content-center text-center">
          <Pagination
            numberPerPage={numberPerPage}
            currentPage={currentPage}
            totalLists={totalLists}
            pageNumbers={pageNumbers}
            currentLists={currentLists}
            update={update}
          />
        </div>
      </div>
    </div>
  );
};

export default Paginated;
