/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { HTTPURL, APIKEY, FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import { Link } from "react-router-dom";
import Pagination from "../../../common/components/Pagination";
import placeholder from '../../../assets/images/product-placeholder.gif'

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      showmodal: true,
      title:'',
      description: '',
      cost: '',
      courseid: '',
      students: [],
      currentPage: 1,
      numberPerPage: 10,
      totalLists: [],
      pageNumbers: [],
      currentLists: [],
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.props.user.role === "admin" && this.getStudents();
  }

  async getStudents() {
    this.state.showLoader();

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(HTTPURL + `training/liststudents`, {
      headers: headers,
    }).then((response) => response.json());
    this.state.hideLoader();
    
    if (res["status"]) {
      this.setState({ students: res["data"].students, totalLists: res["data"].total });
      this.getPageNo();
      
    }
  }

  async getPageNo() {
    const { currentPage, numberPerPage } = this.state;

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    await fetch(
      HTTPURL +
        `training/liststudents?userid=${this.state.user.userid}&pageno=${currentPage}&limit=${numberPerPage}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data["students"]);
        this.setState({currentLists: data.data["students"]})
      });
  }


  update = (newPage) => {   
      // Update page number
 
    const {numberPerPage} = this.state;

    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
     fetch(
      HTTPURL +
        `training/liststudents?userid=${this.state.user.userid}&pageno=${newPage}&limit=${numberPerPage}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({currentLists: data.data["students"]})
      });

  };

  getpageLimit (pagelimit) {  

    this.setState({numberPerPage: pagelimit})
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    fetch(
      HTTPURL +
        `training/liststudents?userid=${this.state.user.userid}&limit=${pagelimit}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({currentLists: data.data["students"]})
      });
  };

  async updateModal(id) {

    const selectedStudent = this.state.totalLists.find(item => item.id == id);
    await this.setState({
      firstname: selectedStudent.firstname,
      description: selectedStudent.description,
      cost: selectedStudent.cost,
      courseid: selectedStudent.id,
    });
    let modal = document.getElementById("updateModal");
    modal.style.display = "block";
  }

  closeupdateModal() {
    let modal = document.getElementById("updateModal");
    modal.style.display = "none";
  }
  convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
  
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
  
            line += array[i][index];
        }
  
        str += line + '\r\n';
    }
  
    return str;
  }
  
  exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }
  
    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);
  
    var csv = this.convertToCSV(jsonObject);
  
    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
  
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
  }
  
  exportData(){
  var headers = {
      model: 'Phone Model'.replace(/,/g, ''), // remove commas to avoid errors
      chargers: "Chargers",
      cases: "Cases",
      earphones: "Earphones"
  };
  
  let itemsNotFormatted = [
      {
          model: 'Samsung S7',
          chargers: '55',
          cases: '56',
          earphones: '57',
          scratched: '2'
      },
      {
          model: 'Pixel XL',
          chargers: '77',
          cases: '78',
          earphones: '79',
          scratched: '4'
      },
      {
          model: 'iPhone 7',
          chargers: '88',
          cases: '89',
          earphones: '90',
          scratched: '6'
      }
  ];
  
  var itemsFormatted = [];
  
  // format the data
  this.state.currentLists.forEach((item) => {
      itemsFormatted.push({
        Name: item.lastname + item.firstname,  //.replace(/,/g, ''), // remove commas to avoid errors,
        Email: item.email,
        Telephone: item.telephone,
        Gender: item.gender
      });
  });
  
  var fileTitle = 'orders'; // or 'my-unique-title'
  
  this.exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
  }
  exportData() {
    let data = JSON.stringify(this.state.totalLists);
}

  render() {
   const {user} = this.state;

    return (
      <div className="container-fluid">
          <div className="w-100 text-center">
            <h3>Students </h3>
          </div>

          {user.role === "admin"
         ? <div className="row mt-4 d-flex justify-content-end mb-3 mr-2" >
            <button onClick={this.exportData()} id="exportButton" className="btn btn-sm btn-danger new_product mr-2">
              <i className="fa fa-file-excel"></i> 
              <small>Export to Excel</small>
            </button>

              <Link to="/addstudent">
                <button type="button" className="btn btn-sm btn-primary new_product mr-2">
                    <i className="fas fa-plus" aria-hidden="true">
                        <small style={{ color: '#fff' }}>&nbsp;Add&nbsp;Student</small>
                    </i>
                </button>
              </Link>
          </div> 
          : <span></span>
        }

          <div className="col-md-12 box1 mb-3" id="profile">
            {!this.state.loaderActive && this.state.totalLists === 0 ? (
              <div className="alert alert-warning mt-5" role="alert">
                <h6 className="text-center">No student records!</h6>
              </div>
            ) : (
              <div>
                <div id="table" className="card pt-2 mt-3 justify-content-center shadow px-2">
                  <div className="table-responsive">
                    <table
                      data-show-export="true"
                      className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart"
                      id="myTable"
                    >
                      {/* <caption>Hello World!</caption> */}
                      <thead>
                        <tr>
                        <th>Image</th>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Telephone</th>
                          <th>Gender</th>
                          <th>Company Role</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.currentLists.map((student, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                  <img style={{width: '50px'}} src={FILEURL + student.imageurl} onError={(e) => { e.target.onerror = null; e.target.src = placeholder }} />
                              </td>
                              <td>{student.createdat}</td>
                              <td>{student.lastname} {student.firstname}</td>
                              <td>{student.email}</td>
                              <td>{student.telephone}</td>
                              <td>{student.gender}</td>
                              <td>
                                {student.companyrole}
                              </td>
                              <td
                                className="align-middle"
                                style={{ cursor: "pointer" }}
                              >
                              <Link to={() => `/viewstudent/${student.userid}`}>
                                <span
                                  className="btn btn-sm btn-primary"
                                  value={student.id}
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="fas fa-eye fa-fw "></i>
                                </span>
                              </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {this.state.pageNumbers && (
              <div className="row mt-5">
                <div className="col-md-4">
                  <div className="form-group mt-1">
                    {this.state.totalLists > 0 && (
                      <select
                      onChange={(e) => {
                        this.getpageLimit(e.target.value);
                      }}
                        style={{ maxWidth: "180px" }}
                        name="page"
                        id="page"
                        className="custom-select custom-select-sm "
                        defaultValue="10"
                      >
                        <option value="10" >
                          10
                        </option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                      </select>
                    )}
                  </div>
                </div>

                <div className="col ">
                  <div className="row  justify-content-center text-center">
                    <Pagination
                      numberPerPage={this.state.numberPerPage}
                      currentPage={this.state.currentPage}
                      totalLists={this.state.totalLists}
                      pageNumbers={this.state.pageNumbers}
                      currentLists={this.state.currentLists}
                      update={this.update}
                    />
                  </div>
                </div>
                    <div className="col text-dark font-weight-bold text-right">
                      {/* <span>Showing 1 of 3 entries</span> */}
                    </div>
              </div>
            )}

          </div>
      </div>
    );
  }
}

export default withContext(Students);
