import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BsShop } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import '../Login/login.css';

const Login = () => {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    return (
        <div>
            <div className='signin_container'>
                <Helmet>
                    <title>Login</title>     
                </Helmet>
                <Link to='/' className='logo__'>
                    <BsShop className='shop_icon'/>
                    <h2>E-Commerce</h2>
                </Link>
                <form className='login_form'>
                    <h2 className='head'>Login To Your Account</h2>
                    <input type='email' name='email' placeholder='Enter email' required />
                    <input type='password' name='password' placeholder='Enter password' required />
                    <button type='submit' id='signin'>Login</button>
                    <p className='caution'>By signing-in you agree to E-commerce conditions of use and sale. </p>
                    <button className='info'>
                        <Link to={`/register?redirect=${redirect}`} className='link'>
                            Don't have an account | <span>Register</span>
                        </Link>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login