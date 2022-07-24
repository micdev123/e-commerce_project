import React from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from '../../components/Footer'
import { ImProfile } from 'react-icons/im'
import { BsClockHistory } from 'react-icons/bs'
import { GiReturnArrow } from 'react-icons/gi'
import { BsFillEyeFill } from 'react-icons/bs'

import '../OrderHistory/orderHistory.css'

const OrderHistory = () => {
    return (
        <div>
            <div className='main_container'>
                <Helmet>
                    <title>Returns_&_Order</title>     
                </Helmet>
                <div className='orderHistory_container'>
                    <div className='order_navigation'>
                        <div className='nav_head'>
                            <div className='profile_img'>
                                
                            </div>
                        </div>
                        <p>
                            <ImProfile />
                            Profile
                        </p>
                        <p>
                            <BsClockHistory />
                            Order History
                        </p>
                        <p>
                            <GiReturnArrow />
                            Your Returns
                        </p>
                    </div>
                    <div className='orderHistory'>
                        <h2>Your Orders History</h2>
                        <div className='orderHead'>
                            <p>_ID</p>
                            <p>Date</p>
                            <p>Total</p>
                            <p>Paid</p>
                            <p>Delivered</p>
                            <p>Action</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrderHistory