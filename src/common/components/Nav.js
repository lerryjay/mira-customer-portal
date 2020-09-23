import React from 'react';
import avatar from '../../assets/images/avatar.png'
import { withContext } from '../context';
const Nav = (props) => {
    const { user } =  props;

    const toggle1 = () => {
        // onclick Toggle button add sideBar
        document.querySelector('#sidebar').classList.toggle('active');
        document.querySelector('.overlay').classList.toggle('active');
        document.querySelector('#sidebar').classList.toggle('sidemenu');
    }
    
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-navbar px-2 fixed-top up shadow" id="Navigation">

            <div className="container-fluid row">
            <div className="ml-5">
                <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt="AppLogo" height="30" />
                <span className="logoname text-uppercase h6 ml-3">&nbsp; Mira Technologies</span>
              
             
            </div>
                <div className="ml-auto">
                    <span className="image_name mb-0 mr-3">{user.lastname } { user.firstname }</span>                
                    <img src={avatar} className=" avatar-circle" height="30" width="30"/>
                </div>

                
            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#ticketNav"
                aria-controls="ticketNav" aria-expanded="false" aria-label="Toggle navigation" id="sidebarCollapse" onClick={toggle1}>
                {/* <span className="navbar-toggler-icon bg-primary"></span> */}
                <i className="fa fa-align-justify ml-4"></i>
            </button>
            </div>

            


            <div className="collapse navbar-collapse " id="ticketNav">
                <ul className="navbar-nav mr-auto">
                    <li className="mb-1">
                    </li>
                </ul>
            </div>
        </nav>)
}
export default withContext(Nav);