import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {

    document.addEventListener("DOMContentLoaded", () => {
        //Link click remove sidebar
        document.querySelectorAll(".nav-item").forEach(item => {
            item.addEventListener("click", () => {
                document.querySelector('#sidebar').classList.remove('active');
                document.querySelector('.overlay').classList.remove('active');
            })
        })
        // onclick Toggle button add sideBar
        document.querySelector("#sidebarCollapse").addEventListener("click", () => {
            document.querySelector('#sidebar').classList.toggle('active');
            document.querySelector('.overlay').classList.toggle('active');
            document.querySelector('#sidebar').classList.toggle('sidemenu');
        })
        //onclick overlay hide sideBar
        document.querySelector(".overlay").addEventListener("click", () => {
            document.querySelector('#sidebar').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        });
    })

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-navbar px-2 fixed-top up" id="Navigation">
            <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt="" width="40" />
            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#ticketNav"
                aria-controls="ticketNav" aria-expanded="false" aria-label="Toggle navigation" id="sidebarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="ticketNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="#">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Link</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link disabled" to="#" tabIndex="-1" aria-disabled="true">Disabled</Link>
                    </li>
                    <li className="mt-2">
                        <i id='btn-toggle' className="fas fa-moon"></i>
                        <i id='btn-toggle' className="fas fa-sun sr-only"></i>
                    </li>
                </ul>
            </div>
        </nav>)
}
export default Nav;