import React from 'react';
import { BsShop, BsFillPhoneFill, BsFacebook, BsInstagram, BsGithub, BsTwitter } from 'react-icons/bs';
import { MdMyLocation, MdEmail } from 'react-icons/md';
import './css/footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer_container'>
                <div className='logo'>
                    <a href='/'>
                        <BsShop className='shop_icon' />
                        <h2>E-Commerce</h2>
                    </a>
                </div>
                <div className='footer_contents'>
                    <div className='content'>
                        <h2>Get In Touch</h2>
                        <div className='contact_info'>
                            <MdMyLocation className="icon" />
                            <p>Mama Beach Village</p>
                        </div>
                        <div className='contact_info'>
                            <BsFillPhoneFill className="icon" />
                            <p>+23279596449</p>
                        </div>
                        <div className='contact_info'>
                            <MdEmail className="icon" />
                            <p>michlawbang123@gmail.com</p>
                        </div>

                    </div>
                    <div className='content content2'>
                        <h2><a href='/'>Store</a></h2>
                        <p><a href='/'>Smart Phones</a></p>
                        <p><a href='/'>Smart Watches</a></p>
                        <p><a href='/'>Headphones</a></p>
                        <p><a href='/'>Speakers</a></p>

                    </div>
                    <div className='content content2'>
                        <h2><a href='/'>Account</a></h2>
                        <p><a href='/'>My Account</a></p>
                        <p><a href='/'>Cart</a></p>
                        <p><a href='/'>Wishlist</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer