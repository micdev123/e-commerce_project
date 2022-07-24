import { BsShop } from 'react-icons/bs'
import { FiShoppingCart, FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { BiSearchAlt } from 'react-icons/bi'
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Product from './pages/Product/Product';
import Register from './pages/Register/Register';
import Shipping from './pages/Shipping/Shipping';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Order from './pages/Order/Order';

import { useContext, useState } from 'react';
import { Store } from './Store';

import { MdArrowDropDown } from 'react-icons/md'
import { MdSpaceDashboard } from 'react-icons/md'
import { RiLogoutCircleLine } from 'react-icons/ri'
import OrderHistory from './pages/OrderHistory/OrderHistory';





function App() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const [dropdown, setDropdown] = useState(false);

    // const user = false;
    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('cartItems');
        // localStorage.removeItem('paymentMethod');
        window.location.href = '/login';
    };
    return (
        <div className="App">
        <Router>
            <div className='container'>
                    <div className='wrapper'>
                    <div className='logo'>
                        <Link to='/'>
                            <BsShop className='shop_icon'/>
                            <h2>E-Commerce</h2>
                        </Link>
                    </div>
                    <div className="search desktop">
                        <input type="text" placeholder="Search..." />
                        <BiSearchAlt className="search_btn" />
                    </div>
                    <nav className='navigation'>
                        <div className='menu_lists'>
                                <li>
                                    {userInfo ? (
                                        <div className='dropdown'>
                                            <p>Hello,</p>
                                            <p className='dropdown_email'>
                                                {userInfo.email}
                                                <MdArrowDropDown className='icon' onClick={(e) => setDropdown(!dropdown)} />
                                            </p>
                                            {dropdown && (
                                                <div className='dropdown_menu'>
                                                    <Link to='/' className='link'>
                                                        <MdSpaceDashboard className='icon' />
                                                        Dashboard
                                                    </Link>
                                                    <Link to='/' className='link' onClick={signoutHandler}>
                                                        <RiLogoutCircleLine className='icon'/>
                                                        Logout
                                                    </Link>
                                                </div>
                                            )
                                            }
                                        </div>
                                        ):
                                        (
                                            <Link to='/login'>
                                                <p>Hello, Guest</p>
                                                <p>Login</p>
                                            </Link>
                                        )
                                    }
                                   
                            </li>
                            <li>
                                <Link to='/orderHistory'>
                                    <p>Return</p>
                                    <p>& Orders</p>
                                </Link>
                            </li>
                        </div>
                        <li className='cart'>
                            <Link to='/cart' className='cart_incart'>
                                <FiShoppingCart className='cart_icon' />
                                {cart.cartItems.length > 0 ?
                                    (
                                        <sup className='incart'>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</sup>
                                    )
                                    :
                                    (
                                        <sup className='incart'>0</sup>
                                    )
                                }
                                {/* <sup className='incart'>0</sup> */}
                            </Link>
                            <div></div>
                            <span className='cart_price'>Le {cart.cartItems ? cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0) : 0}</span>
                        </li>
                    </nav>
                </div>
                <div className="small_screen_wrapper">
                    <div className="top">
                        <div className='logo'>
                            <Link to='/'>
                                <BsShop className='shop_icon'/>
                                <h2>E-Commerce</h2>
                            </Link>
                        </div>
                        <nav className='navigation'>
                            <div className='menu_lists'>
                                <li>
                                    <Link to='/'>
                                        <p>Hello, Guest</p>
                                        <p>SignIn</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/'>
                                        <p>Return</p>
                                        <p>& Orders</p>
                                    </Link>
                                </li>
                            </div>
                            <li className='cart'>
                                <Link to='/'>
                                    <FiShoppingCart className='cart_icon' />
                                    
                                </Link>
                            </li>
                            <FiMenu className='menu_bar'/>
                            <MdClose className='close_btn'/>
                        </nav>
                    </div>
                    <div className="search">
                        <input type="text" placeholder="Search..." />
                        <BiSearchAlt className="search_btn" />
                    </div>
                </div>
            </div>
            <main>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/placeOrder" element={<PlaceOrder />} />
                <Route path="/order/:id" element={<Order />} />
                <Route path="/orderHistory" element={<OrderHistory />} />
            </Routes>
            </main>
        </Router>
        </div>
    );
}

export default App;
