import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BsShop } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { publicRequest, userRequest } from '../../requestController';
import { Store } from '../../Store';
import '../Login/login.css';
import { getError } from '../../utils'

const Login = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [msg, setmsg] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
    e.preventDefault();
        try {
            const { data } = await userRequest.post('/auth/login', {
                email,
                password,
            });
            // when dispatching you need to set the type and the payload 
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        }
        catch (err) {
            setmsg(getError(err));
        }
    }
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])
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
               
                <form onSubmit={submitHandler} className='login_form'>
                    {msg && (<p className='msg'>{msg}</p>)}
                    <h2 className='head'>Login To Your Account</h2>
                    <input type='email' name='email' placeholder='Enter email' required onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' name='password' placeholder='Enter password' required onChange={(e) => setPassword(e.target.value)} />
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