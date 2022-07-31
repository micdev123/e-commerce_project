import { Link } from "react-router-dom";
import { LineStyle, PermIdentity, Storefront, } from "@material-ui/icons";
import { SiEventstore } from 'react-icons/si';

import './css/sideNav.css'
import { ImProfile } from "react-icons/im";
import { HiUsers } from "react-icons/hi";


export default function SideNav() {
    return (
        <div className="sidebar">
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
                                <Storefront className="sidebarIcon" />
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
    );
}
