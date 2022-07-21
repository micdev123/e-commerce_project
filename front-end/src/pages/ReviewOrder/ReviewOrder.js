import React from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer';

import "../ReviewOrder/reviewOrder.css";

const ReviewOrderContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    align-items: flex-start;
    margin-top: 2rem;

    /* Tablet Devices :: Media Queries */
    @media screen and (min-width : 768px) and (max-width : 1024px) {
        grid-template-columns: 1fr;
    }

    /* Mobile Devices :: Media Queries */
    @media screen and (min-width : 320px) and (max-width : 480px) {
        grid-template-columns: 1fr;
    }
`

const ReviewOrder = () => {
    return (
        <div>
            <div className='main_container'>
                <ReviewOrderContainer>
                    <div>
                        <div className='shipping_details'>
                            <h2>Shipping Address</h2>
                            <div>
                                <p>Michael L Bangura</p>
                                <p className='email'>michlawbang123@gmail.com</p>
                                <p>+23279596449</p>
                                <p>23FA1</p>
                                <p>Mama Beach Village</p>
                            </div>
                        </div>
                        <div className='yourOrder'>
                            <h2>Your Order</h2>
                            <div className='order_contents'>
                                <div className='order_content'>
                                    <div>
                                    <img src="../src/assets/p60.webp" alt="product-img" />
                                    </div>
                                    <div>
                                        <p>
                                            Censhi Wireless Charging-Stand
                                            * 
                                            <span> 1</span>
                                        </p>
                                    </div>
                                </div>
                                <p>$20.00</p>
                            </div>
                        </div>
                    </div>

                    <div className='placeOrder'>
                        <div>
                            <p>Products In Cart</p>
                            <p>2 Items</p>
                        </div>
                        <div>
                            <p>Cart Subtotal</p>
                            <p>$20.00</p>
                        </div>
                        <div>
                            <p>Shipping</p>
                            <p>$0.00</p>
                        </div>
                        <div>
                            <p>Tax</p>
                            <p>$0.00</p>
                        </div>
                        <div className='total'>
                            <h2>Total</h2>
                            <p>$20.00</p>
                        </div>
                        <div className='payment'>
                            <h2>Payment Method</h2>
                        </div>
                        <button className='placeOrder_btn'><a href="/">Place Order</a></button>
                    </div>
                </ReviewOrderContainer>
                
            </div>
            <Footer />
        </div>
    )
}

export default ReviewOrder