import React, { useContext } from 'react'
import styled from 'styled-components';
import Footer from '../../components/Footer'

import { MdAddCircle, MdDelete } from 'react-icons/md'
import { FiShoppingCart } from 'react-icons/fi'


import '../Cart/cart.css';
import { AiFillMinusCircle } from 'react-icons/ai';
import { Store } from '../../Store';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { publicRequest } from '../../requestController';

const CartContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    align-items: flex-start;
    margin-bottom: 4rem;

    /* Tablet Devices :: Media Queries */
    @media screen and (min-width : 768px) and (max-width : 1024px) {
        grid-template-columns: 1fr;
    }

    /* Mobile Devices :: Media Queries */
    @media screen and (min-width : 320px) and (max-width : 480px) {
        grid-template-columns: 1fr;
    }
`

const Cart = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await publicRequest.get(`/products/find/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        }); 
    }

    const removeItemHandler = (item) => {
        ctxDispatch({
            type: 'CART_REMOVE_ITEM',
            payload: item,
        }); 
    }
    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }
    return (
        <div>
            <div className='main_container'>
                <Helmet>
                    <title>Cart</title>     
                </Helmet>
                {cartItems.length === 0 ? (
                    <div className='empty'>
                        <span>
                            Your Cart is Empty. <Link to='/'>Go Shopping</Link>
                        </span>
                        <div className='empty_cart'>
                            <img src='/assets/empty_cart.png' alt='empty_cart' />
                        </div>
                    </div>
                    )
                    : (
                        <div>
                            <div className='cart_head'>
                                <h2>
                                    <FiShoppingCart className='icon' />
                                    Your Shopping Cart
                                </h2>
                                <button className='continue_shop'>
                                    <Link to='/' className='link'>Continue Shopping</Link>
                                </button>
                            </div>
                            <CartContainer>
                                <div className='cart_container'>
                                    <div className='cart_header'>
                                        <h2></h2>
                                        <h2>Product</h2>
                                        <h2>SubTotal</h2>
                                    </div>
                                    {cartItems.map((item) => (
                                        <div className='cart_contents' key={item._id}>
                                            <button type="button" className='delete_btn'>
                                                <MdDelete className='delete'
                                                onClick={() => removeItemHandler(item)}/>
                                            </button>
                                            <div className='cart_product'>
                                                <div className='cart_img'>
                                                    <img src={item.img} alt={item.title} className='img' />
                                                </div>
                                                <div>
                                                    <p className='_name'> {item.title}</p>
                                                    <p className='_price'>Price: Le {item.price}</p>
                                                    <p className='qty'>Quantity:
                                                        <AiFillMinusCircle className='icon minus'
                                                            onClick={() => updateCartHandler(item,
                                                                item.quantity === 1 ? item.quantity : item.quantity - 1)}    
                                                            
                                                        />
                                                        <span>{item.quantity}</span>
                                                        <MdAddCircle className='icon'
                                                            onClick={() => updateCartHandler(item, item.quantity === item.countInStock ? item.countInStock : item.quantity + 1)}
                                                        />
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='subtotal'>
                                                <p>$<span className='sub_total'>20.00</span></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* <div className='cart_container_mobile'>
                                    <div className='cart_header'>
                                        <h2>Product</h2>
                                    </div>
                                    {cartItems.map((item) => (
                                        <div className='cart_contents' key={item._id}>
                                            <div className='cart_product_'>
                                                <div className='cart__head'>
                                                    <div className='_img'>
                                                        <img src={item.img} alt={item.title} />
                                                    </div>
                                                    <div>
                                                        <p className='_name_'>
                                                            {item.title.length >= 15 ? `${item.title.substring(0, 19)}...` : item.title}
                                                        </p>
                                                        <p className='_price'>Price: {item.price} * 2</p>
                                                    </div>
                                                </div>
                                                <div className='cart_footer'>
                                                    <p className='qty'>Quantity:
                                                        <AiFillMinusCircle className='icon minus'
                                                            onClick={() => updateCartHandler(item, item.quantity - 1)}    
                                                            aria-disabled={item.quantity === 1}
                                                        />
                                                        <span>{item.quantity}</span>
                                                        <MdAddCircle className='add icon'
                                                            onClick={() => updateCartHandler(item, item.quantity + 1)}
                                                            aria-disabled={item.quantity === item.countInstock}
                                                        />
                                                    </p>
                                                    <button type="button" className='delete_btn'>
                                                        <MdDelete className='delete' />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div> */}

                                <div className='cart_action'>
                                    <h2>Cart Total</h2>
                                    <div>
                                        <p>Products In Cart</p>
                                        <p>{cartItems.reduce((a, c) => a + c.quantity, 0)} Items</p>
                                    </div>
                                    <div>
                                        <p>Cart Subtotal</p>
                                        <p>Le {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</p>
                                    </div>
                                    <div>
                                        <p>Shipping</p>
                                        <p>$0.00</p>
                                    </div>
                                    <div className='total'>
                                        <h2>Total</h2>
                                        <p>$20.00</p>
                                    </div>
                                    <button className='checkout_btn' onClick={checkoutHandler}>Proceed to checkout</button>
                                </div>
                            </CartContainer>
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    )
}

export default Cart