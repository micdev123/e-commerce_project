import { Link } from "react-router-dom";
import { LineStyle, PermIdentity } from "@material-ui/icons";
import { SiEventstore } from 'react-icons/si';

import './css/sideNav.css'
import { AiOutlineDropbox } from 'react-icons/ai';
import { HiUsers } from "react-icons/hi";

import { FiMenu } from 'react-icons/fi'


export default function SideNav() {
    return (
        <>
            <div className="sidebar">
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        <div className="adminImg">
                            <FiMenu className="sidebarMenuBar"/>
                            <PermIdentity className="admin_icon" /> 
                        </div>
                        <h3 className="sidebarTitle">Dashboard</h3>
                        <ul className="sidebarList">
                            <Link to="/admin/dashboard" className="link">
                                <li className="sidebarListItem active">
                                    <LineStyle className="sidebarIcon" />
                                    <span>Home</span>
                                </li>
                            </Link>
                            <Link to="/admin/users" className="link">
                                <li className="sidebarListItem">
                                    <HiUsers className="sidebarIcon" />
                                    <span>Users</span>
                                </li>
                            </Link>
                            <Link to="/admin/products" className="link">
                                <li className="sidebarListItem">
                                    <AiOutlineDropbox className="sidebarIcon" />
                                    <span>Products</span>
                                </li>
                            </Link>
                            <Link to="/admin/orders" className="link">
                                <li className="sidebarListItem">
                                    <SiEventstore className="sidebarIcon" />
                                    <span>Orders</span>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    
                </div>
            </div>
            <div className="small_screen_sidebar">
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        
                        <div className="adminImg">
                            <PermIdentity className="admin_icon" />
                        </div>
                        <h3 className="sidebarTitle">Dashboard</h3>
                        <ul className="sidebarList">
                            <Link to="/admin/dashboard" className="link">
                                <li className="sidebarListItem active">
                                    <LineStyle className="sidebarIcon" />
                                    Home
                                </li>
                            </Link>
                            <Link to="/admin/users" className="link">
                                <li className="sidebarListItem">
                                    <HiUsers className="sidebarIcon" />
                                    Users
                                </li>
                            </Link>
                            <Link to="/admin/products" className="link">
                                <li className="sidebarListItem">
                                    <AiOutlineDropbox className="sidebarIcon" />
                                    Products
                                </li>
                            </Link>
                            <Link to="/admin/orders" className="link">
                                <li className="sidebarListItem">
                                    <SiEventstore className="sidebarIcon" />
                                    Orders
                                </li>
                            </Link>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </>
    );
}
