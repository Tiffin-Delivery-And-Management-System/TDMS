import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
 return (
  <div className="sidebar">
   <div className="sidebar-options">
    <NavLink to="/customerHome" className="sidebar-option">
     <img src={assets.home_icon} alt="" />
     <p>Vendors List</p>
    </NavLink>
    {/* <NavLink to='/deliveredorderlist' className="sidebar-option">
            <img src={assets.list_icon} alt="" />
            <p>Delivered Order List</p>
        </NavLink> */}
   </div>
  </div>
 );
};

export default Sidebar;
