import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import avatar from '../../assets/images/avatar.png'

import { withContext } from '../context';
import { clientMenu, adminMenu } from '../global_constant';

const Sidebar = (props) => {
    console.log(props);
    const { user } =  props;
    const [clientDropdownOpen, setClientDropdown] = useState('none');
    const [productDropdownOpen, setProductDropdown] = useState('none');
    const [ticketDropdownOpen, setTicketDropdown] = useState('none');
    
    const toggle2 = () => {
        //Link click remove sidebar
        document.querySelector('#sidebar').classList.remove('active');
        document.querySelector('#sidebar').classList.add('sidemenu');
        document.querySelector('.overlay').classList.remove('active');
    }
    
    const [menu, setMenu] = useState(user.role === 'admin' ? adminMenu : clientMenu);

    const toggleDropdown =  (toggled) =>{
        console.log(toggled);
        const updated =  menu.map(item=>{
            if(toggled == item) item.isActive = !item.isActive
            return item;
        });
        setMenu(updated);
    }
    return (
        <div>
            <div className="sidemenu" id="sidebar">
                <ul className="list-unstyled components">
                    <div className="py-2 text-white text-center">
                        <img src={avatar} className="image_sidebar my-3" alt="" height="110px" width="110px" />
                        <p className="image_name mb-0">{user.lastname } { user.firstname }</p>
                    </div>
                    <p className="mt-2 mb-2">MENU</p>
                    <hr className="bg-white mb-0 mt-0" />
                    {
                        menu.map(item=>{
                            return(
                                item.isDivider ? 
                               
                                <div className="nav-item px-0">
                                    <li className="nav-item font-weight-bold text-uppercase"><b>{ item.name ? item.name : '' }</b></li>
                                    <hr className="bg-white mt-0 mb-0" />
                                </div> 
                                : 
                                item.sub && item.sub.length > 1 ? 
                                    <div>
                                        <div className="dropdown-btn nav-item" to={ item.route } onClick={()=>toggleDropdown(item)}>
                                            <li className={`"nav-item  ${props.location.pathname === item.route ? "active" : ""}`}>
                                                <i className={`${ item.icon } mr-1 `}></i>&nbsp;{item.name }
                                            </li>
                                        </div> 
                                        <div className="dropdown-container" style={item.isActive ?  {display: 'block'} : { display : 'none'}}>
                                            { item.sub.map((sub)=>{
                                                    return(
                                                        <NavLink className="nav-item" to={ sub.route } onClick={toggle2}>
                                                            <li className={`nav-item ${props.location.pathname === sub.route ? "active" : ""}`}>
                                                                <i className={`${ sub.icon } mr-1`}></i>{ sub.name }
                                                            </li>
                                                        </NavLink>
                                                    );
                                                }) 
                                            }
                                        </div> 
                                    </div> 
                                :
                                <NavLink className="nav-item" to={ item.route } onClick={toggle2}>
                                    <li className={`nav-item  text-white ${props.location.pathname === item.route ? "active" : ""}`}>
                                        <i className={`${item.icon } pr-2`}></i>{item.name }
                                    </li>
                                </NavLink>
                            );
                        })
                    }
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} className="text-center" to='login' onClick={ props.logout }> 
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

export default withRouter(withContext(Sidebar));
