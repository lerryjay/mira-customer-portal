import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withContext } from '../../common/context'
import { HTTPURL,FILEURL,APIKEY } from '../../common/global_constant'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props, users : [] }
  }

  async componentDidMount()
  {
    this.setState({ loader: true });
    await this.getUsers();
    this.setState({ loader: false });
  }

  async getUsers()
  {
    const headers = new Headers();
    headers.append('API-KEY',APIKEY);
    const res = await fetch(HTTPURL + `admin?userid=${ this.props.user.userid }`, {
        headers: headers
    })
    .then(response => response.json());
    if(res['status']){
        this.setState({ users : res['data']});
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

  render() {
    const { user } = this.state;
    return (
      <div className="container-fluid mt-4">
        <div className="w-100 text-center">
          <h3  className="text-uppercase">Administrators </h3>
        </div>
          {this.state.loader && (
            <div className="spin-center">
              <div className="loader"></div> 
            </div>
          )}
        
         {user.role === "admin"
         ? <div className="row mt-4 d-flex justify-content-end mb-3 mr-2" >
              <Link to="/addadmin">
                <button type="button" className="btn btn-sm btn-primary new_product">
                    <i className="fas fa-plus" aria-hidden="true">
                        <small className="newproduct" style={{ color: '#fff' }}>&nbsp;Add&nbsp;Administrator</small>
                    </i>
                </button>
              </Link>
          </div> 
          : <span></span>
        }

          {!this.state.loader && this.state.users.length === 0 ?
            <div className="card-body">
                <div className="alert alert-warning" role="alert">
                    <h6 className="text-center">No Administrator records!</h6>
                </div>
                </div>
                :
                !this.state.loader && 
                
      <div className="table-responsive" style={{minHeight: '100vh'}}>
                <table className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.users.map((user,index)=>
                <tr key={index}>
                  <td>{ index + 1}</td>
                  <td>{ user.firstname }</td>
                  <td>{ user.lastname }</td>
                  <td>{ user.email }</td>
                  <td>{ user.telephone }</td>
                  <td>{ user.status  }</td>
                  <td> 
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" onClick={()=> this.showDropdown(`dropdown${index + 1}`)} id={"dropdownMenuButton"} data-toggle={"dropdown"} aria-haspopup={"true"} aria-expanded={"false"}>
                          Select
                        </button>
                        <div className="dropdown-menu" id={`dropdown${index + 1}`} aria-labelledby={"dropdownMenuButton"}>
                        <Link to={() => `/viewadmin/${user.adminid}`} className="dropdown-item"> View Profile </Link>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item text-danger" href="#">Suspend Account</a>
                          <a className="dropdown-item text-danger" href="#">Delete Account</a>
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
      </div>
    )
  }
}
export default withContext(Admin);