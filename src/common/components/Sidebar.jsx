import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import avatar from '../../assets/images/avatar.png'

const Sidebar = (props) => {

    const [clientDropdownOpen, setClientDropdown] = useState('none');
    const [ticketDropdownOpen, setTicketDropdown] = useState('none');
    const [productDropdownOpen, setProductDropdown] = useState('none');

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
                        <p className="image_name mb-0">{sessionStorage.getItem("name")}</p>
                    </div>
                    <p className="mt-2 mb-2">MENU</p>
                    <hr className="bg-white mb-0 mt-0" />
                    <NavLink className={`dropdown-btn nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to="dashboard" onClick={toggle2}>
                        <li className="nav-item ">
                            <i className="fa fa-tachometer-alt mr-1"></i>&nbsp;Dashboard
                        </li>
                    </NavLink>

                    <div className="dropdown-btn nav-item" onClick={() => setClientDropdown((clientDropdownOpen === 'none') ? 'block' : 'none')}>
                        <li className="nav-item"> 
                            <i className="fa fa-user mr-1"></i>&nbsp;Client
                            <i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </div>
                    <div className="dropdown-container" style={{display: clientDropdownOpen}}>
                        <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/createClient' onClick={toggle2}>
                            <li className="nav-item">
                                <i className="fa fa-user-friends mr-1"></i>&nbsp;Add&nbsp;Client
                        </li>
                        </NavLink>
                        <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/listClient' onClick={toggle2}>
                            <li className="nav-item">
                                <i className="fa fa-list-ol mr-1"></i>&nbsp;List&nbsp;Client
                        </li>
                        </NavLink>
                    </div>
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

                    <div className="dropdown-btn nav-item" onClick={() => setProductDropdown((productDropdownOpen === 'none') ? 'block' : 'none')}>
                        <li className="nav-item ">
                            <i className="fa fa-ticket-alt mr-1"></i>&nbsp;Product&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </div>
                    <div className="dropdown-container" style={{display: productDropdownOpen}}>
                        <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/createproduct' onClick={toggle2}>
                            <li className="nav-item">
                                <i className="fa fa-list-ul mr-1"></i>&nbsp;Add&nbsp;Product
                        </li>
                        </NavLink>
                        <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/viewproduct' onClick={toggle2}>
                            <li className="nav-item">
                                <i className="fas fa-ticket-alt fa-fw mr-1"></i>&nbsp;View&nbsp;Products
                        </li>
                        </NavLink>
                     
                    </div>


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

export default withRouter(Sidebar);
