import React from 'react';
import Footer from '../../components/Footer';

import '../Shipping/shipping.css';

const Shipping = () => {
    return (
        <div>
            <div className='shipping_container'>
                <form className='deliver_form'>
                    <div className='form_group'>
                        <label for="name">Fullname</label>
                        <input type="text" id="name" required />
                    </div>
                    <div className='form_group'>
                        <label for="email">Email</label>
                        <input type="email" id="email" required />
                    </div>
                    <div className='form_group'>
                        <label for="number">Phone Number</label>
                        <input type="text" id="number" required />
                    </div>
                    <div className='form_group'>
                        <label for="">Flat, House no., Building, Company, Apartment</label>
                        <input type="text" id="address" required />
                    </div>
                    <div className='form_group'>
                        <label for="address2">Area, Street, Sector, Village</label>
                        <input type="text" id="address2" required />
                    </div>
                    <div className='form_group deliver_btn'>
                        <button type="submit">Deliver to this address</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Shipping