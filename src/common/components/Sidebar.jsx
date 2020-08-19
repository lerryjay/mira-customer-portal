import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const Sidebar = (props) => {

    return (
        <div>
            <div className="sidemenu" id="sidebar">
                <ul className="list-unstyled components">
                    <p className="py-2 text-white">
                        <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt="icon"
                            width='35' />&nbsp;&nbsp;Hello World
                        </p>
                    <hr className="bg-white" />
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to="dashboard">
                        <li className="nav-item active">
                            <i className="fa fa-tachometer-alt"></i>&nbsp;Dashboard<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='a'>
                        <li className="nav-item active">
                            <i className="fa fa-user-friends"></i>&nbsp;Add&nbsp;Client&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='a'>
                        <li className="nav-item active">
                            <i className="fa fa-user-friends"></i>&nbsp;View&nbsp;Client&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='a'>
                        <li className="nav-item">
                            <i className="fa fa-list-ol"></i>&nbsp;List&nbsp;Client&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='a'>
                        <li className="nav-item">
                            <i className="fa fa-user-plus"></i>&nbsp;Create&nbsp;User&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='a'>
                        <li className="nav-item">
                            <i className="fa fa-list-ul"></i>&nbsp;Ticket&nbsp;List&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='a'>
                        <li className="nav-item">
                            <i className="fas fa-ticket-alt fa-fw"></i>&nbsp;View&nbsp;Ticket&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to="#profile">
                        <li className="nav-item">
                            <i className="fas fa-user fa-fw"></i>&nbsp;Profile&nbsp;<i
                                className="fas fa-chevron-left fa-fw float-right"></i>
                        </li>
                    </NavLink>
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} to='/changePassword'>
                        <li className="nav-item">
                            <i className="fas fa-key fa-fw"></i>&nbsp;Change&nbsp;Password
                        </li>
                    </NavLink>
                    {/* <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} className="ext-center" to='a'>
                        <li className="nav-item last" style={{ margin: "0 35%" }} >
                            <i className="fas fa-power-off text-danger">&nbsp;<b
                                style={{ color: "white" }}>&nbsp;Logout</b></i>
                        </li>
                    </NavLink> */}
                </ul>
            </div>
            <div className="overlay"></div>
        </div>
    )
}

export default withRouter(Sidebar);
