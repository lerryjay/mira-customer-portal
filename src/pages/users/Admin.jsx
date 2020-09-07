import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withContext } from '../../common/context'
import { HTTPURL,FILEURL,APIKEY } from '../../common/global_constant'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props, users : [] }
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

  componentDidMount()
  {
    this.getUsers();
  }

  render() {
    return (
      <div className="container">
        <div className="w-100 text-center">
          <h3>Administrators </h3>
        </div>
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
                <tr>
                  <td>{ index + 1}</td>
                  <td>{ user.firstname }</td>
                  <td>{ user.lastname }</td>
                  <td>{ user.email }</td>
                  <td>{ user.telephone }</td>
                  <td>{ user.status  }</td>
                  <td> 
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id={"dropdownMenuButton"} data-toggle={"dropdown"} aria-haspopup={"true"} aria-expanded={"false"}>
                          Select
                        </button>
                        <div className="dropdown-menu" aria-labelledby={"dropdownMenuButton"}>
                          <a className="dropdown-item" href="#">Add as client</a>
                          <a className="dropdown-item" href="#">Create ticket</a>
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
export default withContext(Admin);