import { PermIdentity, Timeline } from "@material-ui/icons";
import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { SiEventstore } from 'react-icons/si';
import { GiMoneyStack } from 'react-icons/gi';


import { Store } from "../Store";
import { userRequest } from "../requestController";
import { getError } from "../utils";
import './css/featuredInfo.css';

import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis, } from "recharts";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                summary: action.payload,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export default function FeaturedInfo() {
    const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });
    const { state } = useContext(Store);
    const { userInfo } = state;

    const [userStats_, setUserStats] = useState([]);

    const MONTHS = useMemo(
      () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec",],
      []
    );

    useEffect(() => {
        const getSummary = async () => {
            try {
                const { data } = await userRequest.get('orders/summary', {
                    headers: { token: `Bearer ${userInfo.accessToken}` },
                });
                data.income.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales : item.total }
                    ])
                )
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err),});
            }
        };
        getSummary();
    }, [userInfo, MONTHS]);
    // console.log(summary);
    return (
        loading ? (<p>Loading</p>) : error ? (<p className="danger">{error}</p>) : (
            <>
                <div className="featured">
                    <div className="featuredItem">
                        <span className="featuredTitle">
                            <GiMoneyStack />
                            Revenue
                        </span>
                        <div className="featuredMoneyContainer">
                            <span className="featuredMoney">
                                Le {summary.orders && summary.users[0] ? summary.orders[0].totalSales.toFixed(2) : 0}
                            </span>
                        </div>
                        <span className="featuredSub">Compared to last month</span>
                    </div>
                    <div className="featuredItem">
                        <span className="featuredTitle">
                            <SiEventstore />
                            Orders
                        </span>
                        <div className="featuredMoneyContainer">
                            <span className="featuredMoney">
                            {summary.orders && summary.users[0] ? summary.orders[0].numOrders : 0}
                            </span>
                        </div>
                        <span className="featuredSub">Compared to last month</span>
                    </div>
                    <div className="featuredItem">
                        <span className="featuredTitle">
                            <PermIdentity />
                            User
                        </span>
                        <div className="featuredMoneyContainer">
                            <span className="featuredMoney">
                            {summary.users && summary.users[0] ? summary.users[0].numUsers : 0}
                            </span>
                        </div>
                        <span className="featuredSub">Compared to last month</span>
                    </div>
                </div>
                
                <div className="chart">
                    <h3 className="chartTitle">
                        <Timeline />
                        Order Analytics
                    </h3>
                    <ResponsiveContainer width="100%" aspect={4 / 1}>
                        <LineChart data={userStats_}>
                            <Line type="monotone" dataKey= 'Sales' stroke="#5550bd" />
                            {<CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                            <XAxis dataKey="name" stroke="#5550bd" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </>
        )
    );
}
