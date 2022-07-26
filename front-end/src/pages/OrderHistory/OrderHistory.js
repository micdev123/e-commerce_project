import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from '../../components/Footer'
import { BsFillEyeFill } from 'react-icons/bs'

import '../OrderHistory/orderHistory.css'
import { Store } from '../../Store'
import { useNavigate } from 'react-router-dom'
import { userRequest } from '../../requestController'
import { getError } from '../../utils'




const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const OrderHistory = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await userRequest.get(`/orders/find/${userInfo._id}`, {
                    headers: { token: `Bearer ${userInfo.accessToken}` }
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error),});
            }
        };
        fetchData();
    }, [userInfo]);

    console.log(orders);
    return (
        <div>
            <div className='main_container'>
                <Helmet>
                    <title>Returns_&_Order</title>     
                </Helmet>
                    <div className='orderHistory_container'>
                        <div className='orderHistory'>
                        <h2>Your Orders History</h2>
                        
                        {loading ? (<div>Loading..</div>) : error ? (<p className='msg'>{error} please login</p>) :
                        (
                            <div>   
                                <div className='orderHead'>
                                    <p>Order ID</p>
                                    <p>Date</p>
                                    <p>Total</p>
                                    <p>Paid</p>
                                    <p>Delivered</p>
                                    <p>Action</p>
                                </div>
                                <div className='history'>
                                    {orders.map((order) => (
                                        <div className='order_' key={order._id}>
                                            <p>{order._id}</p>
                                            <p>{order.createdAt.substring(0, 10)}</p>
                                            <p>{order.totalPrice.toFixed(2)}</p>
                                            <p>
                                                {order.isPaid ? order.paidAt.substring(0, 10) : 'Not Yet'}
                                            </p>
                                            <p>
                                                {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Not Yet'}
                                            </p>
                                            <p onClick={() => {navigate(`/order/${order._id}`);}} className='view'>
                                                <BsFillEyeFill className='eye'/>
                                                Details
                                            </p>
                                        </div>
                                    ))}
                                </div>   
                            </div> 
                        )}   
                        </div>
                    </div>
                
                
            </div>
            <Footer />
        </div>
    )
}

export default OrderHistory