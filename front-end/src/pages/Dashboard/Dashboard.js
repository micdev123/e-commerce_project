import { Helmet } from 'react-helmet-async'
import SideNav from '../../components/SideNav'

import "../Dashboard/dashboard.css";
import FeaturedInfo from '../../components/FeaturedInfo';
import WidgetSm from '../../components/WidgetSm';
import WidgetLg from '../../components/WidgetLg';



const Dashboard = () => {
    return (
        <div>
            <Helmet>
                <title>Dashboard | Home</title>     
            </Helmet>
            <div className='admin_container'>
                <SideNav/>
                <div className='container_contents'>
                    <FeaturedInfo />
                    <div className="homeWidgets">
                        <WidgetSm />
                        <WidgetLg />
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Dashboard