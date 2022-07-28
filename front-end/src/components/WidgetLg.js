import { useContext, useEffect, useReducer } from "react";
import { format } from "timeago.js"
import { userRequest } from "../requestController";
import { Store } from "../Store";
import { getError } from "../utils";

import "./css/widgetLg.css";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                orders: action.payload,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export default function WidgetLg() {
    const [{ loading, orders, error }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        const getOrders = async () => {
            try {
                const { data } = await userRequest.get('orders', {
                    headers: { token: `Bearer ${userInfo.accessToken}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
                
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err),});
            }
        };
        getOrders();
    }, [userInfo]);
    // console.log(orders);

    // const Button = ({ type }) => {
    //     return <button className={"widgetLgButton " + type}>{type}</button>;
    // };
    return (
        loading ? ( <p>Loading</p> ) : error ? ( <p className="danger">{error}</p>) : (
            <div className="widgetLg">
                <h3 className="widgetLgTitle">Latest transactions</h3>
                <table className="widgetLgTable">
                    <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                    </tr>
                    {orders.map((order) => (
                    <tr className="widgetLgTr" key={order._id}>
                        <td className="widgetLgUser">
                            <span className="widgetLgName">{order.userId}</span>
                        </td>
                        <td className="widgetLgDate">{format(order.createdAt)}</td>
                        <td className="widgetLgAmount">${order.totalPrice}</td>
                        <td className="widgetLgStatus">
                        
                        </td>
                    </tr>
                    ))}
                </table>
                {/* <Button type={order.status} /> */}
            </div>
        )
    );
}
