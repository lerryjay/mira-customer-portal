import React from 'react';
import { Link } from 'react-router-dom';


 const Nav = ()=><nav className="navbar navbar-expand-md navbar-dark bg-navbar px-2">
        <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt="" width="40"/>
        <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#ticketNav"
            aria-controls="ticketNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="ticketNav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
            </ul>
        </div>
    </nav>

export default Nav;