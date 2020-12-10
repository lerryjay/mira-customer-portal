import React, { Fragment, useState } from "react";

import "react-trumbowyg/dist/trumbowyg.min.css";
import Trumbowyg from "react-trumbowyg";

const AddDeploymentForm = ({files,getModule,handleSubmit,type,modules,handleImageChange,addModule,removeModule,updatetype,products, loading,remarks, handleInputChange,updateDeploymentCosts, showAlert}) => {

  const [fields, setFields] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleCostChange = ({ target })=>{
    const index = target.getAttribute('data-index');
    const name  = target.name;
    
    let cost   = fields[index];
    cost[name] = target.value;
    let costs  = [...fields];
    costs[index] = cost;
    updateDeploymentCosts([...costs ]);
    setFields([...costs ]);
  };

  const handleCheck = ({ target }) => {
    if (target.checked) {
      target.removeAttribute("checked");
      addModule(target.id);
    } else {
      target.setAttribute("checked", true);
      removeModule(target.id);
    }
  };

  const onChangeHandler = event => {
    setInputValue(event.target.value);
  };

  const removeFields = (index) => {
    let filtered = [...fields];
    filtered.splice(index, 1);
    setFields(filtered);
  }

  const addFields = () => {
    if(inputValue.length < 1){ 
      showAlert('danger','Please enter cost title');
      return
    };
    const newField = {
      title: inputValue,
      cost: '',
      duration: '',
      paymentstatus: '',
      paymentdate: ''
    };
    const updatedFields = [...fields];
    updatedFields.push(newField);
    setFields(updatedFields);
    setInputValue('')
  }

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
                <div className="form-group  mb-3">
                  <select onChange={(e) => {  getModule(e.target.value); updatetype(e.target.value); }}  value={type} name="type" id="type" className="custom-select custom-select-sm" defaultValue="">
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
                  <div className="col-md-12">
                    <label htmlFor="costtitle" className="font-weight-bold sr-only">
                      Cost Type
                    </label>
                    <div className="input-group mb-3">
                      <input className="form-control form-control-sm" name="title" type="text" id="title" placeholder="Enter Cost Title" onChange={onChangeHandler} value={inputValue} />
                      <span className="btn btn-primary btn-sm py-1 alt" onClick={(e) => addFields()}>
                        <i className="fa fa-plus"></i> Add New Cost
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div id="inputfields">
                {fields.map((field, index) => {

                  return (
                    <>
                      <div className="row border-1" key={index}>
                        <div className="col-md-5 mb-1">
                          <div className="form-group">
                            <label className="font-weight-bold">
                              Cost Title
                            </label>
                            <input type="text" className="form-control form-control-sm py-3" name="title" data-index={index} placeholder={`${field.title} Cost`} onChange={handleCostChange} disabled/>
                          </div>
                        </div>


                        <div className="col-md-5 mb-1">
                          <div className="form-group">
                            <label  htmlFor="licenseduration"  className="font-weight-bold">
                              License Coverage
                            </label>
                            <select className="custom-select custom-select-sm" id="duration" data-index={index} name="duration" value={field.duration}  onChange={handleCostChange}>
                              <option value="" disabled> License&nbsp;Coverage</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                              <option value="quaterly">Quarterly</option>
                              <option value="bi-annual">Bianually</option>
                              <option value="annual">Annually</option>
                              <option value="indefinite">Indefinite</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-2 mb-1 d-flex align-items-center">
                          <a name="" id="" className="btn btn-danger btn-sm"  onClick={(e) => removeFields(index)} role="button">Remove</a>
                        </div>

                        <div className="col-md-4 mb-1">
                          <div className="form-group">
                            <label className="font-weight-bold">
                              {`${field.title} Cost`}
                            </label>
                            <div className="input-group mb-3">
                              <span className="input-group-text bg-white py-1 alt">
                                &#8358;
                              </span>
                              <input type="text" className="form-control form-control-sm py-3 border-left-0"  data-index={index} name="cost" placeholder="Enter amount" onChange={handleCostChange}/>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4 mb-1">
                          <div className=" form-group">
                            <label htmlFor="status"  className="font-weight-bold">
                              {`${field.title} Status`}
                            </label>
                            <select className="custom-select custom-select-sm" data-index={index} value={field.paymentstatus} name="paymentstatus"  style={{ height: "35px" }}  onChange={handleCostChange}>
                              <option value="" disabled>&nbsp;Status&nbsp;</option>
                              <option value="pending">Pending</option>
                              <option value="ongoing">Ongoing</option>
                              <option value="complete">Complete</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-4 mb-1">
                          <div className="form-group">
                            <label className="font-weight-bold">
                              {`${field.title} Date`}
                            </label>
                            <input className="form-control form-control-sm" data-index={index }  onChange={handleCostChange} value={field.paymentdatepayment} name="paymentdate"  placeholder="Date" type="date"/>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>


              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="remarks" className="font-weight-bold">
                      Deployment Remarks
                    </label>
                    <Trumbowyg id="remarks" placeholder="Remarks" value={remarks} onChange={handleInputChange} data=''/>
                  </div>
                </div>
              </div>

              <div className="row">
              {
                modules.length > 0 ? 
                  modules.map(
                    (module, i) => 
                      <div className="col-md-4" key={i}>
                        <p className="list-group-item">
                          {module.name}{" "}
                          <label className="switch float-right">
                            {" "}
                            <input type="checkbox" id={module.id} onClick={handleCheck}/>
                            <span className="slider round"></span>
                          </label>
                        </p>
                      </div>
                  ) :  <span></span>
              }
              </div>
              <div className="row justify-content-center" id="preview">
                {files}
              </div>

              <div className="card-footer">
                <label htmlFor="files" className="btn btn-sm btn-primary py-2 px-3" >
                  Attach Liscence and Files{" "}
                </label>
                <i className="font-weight-bold">
                    {" "}
                  The only accepted files are *pdf, *jpg and *png
                </i>
                <input style={{ display: "none" }} type="file" id="files" className="form-file form-file-sm" name="files[]" placeholder="" multiple onChange={(e) => handleImageChange(e)}/>
                <div className="float-right">
                { loading ? 
                  <button type="submit" className="btn btn-sm bg-button px-4">
                    <div className="spinner-border text-secondary" role="status" id="loader">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </button>
                  : 
                  <button type="submit" className="btn btn-sm btn-primary px-3 py-2">
                    <i className="fas fa-folder-open mr-2"></i>
                      Save
                  </button>
                }
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeploymentForm;
