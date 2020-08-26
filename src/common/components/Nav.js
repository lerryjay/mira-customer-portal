import React from 'react';


const Nav = () => {

    // const toggle = () => {
    //     //Link click remove sidebar
    //     document.querySelectorAll(".nav-item").forEach(item => {
    //         item.addEventListener("click", () => {
    //             document.querySelector('#sidebar').classList.toggle('active');
    //             document.querySelector('.overlay').classList.toggle('active');
    //         })
    //     })
    //     // onclick Toggle button add sideBar
    //     document.querySelector("#sidebarCollapse").addEventListener("click", () => {
    //         document.querySelector('#sidebar').classList.toggle('active');
    //         document.querySelector('.overlay').classList.toggle('active');
    //         document.querySelector('#sidebar').classList.toggle('sidemenu');
    //     })
    //     //onclick overlay hide sideBar
    //     document.querySelector(".overlay").addEventListener("click", () => {
    //         document.querySelector('#sidebar').classList.remove('active');
    //         document.querySelector('.overlay').classList.remove('active');
    //     });
    // }



    const toggle1 = () => {
        // onclick Toggle button add sideBar
        document.querySelector('#sidebar').classList.toggle('active');
        document.querySelector('.overlay').classList.toggle('active');
        document.querySelector('#sidebar').classList.toggle('sidemenu');
    }


    
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-navbar px-2 fixed-top up" id="Navigation">

            <div>
                <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt="AppLogo" width="40" />
                <span className="logoname text-uppercase h6">Ticket App</span>
            </div>

            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#ticketNav"
                aria-controls="ticketNav" aria-expanded="false" aria-label="Toggle navigation" id="sidebarCollapse" onClick={toggle1}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="ticketNav">
                <ul className="navbar-nav mr-auto">
                    <li className="mb-1">

                    </li>
                </ul>
            </div>

            {/* <span className="">
                <i id='btn-toggle' className="fas fa-moon"></i>
                <i id='btn-toggle' className="fas fa-sun sr-only"></i>
            </span> */}
        </nav>)
}
export default Nav;