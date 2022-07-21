import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './css/product.css';
import Rating from '@mui/material/Rating';
import { Store } from '../Store';
import { publicRequest } from '../requestController';

const Product = ({ item }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    // check
    const existItem = cart.cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await publicRequest.get(`/products/find/${item._id}`);
    if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
    }
    ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
    });
    // After dispatching redirect user :: calling the navigate fnx
    // navigate('/cart');

  }
  return (
    <div className='product'>
      <Link to={`/product/${item._id}`} className='link'>
        <img src={item.img} alt={item.title} />
        <div className='content_'>
            <h2 className='title'>
              {item.title.length >= 19 ? `${item.title.substring(0, 17)}...` : item.title}
            </h2>
            <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly className='rating'/>
            <p className='price'>Le <span>{item.price}</span></p>
        </div>
      </Link>
      {item.countInStock === 0 ? (
        <button className='outOfStock' >Out Of Stock</button>
      ) :
        (
          <button className='buy' onClick={addToCartHandler} >Add To Cart</button>
        )
    }
      
        
    </div>
  )
}

export default Product