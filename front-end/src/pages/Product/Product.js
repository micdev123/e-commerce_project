import React, { useContext, useEffect, useReducer, useState  } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/Footer'
import { MdAddCircle } from 'react-icons/md'
import { AiFillMinusCircle } from 'react-icons/ai'

import '../Product/product.css';
import '../../components/css/product.css';
import { publicRequest } from '../../requestController';
import { Store } from '../../Store';

const initialState = {
    product: [],
    loading: true,
    error: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, isLoading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, isLoading: false }; 
        case 'FETCH_FAIL':
            return { ...state, isLoading: false, error: action.payload }; 
        default:
            return state; //Current state
    }
}


const Product = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;
    const [{isLoading, error, product}, dispatch] = useReducer(reducer, initialState);
    const [quantity, setQuantity] = useState(1);
    // const [message, setMessage] = useState(null);
    // finding matching product id and display
    useEffect(() => {
        const fetchProduct = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await publicRequest.get("/products/find/" + id);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message });
            }
        }
        fetchProduct();
    }, [id])

    const handleQuantity = (type) => {
        if (type === "minus") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = state;
    const addToCartHandler = async () => {
        // check
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await publicRequest.get("/products/find/" + id);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity },
        });
        // After dispatching redirect user :: calling the navigate fnx
        navigate('/cart');

    }
    
    return (
        <div>
            <div className='main_container'>
                {isLoading ? (<div>Loading..</div>) : error ? (<div>{error}</div>) : (
                    <div className='product_container'>
                        <Helmet>
                            <title>{product.title}</title>     
                        </Helmet>
                        <div className='image_container'>
                        <img src={product.img} className='product-img' alt={product.title} />
                    </div>
                    <div className='product-contents'>
                        <h2 className='name'>{product.title}</h2>
                        <p className='des'>{product.desc} </p>
                        <p className='price'>Price: Le <span>{product.price}</span></p>
                        
                        <p>Status: {product.countInStock > 0 && quantity <= product.countInStock ? 
                            <span className='success'>Instock</span> : 
                            <span className='danger'>OutOfStock</span>}
                        </p>
                        <p>Category: <span>{product.category}</span></p>
                        <p className='qty'>Quantity:
                            <AiFillMinusCircle className='minus icon' onClick={() => handleQuantity("minus")} />
                            <span>{quantity}</span>
                            <MdAddCircle className='icon' onClick={() => handleQuantity("add")} />
                            {/* <span className='danger msg'>{message && message}</span> */}
                        </p>
                        {product.countInStock === 0 ? (
                            <button className='outOfStock'>Out Of Stock</button>
                            ) :
                            (
                                <button className='cart_btn' onClick={addToCartHandler}>Add To Cart</button>
                            )
                        }  
                        
                    </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Product