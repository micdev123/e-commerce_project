import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';


import "../PlaceOrder/placeOrder.css";
import { Store } from '../../Store';
import { publicRequest, userRequest } from '../../requestController';
import { getError } from '../../utils';

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

// reducer is independent of the component
const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_SUCCESS':
            return { ...state, loading: false };
        case 'CREATE_FAIL':
            return { ...state, loading: false };
        default:
            return state;
    }
};


const PlaceOrder = () => {
    const navigate = useNavigate();

    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    });

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const [msg, setmsg] = useState('');

    const placeOrderHandler = async () => { 
        try {
            dispatch({ type: 'CREATE_REQUEST' });

            const { data } = await userRequest.post(
                '/orders',
                {
                    userId: userInfo._id,
                    orderItems: cart.cartItems.map((item) => ({
                        productId: item._id,
                        name: item.title,
                        quantity: item.quantity,
                        image: item.img,
                        price: item.price,
                    })),
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.shippingAddress.paymentMethodName,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                },
                {
                    headers: {
                        token: `Bearer ${userInfo.accessToken}`,
                    },
                }
            );
            ctxDispatch({ type: 'CART_CLEAR' });
            dispatch({ type: 'CREATE_SUCCESS' });
            localStorage.removeItem('cartItems');
            navigate(`/order/${data._id}`);
        }
        catch (err) {
            dispatch({ type: 'CREATE_FAIL' });
            setmsg(getError(err));
        }

    }

    useEffect(() => {
        if (!cart.shippingAddress.paymentMethodName) {
            navigate('/shipping');
        }
    }, [cart, navigate]);

    return (
        <div>
            <div className='main_container'>
                <Helmet>
                    <title>PlaceOrder</title>     
                </Helmet>
                {msg && (<p className='msg'>{msg}</p>)}
                <ReviewOrderContainer>
                    <div className='placeOrder_info'>
                        <div className='shipping_details'>
                            <div className='head'>
                                <h2>Shipping Address</h2>
                                <Link to='/shipping' className='link'>
                                    <AiFillEdit className='icon' />
                                    Edit
                                </Link>
                            </div>
                            
                            <p><span>Name:</span>{cart.shippingAddress.fullname}</p>
                            <p className='email'><span>Email:</span>{cart.shippingAddress.email}</p>
                            <p><span>Tell:</span>{cart.shippingAddress.phone_number}</p>
                            <p><span>Address:</span>{cart.shippingAddress.address}</p>
                        </div>
                        <div className='yourOrder'>
                            <h2>Your Order</h2>
                            <div className='order_contents'>
                                {cart.cartItems.map((item) => (
                                    <div className='order_content' key={item._id}>
                                        <div className='item'>
                                            <div className='item_img'>
                                                <img src={item.img} alt={item._id} />
                                            </div>
                                            <div className='item_content'> 
                                                <p>{item.title} *  <span> {item.quantity}</span></p>
                                                <p>Le {item.price}</p>
                                            </div>
                                        </div>
                                        <div className='order_actions'>
                                            <Link to='/cart' className='link'>
                                                <AiFillEdit className='icon' />
                                                Edit
                                            </Link>
                                            <div className='delete_btn'>
                                                <AiFillDelete className='icon delete' />
                                                Delete
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
                            <p>{cart.cartItems.length} Items</p>
                        </div>
                        <div className='info'>
                            <p>Cart Subtotal</p>
                            <p>Le {cart.itemsPrice.toFixed(2)}</p>
                        </div>
                        <div className='info'>
                            <p>Shipping</p>
                            <p>Le {cart.shippingPrice.toFixed(2)}</p>
                        </div>
                        <div className='info'>
                            <p>Tax</p>
                            <p>Le {cart.taxPrice.toFixed(2)}</p>
                        </div>
                        <div className='total'>
                            <p>Total</p>
                            <p>Le {cart.totalPrice.toFixed(2)}</p>
                        </div>
                        {loading ? (
                            <button className='placeOrder_btn' onClick={placeOrderHandler}>Processing..</button>
                        ) : (
                            <button className='placeOrder_btn' onClick={placeOrderHandler}>Place Order</button>
                        )
                    }
                        
                    </div>
                </ReviewOrderContainer>
                
            </div>
            <Footer />
        </div>
    )
}

export default PlaceOrder