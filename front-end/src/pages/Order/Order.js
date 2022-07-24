import React, { useContext, useEffect, useReducer, useState } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import { userRequest } from '../../requestController';
import { Store } from '../../Store';
import { getError } from '../../utils';
import { toast } from 'react-toastify';

import '../Order/order.css'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
        return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
        case 'PAY_REQUEST':
          return { ...state, loadingPay: true };
        case 'PAY_SUCCESS':
          return { ...state, loadingPay: false, successPay: true };
        case 'PAY_FAIL':
          return { ...state, loadingPay: false };
        case 'PAY_RESET':
          return { ...state, loadingPay: false, successPay: false };
        // case 'DELIVER_REQUEST':
        //   return { ...state, loadingDeliver: true };
        // case 'DELIVER_SUCCESS':
        //   return { ...state, loadingDeliver: false, successDeliver: true };
        // case 'DELIVER_FAIL':
        //   return { ...state, loadingDeliver: false };
        // case 'DELIVER_RESET':
        //   return {
        //     ...state,
        //     loadingDeliver: false,
        //     successDeliver: false,
        //   };
        default:
        return state;
    }
}


const ReviewOrderContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1.2fr;
    gap: 1rem;
    align-items: flex-start;
    margin: 2rem 0;

    /* Tablet Devices :: Media Queries */
    @media screen and (min-width : 768px) and (max-width : 1024px) {
        grid-template-columns: 1fr;
    }

    /* Mobile Devices :: Media Queries */
    @media screen and (min-width : 320px) and (max-width : 480px) {
        grid-template-columns: 1fr;
    }
`

const Order = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;

    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();

    const [msg, setmsg] = useState('');
    const [convert, setConvert] = useState(0);


    const [{ loading, error, order, successPay, loadingPay, loadingDeliver, successDeliver }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
        successPay: false,
        loadingPay: false,
    });

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: { value: order.totalPrice },
                },
            ],
        })
        .then((orderID) => {
            return orderID;
        });
    }

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            // updating the backend
            try {
                dispatch({ type: 'PAY_REQUEST' });
                const { data } = await userRequest.put(`/orders/${order._id}/pay`, details,
                {
                    headers: { token: `Bearer ${userInfo.accessToken}` },
                }
                );
                dispatch({ type: 'PAY_SUCCESS', payload: data });
                toast.success('Order is paid');
            }
            catch (err) {
                dispatch({ type: 'PAY_FAIL', payload: getError(err) });
                setmsg(getError(err));
            }
        });
    }

    function onError(err) {
        setmsg(getError(err));
    }


    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await userRequest.get(`/orders/find/${orderId}`, {
                    headers: { token: `Bearer ${userInfo.accessToken}`},
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };

        if (!userInfo) {
            return navigate('/login');
        }
        // fetchOrder();
        if (!order._id || successPay || successDeliver || (order._id && order._id !== orderId)) {
            fetchOrder();
            if (successPay) {
                dispatch({ type: 'PAY_RESET' });
            }
            if (successDeliver) {
                dispatch({ type: 'DELIVER_RESET' });
            }
        }
        else {
            const loadPaypalScript = async () => {
                const { data: clientId } = await userRequest.get('/keys/paypal', {
                    headers: { token: `Bearer ${userInfo.accessToken}` },
                });
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': clientId,
                        currency: 'USD',
                    },
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };
            loadPaypalScript();
        }
    }, [order, orderId, userInfo, navigate, paypalDispatch, successPay, successDeliver]);

    async function deliverOrderHandler() {
        try {
            dispatch({ type: 'DELIVER_REQUEST' });
            const { data } = await userRequest.put(`/orders/${order._id}/deliver`,
                {},
                {
                    headers: { token: `Bearer ${userInfo.accessToken}` },
                }
            );
            dispatch({ type: 'DELIVER_SUCCESS', payload: data });
            toast.success('Order is delivered');
        }
        catch (err) {
            setmsg(getError(err));
            dispatch({ type: 'DELIVER_FAIL' });
        }
    }
    
    return (
        loading ? (<div>Loading..</div>) :
        (
            <div>
                <div className='main_container'>
                    <Helmet>
                        <title>Order {orderId}</title>     
                    </Helmet>
                    {msg && (<p className='msg'>{msg}</p>)}
                    <ReviewOrderContainer>
                        <div className='order_info'>
                            <div className='shipping_details'>
                                <h2 className='orderId'>OrderId: {orderId}</h2>
                                <div className='head_'>
                                    <h2>Shipping Address</h2>
                                </div>
                                <p><span>Name:</span>{order.shippingAddress.fullname}</p>
                                <p className='email'><span>Email:</span>{order.shippingAddress.email}</p>
                                <p><span>Tell:</span>{order.shippingAddress.phone_number}</p>
                                <p><span>Address:</span>{order.shippingAddress.address}</p>
                                {order.isDelivered ? (
                                    <p className="success">
                                        Delivered at {order.deliveredAt}
                                    </p>
                                ) : (
                                    <p className="danger_">Not Delivered</p>
                                )}
                            </div>
                            <div className='payment_'>
                                <h2>Payment</h2>
                                <p><span>Method:</span> {order.paymentMethod}</p>
                                {order.isPaid ? (
                                    <p className="success_">
                                        Paid at {order.paidAt}
                                    </p>
                                ) : (
                                    <p className="danger_">Not Paid</p>
                                )}
                            </div>
                            <div className='yourOrder'>
                                <h2>Your Order</h2>
                                <div className='order__contents'>
                                    {order.orderItems.map((item) => (
                                        <div className='order__content' key={item._id}>
                                            <div className='item'>
                                                <div className='item_img'>
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                                <div className='item_content'> 
                                                    <p>{item.name} *  <span> {item.quantity}</span></p>
                                                    <p>Le {item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='placeOrder_action'>
                            <h2>Order Summary</h2>
                            <div className='info'>
                                <p>Products In Cart</p>
                                <p>{order.orderItems.length} Items</p>
                            </div>
                            <div className='info'>
                                <p>Cart Subtotal</p>
                                <p>Le {order.itemsPrice.toFixed(2)}</p>
                            </div>
                            <div className='info'>
                                <p>Shipping</p>
                                <p>Le {order.shippingPrice.toFixed(2)}</p>
                            </div>
                            <div className='info'>
                                <p>Tax</p>
                                <p>Le {order.taxPrice.toFixed(2)}</p>
                            </div>
                            <div className='total'>
                                <p>Total</p>
                                <p>Le {order.totalPrice.toFixed(2)}</p>
                            </div>
                            {!order.isPaid && (
                                <div>
                                    {isPending ? (
                                    <div>Loading..</div>
                                    ) : (
                                    <div>
                                        <PayPalButtons
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={onError}
                                        ></PayPalButtons>
                                    </div>
                                    )}
                                    {loadingPay && <div>Loading..</div>}
                                </div>
                                )}
                                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <div>
                                    {loadingDeliver && <div>Loading..</div>}
                                    <div className="d-grid">
                                    <button type="button" onClick={deliverOrderHandler}>
                                        Deliver Order
                                    </button>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </ReviewOrderContainer>
                    
                </div>
                <Footer />
            </div>
        )
    )
}

export default Order