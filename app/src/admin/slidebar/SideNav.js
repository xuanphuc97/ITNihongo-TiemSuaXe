import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideNav.scss";
import {
  AiOutlineUser,
  AiOutlineDashboard,
  AiOutlineCar,
} from "react-icons/ai";
import { BiServer } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    if (window.innerWidth <= 768) {
      return true;
    } else {
      return false;
    }
  });
  const handleCollapsed = () => {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };
  window.addEventListener("resize", handleCollapsed);
  return (
    <div className="sidebar-container">
      <ProSidebar className="menu-sidebar" collapsed={collapsed}>
        <div className="logo">
          <img src="" alt="" className="sidebar__logo" />
        </div>
        <Menu iconShape="circle">
          <MenuItem className="menu-item" icon={<AiOutlineDashboard />}>
            <span className="title">Dashboard</span>
            <Link to="/admin" />
          </MenuItem>

          <MenuItem className="menu-item" icon={<AiOutlineUser />}>
            <span className="title">Users</span>
            <Link to="/admin/users" />
          </MenuItem>

          <MenuItem className="menu-item" icon={<AiOutlineCar />}>
            <span className="title">Garages</span>
            <Link to="/admin/garages" />
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
