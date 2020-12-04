import React from "react";

import "react-trumbowyg/dist/trumbowyg.min.css";
import Trumbowyg from "react-trumbowyg";

const AddDeploymentForm = ({
  files,
  getModule,
  handleSubmit,
  type,
  products,
  deploymentcost,
  handleInputChange,
  deploymentstatus,
  deploymentdate,
  trainingcost,
  trainingstatus,
  trainingdate,
  paymentdate,
  paymentstatus,
  expirationstatus,
  expirationdate,
  licenseduration,
  remarks,
  modules,
  loading,
  deploymentDate,
  trainingDate,
  paymentDate,
  expirationDate,
  handleImageChange,
  addModule,
  removeModule,
  updatetype

}) => {

    
  const onFocus = (e) => {
    console.log(e)
    e.currentTarget.type = "date";
  }
  const  handleCheck = ({ target }) => {
    if (target.checked) {
      target.removeAttribute("checked");
      addModule(target.id);
    } else {
      target.setAttribute("checked", true);
      removeModule(target.id);
    }
  };

  return (
    <div className="container mx-auto row">
      <div className="col-md-12 mb-3 mt-4" id="profile">
        <form onSubmit={handleSubmit} id="addclientproduct">
          <div className="card">
            <div className="card-header bg-medium font-weight-bold text-dark">
              ADD CLIENT PRODUCT
            </div>

            <div className="card-body px-5">
              <div className="form-group  mb-3">
                <select
                  onChange={(e) => {
                    getModule(e.target.value);
                    updatetype(e.target.value) ;
                  }}
                  value={type}
                  name="type"
                  id="type"
                  className="custom-select custom-select-sm"
                  defaultValue=""
                >
                  <option value="" disabled>
                    ---Select&nbsp;product---&nbsp;
                  </option>

                  {products.map((product, i) => {
                    return (
                      <option key={i} value={product.id}>
                        {product.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="row">
                <div className="col-md-4 mb-1">
                  <div className="form-group">
                    <label
                      htmlFor="deploymentcost"
                      className="font-weight-bold"
                    >
                      Deployment Cost
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text bg-white py-1 alt">
                        &#8358;
                      </span>

                      <input
                        type=""
                        className="form-control form-control-sm py-3 border-left-0"
                        name="deploymentcost"
                        id="deploymentcost"
                        placeholder="Deployment Cost"
                        value={deploymentcost}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-1">
                  <div className=" form-group">
                    <label
                      htmlFor="deploymentstatus"
                      className="font-weight-bold"
                    >
                      Deployment Status
                    </label>
                    <select
                      className="custom-select custom-select-sm"
                    //   onChange={(e) => {
                    //     this.setState({ deploymentstatus: e.target.value });
                    //   }}
                      value={deploymentstatus}
                      name="deploymentstatus"
                      id="deploymentstatus"
                      style={{ height: "35px" }}
                    >
                      <option value="" disabled>
                        Deployment&nbsp;Status&nbsp;
                      </option>
                      <option value="pending">Pending</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="complete">Complete</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4 mb-1">
                  <div className="form-group">
                    <label
                      htmlFor="deploymentdate"
                      className="font-weight-bold"
                    >
                      Deployment Date
                    </label>
                    <input
                      className="form-control form-control-sm"
                      name="deploymentdate"
                      id="deploymentdate"
                      placeholder="Deployment Date"
                      onBlur={deploymentDate}
                      onFocus={onFocus}
                      value={deploymentdate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-1">
                  <div className="form-group">
                    <label htmlFor="trainingcost" className="font-weight-bold">
                      Training Cost
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text bg-white py-1 alt">
                        &#8358;
                      </span>

                      <input
                        type=""
                        className="form-control form-control-sm py-3 border-left-0"
                        name="trainingcost"
                        id="trainingcost"
                        placeholder="Training Cost"
                        value={trainingcost}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-1">
                  <div className=" form-group">
                    <label
                      htmlFor="trainingstatus"
                      className="font-weight-bold"
                    >
                      Training Status
                    </label>
                    <select
                      className="custom-select custom-select-sm"
                    //   onChange={(e) => {
                    //     this.setState({ trainingstatus: e.target.value });
                    //   }}
                      value={trainingstatus}
                      name="trainingstatus"
                      id="trainingstatus"
                      style={{ height: "35px" }}
                    >
                      <option value="" disabled>
                        Training&nbsp;Status&nbsp;
                      </option>
                      <option value="pending">Pending</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="complete">Complete</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4 mb-1">
                  <div className="form-group">
                    <label htmlFor="trainingdate" className="font-weight-bold">
                      Training Date
                    </label>
                    <input
                      type="trainingdate"
                      className="form-control form-control-sm"
                      name="trainingdate"
                      id="trainingdate"
                      placeholder="Training Date"
                      onBlur={trainingDate}
                      onFocus={onFocus}
                      value={trainingdate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-1">
                  <div className="form-group">
                    <label htmlFor="paymentdate" className="font-weight-bold">
                      Payment Date
                    </label>
                    <input
                      type="paymentdate"
                      className="form-control form-control-sm "
                      name="paymentdate"
                      id="paymentdate"
                      placeholder="Payment Date"
                      onBlur={paymentDate}
                      onFocus={onFocus}
                      value={paymentdate}
                      style={{ height: "35px" }}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-1">
                  <div className=" form-group">
                    <label htmlFor="paymentstatus" className="font-weight-bold">
                      Payment Status
                    </label>
                    <select
                      className="custom-select custom-select-sm"
                    //   onChange={(e) => {
                    //     this.setState({ paymentstatus: e.target.value });
                    //   }}
                      value={paymentstatus}
                      name="paymentstatus"
                      id="paymentstatus"
                      style={{ height: "35px" }}
                    >
                      <option value="" disabled>
                        Payment&nbsp;Status&nbsp;
                      </option>
                      <option value="pending">Pending</option>
                      <option value="incomplete">Incomplete</option>
                      <option value="complete">Complete</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-1">
                  <div className=" form-group">
                    <label
                      htmlFor="expirationstatus"
                      className="font-weight-bold"
                    >
                      Expiration Status
                    </label>
                    <select
                      className="custom-select custom-select-sm"
                    //   onChange={(e) => {
                    //     this.setState({ expirationstatus: e.target.value });
                    //   }}
                      value={expirationstatus}
                      name="expirationstatus"
                      id="expirationstatus"
                    >
                      <option value="" disabled>
                        Expiration&nbsp;Status&nbsp;
                      </option>
                      <option value="pending">Pending</option>
                      <option value="complete">Complete</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6 mb-1">
                  <div className="form-group">
                    <label
                      htmlFor="expirationdate"
                      className="font-weight-bold"
                    >
                      Expiration Date
                    </label>
                    <input
                      type="expirationdate"
                      className="form-control form-control-sm"
                      name="expirationdate"
                      id="expirationdate"
                      placeholder="Expiration Date"
                      onBlur={expirationDate}
                      onFocus={onFocus}
                      value={expirationdate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-1">
                  <div className="form-group">
                    <label
                      htmlFor="licenseduration"
                      className="font-weight-bold"
                    >
                      License Coverage
                    </label>
                    <select
                      className="custom-select custom-select-sm"
                    //   onChange={(e) => {
                    //     this.setState({ licenseduration: e.target.value });
                    //   }}
                      id="licenseduration"
                      name="licenseduration"
                      value={licenseduration}
                    >
                      <option value="" disabled>
                        License&nbsp;Coverage
                      </option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quaterly">Quarterly</option>
                      <option value="bi-annual">Bianually</option>
                      <option value="annual">Annually</option>
                      <option value="indefinite">Indefinite</option>
                    </select>
                  </div>
                </div>{" "}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="remarks" className="font-weight-bold">
                      Deployment Remarks
                    </label>

                    <Trumbowyg
                      //  id='react-trumbowyg'
                      id="remarks"
                      placeholder="Remarks"
                      value={remarks}
                      onChange={handleInputChange}
                    />

                    {/* <textarea
                    type="text"
                    className="form-control form-control-sm"
                    name="remarks"
                    rows="7"
                    id="remarks"
                    placeholder="Remarks"
                    value={remarks}
                    onChange={handleInputChange}
                  /> */}
                  </div>
                </div>
              </div>

              <div className="row">
                {modules.length > 0 ? (
                  modules.map((module, i) => (
                    <div className="col-md-4" key={i}>
                      <p className="list-group-item">
                        {module.name}{" "}
                        <label className="switch float-right">
                          {" "}
                          <input
                            type="checkbox"
                            id={module.id}
                            onClick={handleCheck}
                          />
                          <span className="slider round"></span>
                        </label>
                      </p>
                    </div>
                  ))
                ) : (
                  <span></span>
                  // <div>
                  //   <div className="container-fluid">
                  //     <div
                  //       className="alert alert-warning text-center"
                  //       role="alert"
                  //     >
                  //       Select a product!
                  //   </div>
                  //   </div>
                  // </div>
                )}
              </div>
              <div className="row justify-content-center" id="preview">
                {files}
              </div>
            </div>

            <div className="card-footer">
              <label
                htmlFor="files"
                className="btn btn-sm btn-primary py-2 px-3"
              >
                Attach Liscence and Files{" "}
              </label>
              <i className="font-weight-bold">
                {" "}
                The only accepted files are *pdf, *jpg and *png
              </i>
              <input
                style={{ display: "none" }}
                type="file"
                id="files"
                className="form-file form-file-sm"
                name="files[]"
                placeholder=""
                multiple
                onChange={(e) => handleImageChange(e)}
              />
              <div className="float-right">
                {loading ? (
                  <button type="submit" className="btn btn-sm bg-button px-4">
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                      id="loader"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary px-3 py-2"
                  >
                    <i className="fas fa-folder-open mr-2"></i>
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeploymentForm;
