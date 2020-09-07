import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import avatar from '../../assets/images/avatar.png'

const ClientSidebar = (props) => {

    const [ticketDropdownOpen, setTicketDropdown] = useState('none');

    const toggle2 = () => {
        //Link click remove sidebar
        document.querySelector('#sidebar').classList.remove('active');
        document.querySelector('#sidebar').classList.add('sidemenu');
        document.querySelector('.overlay').classList.remove('active');
    }

    return (
        <div>
            <div className="sidemenu" id="sidebar">
                <ul className="list-unstyled components">
                    <div className="py-2 text-white text-center">
                        <img src={avatar} className="image_sidebar my-3" alt="" height="110px" width="110px" />
                        <p className="image_name mb-0">{sessionStorage.getItem("firstname")} {sessionStorage.getItem("lastname")}</p>
                    </div>
                        <p className="mt-2 mb-2">MENU</p>
                    <hr className="bg-white mb-0 mt-0" />
                    <NavLink className={`dropdown-btn nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to="dashboard" onClick={toggle2}>
                    <li className="nav-item ">
                            <i className="fa fa-tachometer-alt mr-1"></i>&nbsp;Dashboard
                        </li>
                    </NavLink>

                    <NavLink className={`dropdown-btn nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/createUser' onClick={toggle2}>
                        <li className="nav-item">
                            <i className="fa fa-user-plus mr-1"></i>&nbsp;Create&nbsp;User
                        </li>
                    </NavLink>
                    <div className="dropdown-btn nav-item" onClick={() => setTicketDropdown((ticketDropdownOpen === 'none') ? 'block' : 'none')}>
                        <li className="nav-item ">
                            <i className="fa fa-ticket-alt mr-1"></i>&nbsp;Ticket&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </div>
                    <div className="dropdown-container" style={{display: ticketDropdownOpen}}>
                        <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/createticket' onClick={toggle2}>
                            <li className="nav-item">
                                <i className="fa fa-list-ul mr-1"></i>&nbsp;Create&nbsp;Ticket
                        </li>
                        </NavLink>
                        <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/ticketList' onClick={toggle2}>
                            <li className="nav-item">
                                <i className="fa fa-list-ul mr-1"></i>&nbsp;Ticket&nbsp;List
                        </li>
                        </NavLink>
                     
                    </div>
                        <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/view_product' onClick={toggle2}>
                            <li className="nav-item">
                                <i className="fas fa-ticket-alt fa-fw mr-1"></i>&nbsp;Products
                        </li>
                        </NavLink>

                    <p className="mt-4 mb-2" >ACCOUNT</p>
                    <hr className="bg-white mt-0 mb-0" />
                    <NavLink className={`dropdown-btn nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to="profile" onClick={toggle2}>
                        <li className="nav-item">
                            <i className="fas fa-user fa-fw mr-1"></i>&nbsp;Profile
                        </li>
                    </NavLink>
                    <NavLink className={`dropdown-btn nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/changePassword' onClick={toggle2}>
                        <li className="nav-item">
                            <i className="fas fa-key fa-fw mr-1"></i>&nbsp;Change&nbsp;Password
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} className="text-center" to='/login' onClick={toggle2}>
                        <p className=" last_" >
                            <i className="fas fa-power-off text-danger mr-1">&nbsp;<b
                                style={{ color: "white" }}>&nbsp;Logout</b></i>
                        </p>
                    </NavLink>
                </ul>
            </div>
            <div className="overlay" onClick={toggle2}></div>
        </div>
    )
}

export default withRouter(ClientSidebar);
