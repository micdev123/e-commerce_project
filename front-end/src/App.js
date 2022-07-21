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
import { useContext } from 'react';
import { Store } from './Store';

function App() {
    const { state } = useContext(Store);
    const { cart } = state;
    // const user = false;
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
                                <Link to='/'>
                                    <p>Hello, Guest</p>
                                    <p>Login</p>
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
            </Routes>
            </main>
        </Router>
        </div>
    );
}

export default App;
