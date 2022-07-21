import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BsShop } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import '../Register/register.css';

const Register = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <div>
      <div className='signup_container'>
        <Helmet>
          <title>Register</title>     
        </Helmet>
        <Link to='/' className='logo__'>
          <BsShop className='shop_icon'/>
          <h2>E-Commerce</h2>
        </Link>
        
        <form className='signUp_form'>
          <h2>Create An Account</h2>
          <input type='text' name='name' placeholder='Enter name' required />
          <input type='email' name='email' placeholder='Enter email' required />
          <input type='password' name='password' placeholder='Enter password' required />
          <input type='password' name='confirm_password' placeholder='confirm password' required />
          <button type='submit' id='signup'>Sign-Up</button>
          <p className='caution'>By creating an account you agree to E-commerce conditions of use and sale. </p>
          <button className='info'>
            <Link to={`/login?redirect=${redirect}`} className='link'>
              Already have an account | <span>Login</span>
            </Link>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register