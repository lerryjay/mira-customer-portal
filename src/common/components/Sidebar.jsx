import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const Sidebar = (props) => {

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
                    <p className="py-2 text-white">
                        <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt="icon"
                            width='35' />&nbsp;&nbsp;Hello World
                        </p>
                    <hr className="bg-white" />
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to="dashboard" onClick={toggle2}>
                        <li className="nav-item active">
                            <i className="fa fa-tachometer-alt"></i>&nbsp;Dashboard<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/createClient' onClick={toggle2}>
                        <li className="nav-item active">
                            <i className="fa fa-user-friends"></i>&nbsp;Add&nbsp;Client&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/viewClient' onClick={toggle2}>
                        <li className="nav-item active">
                            <i className="fa fa-user-friends"></i>&nbsp;View&nbsp;Client&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/listClient' onClick={toggle2}>
                        <li className="nav-item">
                            <i className="fa fa-list-ol"></i>&nbsp;List&nbsp;Client&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/creatUser' onClick={toggle2}>
                        <li className="nav-item">
                            <i className="fa fa-user-plus"></i>&nbsp;Create&nbsp;User&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/ticketList' onClick={toggle2}>
                        <li className="nav-item">
                            <i className="fa fa-list-ul"></i>&nbsp;Ticket&nbsp;List&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='a' onClick={toggle2}>
                        <li className="nav-item">
                            <i className="fas fa-ticket-alt fa-fw"></i>&nbsp;View&nbsp;Ticket&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to="profile" onClick={toggle2}>
                        <li className="nav-item">
                            <i className="fas fa-user fa-fw"></i>&nbsp;Profile&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/changePassword' onClick={toggle2}>
                        <li className="nav-item">
                            <i className="fas fa-key fa-fw"></i>&nbsp;Change&nbsp;Password
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} className="text-center" to='/login'>
                        <li className="nav-item last" style={{ margin: "0 35%" }} >
                            <i className="fas fa-power-off text-danger">&nbsp;<b
                                style={{ color: "white" }}>&nbsp;Logout</b></i>
                        </li>
                    </NavLink>
                </ul>
            </div>
            <div className="overlay" onClick={toggle2}></div>
        </div>
    )
}

export default withRouter(Sidebar);
