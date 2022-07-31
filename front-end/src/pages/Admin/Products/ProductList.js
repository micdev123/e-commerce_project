import { Storefront } from '@material-ui/icons';
import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async';
import { MdDelete } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SideNav from '../../../components/SideNav';
import { publicRequest, userRequest } from '../../../requestController';
import { Store } from '../../../Store';
import { getError } from '../../../utils';
import { AiFillEdit } from 'react-icons/ai';

import './productList.css'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'DELETE_REQUEST':
            return { ...state, loadingDelete: true, successDelete: false };
        case 'DELETE_SUCCESS':
            return {
                ...state,
                loadingDelete: false,
                successDelete: true,
            };
        case 'DELETE_FAIL':
            return { ...state, loadingDelete: false, successDelete: false };

        case 'DELETE_RESET':
            return { ...state, loadingDelete: false, successDelete: false };
        default:
            return state;
    }
};


const ProductList = () => {
    const [{ loading, error, products, pages, loadingDelete, successDelete, },
    dispatch, ] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const page = sp.get('page') || 1;

    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await userRequest.get(`products/admin?page=${page}`, {
                    headers: {
                        token: `Bearer ${userInfo.accessToken}`
                    },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch (err) {
                // dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };

        if (successDelete) {
            dispatch({ type: 'DELETE_RESET' });
        }
        else {
            fetchData();
        }
    }, [page, userInfo, successDelete]);

    
    const deleteHandler = async (product) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                await userRequest.delete(`products/${product._id}`, {
                    headers: {
                        token: `Bearer ${userInfo.accessToken}`
                    },
                });
                toast.success('product deleted successfully');
                dispatch({ type: 'DELETE_SUCCESS' });
            }
            catch (err) {
                toast.error(getError(error));
                dispatch({ type: 'DELETE_FAIL', });
            }
        }
    };

    // console.log(products);
    return (
        <div>
            <Helmet>
                <title>Dashboard | Products</title>
            </Helmet>
            {loadingDelete && <div>Loading..</div>}
            {loading ? (<div>Loading..</div>) : error ? (<p className="danger">{error}</p>) : (
                <div className='admin_container'>
                    <SideNav />
                    <div className='container_contents'>
                        <div className='ProductContainer'>
                            <div className='Head'>
                                 <h2>
                                    <Storefront className='icon' />
                                    Products List
                                </h2>
                                <div>
                                    <Link to='/admin/newProduct' className='create_product'>
                                        Create Product
                                    </Link>
                                </div>
                            </div>
                           
                            <div className="_table">
                                <div className='_head_'>
                                    <p>Product Id</p>
                                    <p>Product</p>
                                    <p>InStock</p>
                                    <p>Price</p>
                                    <p>Actions</p>
                                </div>
                                <div className='_tbody_'>
                                    {products.map((item) => (
                                    <div className='_tb_content_' key={item._id}>
                                        <p>{item._id.length >= 15 ? `${item._id.substring(0, 22)}...` : item._id}</p>
                                        <div className='item_block'>
                                            <div className='itemImg'>    
                                                <img src={item.img} alt={item.title} />  
                                            </div>    
                                            <p>{item.title.length >= 15 ? `${item.title.substring(0, 22)}...` : item.title}</p>
                                        </div>
                                        {item.countInStock === 0 ? (
                                            <p>false</p>
                                        ) :
                                            (
                                            <p>true</p>
                                            )
                                        }
                                        <p>Le {item.price.toFixed(2)}</p>
                                        
                                        <div className='userAction'>
                                            <AiFillEdit onClick={() => navigate(`/admin/product/${item._id}`)} className='icon' />
                                            <MdDelete onClick={() => deleteHandler(item)} className=' icon trash' />
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            <div className='pagination'>
                                {[...Array(pages).keys()].map((x) => (
                                    <Link
                                        className={x + 1 === Number(page) ? 'link active_link' : 'link'}
                                        key={x + 1} to={`/admin/products?page=${x + 1}`}
                                    >
                                        {x + 1}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductList