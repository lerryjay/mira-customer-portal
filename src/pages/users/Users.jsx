import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withContext } from '../../common/context'
import { HTTPURL,FILEURL,APIKEY } from '../../common/global_constant'

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props, users : [] }
  }

  async getUsers()
  {
    const headers = new Headers();
    headers.append('API-KEY',APIKEY);
    const res = await fetch(HTTPURL + `user?userid=${ this.props.user.userid }`, {
        headers: headers
    })
    .then(response => response.json());
    if(res['status']){
      console.log(res['data'])
        this.setState({ users : res['data']});
    }
  }

  componentDidMount()
  {
    this.getUsers();
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
    return (
      <div className="container">
        <div className="w-100 text-center">
          <h3>Customers </h3>
        </div>
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
              this.state.users.map((user,index)=>
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
                          <Link to={() => `/createticket/${user.userid}`} className="dropdown-item"> Create Ticket </Link>
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
    )
  }
}
export default withContext(Users);