import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { withContext } from '../context';
import { clientMenu, adminMenu } from '../global_constant';

const Sidebar = (props) => {
    const { user } =  props;
    
    const toggle2 = () => {
        //Link click remove sidebar
        document.querySelector('#sidebar').classList.remove('active');
        document.querySelector('#sidebar').classList.add('sidemenu');
        document.querySelector('.overlay').classList.remove('active');
    }
    
    const [menu, setMenu] = useState(user.role === 'admin' ? adminMenu : clientMenu);

    const toggleDropdown =  (toggled) =>{;
        const updated =  menu.map(item=>{
            if(toggled == item) item.isActive = !item.isActive
            return item;
        });
        setMenu(updated);
    }
    return (
        <div>
            <div className="sidemenu pt-5" id="sidebar">
                <ul className="list-unstyled components pl-2">
                    {
                        menu.map((item,i)=>{
                            return(
                                item.isDivider ? 
                               
                                <div className="nav-item px-0" key={i}>
                                    <li className="nav-item font-weight-bold text-uppercase mt-2"><b>{ item.name ? item.name : '' }</b></li>
                                    <hr className="bg-white mt-0 mb-0" />
                                </div> 
                                : 
                                item.sub && item.sub.length > 1 ? 
                                    <div key={i}>
                                        <div className="dropdown-btn nav-item" to={ item.route } onClick={()=>toggleDropdown(item)}>
                                            <li className={`"nav-item  ${props.location.pathname === item.route ? "active" : ""}`}>
                                                <i className={`${ item.icon } float-right pr-3 `}></i>&nbsp;{item.name }
                                            </li>
                                        </div> 
                                        <div className="dropdown-container" style={item.isActive ?  {display: 'block'} : { display : 'none'}}>
                                            { item.sub.map((sub,i)=>{
                                                    return(
                                                        <NavLink key={i} className="nav-item" to={ sub.route } onClick={toggle2}>
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
                                <NavLink key={i} className="nav-item" to={ item.route } onClick={toggle2}>
                                    <li className={`nav-item  text-white ${props.location.pathname === item.route ? "active" : ""}`}>
                                        <i className={`${item.icon } float-right pr-3 `}></i>{item.name }
                                    </li>
                                </NavLink>
                            );
                        })
                    }
                    <NavLink className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} className="text-center" to='login' onClick={ props.logout }> 
                        <div className="logout mt-5">
                            <p className=" last_ mb-0" >
                                <span className="text-left" style={{ color: "white", fontSize:"14px" }}>Logout</span>
                                <i className="fas fa-power-off text-danger float-right pr-3 pt-1"></i>
                            </p>
                        </div>
                    </NavLink>
                </ul>
            </div>
            <div className="overlay" onClick={toggle2}></div>
        </div>
    )
}

export default withRouter(withContext(Sidebar));
