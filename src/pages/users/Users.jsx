/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withContext } from '../../common/context'
import Pagination from '../../common/components/Pagination'

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      ...this.props, 
      loader: false,
      currentPage: 1,
      numberPerPage: 10,
      totalLists: this.props.users,
      pageNumbers: [],
      currentLists: []
    }
  }

  showDropdown(userid){
    let dropdown = document.getElementById(userid);
    if(dropdown.style.display === "none"){
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none"
    }
  }

  update = (newPage) => {
    this.setState({currentPage:newPage});
  }

  render() {
    
    const { numberPerPage,currentPage, totalLists} = this.state

    // Logic for displaying current lists
    const indexOfLastList = currentPage * numberPerPage;
    const indexOfFirstList = indexOfLastList - numberPerPage;
    const currentLists = totalLists.slice(indexOfFirstList, indexOfLastList);
    this.state.currentLists = currentLists


    return (
      <div className="container-fluid mt-4">
        <div className="w-100 text-center">
          <h3 className="text-uppercase">Customers </h3>
        </div>

        {this.state.loader && 
        <div className="spin-center">
        <span class="text-primary ">
          <span class="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true"></span>
          Loading...
        </span>
        </div>
        }

        {!this.state.loader && this.state.users.length === 0 ?
                                <div className="card-body">
                                    <div className="alert alert-warning" role="alert">
                                        <h6 className="text-center">No Customer records!</h6>
                                    </div>
                                    </div>
                                    :
      !this.state.loader && 
      
      <div className="table-responsive">
      <table className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Business Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.currentLists.map((user,index)=>
                <tr>
                  <td>{ index + 1}</td>
                  <td>{ user.firstname }</td>
                  <td>{ user.lastname }</td>
                  <td>{ user.email }</td>
                  <td>{ user.telephone }</td>
                  <td>{ user.isclient ? user.businessname : 'Not a client' }</td>
                  <td> 
                    <div className="dropdown">
                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" onClick={()=> this.showDropdown(user.userid)} id={"dropdownMenuButton"} data-toggle={"dropdown"} aria-haspopup={"true"} aria-expanded={"false"}>
                          Select
                        </button>
                        <div className="dropdown-menu" id={user.userid} aria-labelledby={"dropdownMenuButton"}>
                          <Link to={() => `/userprofile/${user.userid}`} className="dropdown-item"> View Profile </Link>
                          <Link to={() => `/createuserticket/${user.userid}`} className="dropdown-item"> Create Ticket </Link>
                          {!user.isclient && <Link to={() => `/createclient/${user.userid}`} className="dropdown-item"> Create Client Account </Link>}
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item text-danger" href="#">Suspend Account</a>
                        </div>
                      </div>
                    </td>
                </tr>
              )
            }
          </tbody>
        </table>
          </div>
  }

  {/* Pagination */}
  {this.state.totalLists.length > 0  && 
       <div className="row mt-5">
         <div className="col-md-4">
            <div className="form-group mt-1">
            {this.state.users.length > 0 &&  
            <select 
                onChange={(e) => {
                  this.setState({ numberPerPage: e.target.value });
                }}
               style={{ maxWidth: "180px" }}
              name="page" id="page" className=" form-control form-select form-select-sm">
                    <option value="10" selected>10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
                }
            </div>
         </div>

         <div className="col-md-8 ">
            <div className="row  justify-content-center text-center">
            <Pagination numberPerPage={this.state.numberPerPage} currentPage={this.state.currentPage} totalLists={this.state.users} pageNumbers={this.state.pageNumbers} currentLists={this.state.currentLists} update={this.update} />
            </div>  
           </div> 
         </div>
        }
      </div>
    )
  }
}
export default withContext(Users);