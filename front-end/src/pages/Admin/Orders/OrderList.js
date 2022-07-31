import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async';
import { MdDelete } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SideNav from '../../../components/SideNav';
import { userRequest } from '../../../requestController';
import { Store } from '../../../Store';
import { getError } from '../../../utils';

import { Visibility } from "@material-ui/icons";
import { SiEventstore } from 'react-icons/si';

import './orderList.css'



const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                orders: action.payload.orders,
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
            return { ...state, loadingDelete: false };
        case 'DELETE_RESET':
            return { ...state, loadingDelete: false, successDelete: false };
        default:
            return state;
    }
};

const OrderList = () => {
    const [{ loading, error, orders, pages, loadingDelete, successDelete }, dispatch] = useReducer(reducer, {
            loading: true,
            error: '',
        }
    );

    const navigate = useNavigate();
     const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const page = sp.get('page') || 1;


    const { state } = useContext(Store);
    const { userInfo } = state;
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await userRequest.get(`orders/admin?page=${page}`, {
                    headers: {
                        token: `Bearer ${userInfo.accessToken}`
                    },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err),  });
            }
        };
        if (successDelete) {
            dispatch({ type: 'DELETE_RESET' });
        }
        else {
            fetchData();
        }
    }, [page, userInfo, successDelete]);

    const deleteHandler = async (order) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                dispatch({ type: 'DELETE_REQUEST' });
                await userRequest.delete(`orders/${order._id}`, {
                    headers: {
                        token: `Bearer ${userInfo.accessToken}`
                    },
                });
                toast.success('order deleted successfully');
                dispatch({ type: 'DELETE_SUCCESS' });
            }
            catch (err) {
                toast.error(getError(error));
                dispatch({ type: 'DELETE_FAIL', });
            }
        }
    };

    // console.log(orders);
    return (
        <div>
            <Helmet>
                <title>Dashboard | Orders</title>
            </Helmet>
            {loadingDelete && <div>Loading..</div>}
            {loading ? (<div>Loading..</div>) : error ? (<p className="danger">{error}</p>) : (
                <div className='admin_container'>
                    <SideNav />
                    <div className='container_contents'>
                        <div className='OrdersContainer'>
                            <h2>
                                <SiEventstore className='icon' />
                                Orders List
                            </h2>
                            <div className="table">
                                <div className='head_'>
                                    <p>Order Id</p>
                                    <p>User</p>
                                    <p>Date</p>
                                    <p>Total</p>
                                    <p>Paid</p>
                                    <p>Delivered</p>
                                    <p>Actions</p>
                                </div>
                                <div className='tbody_'>
                                    {orders.length === 0 ? (<div className='msg'>No Order Yet!</div>) : orders.map((order) => (
                                    <div className='tb_content_' key={order._id}>
                                        <p>{order._id.length >= 15 ? `${order._id.substring(0, 15)}...` : order._id}</p>
                                        <p>{order.username}</p>
                                        <p>{order.createdAt.substring(0, 10)}</p>
                                        <p>Le {order.totalPrice.toFixed(2)}</p>
                                        {order.isPaid ? (
                                            <p className="_success_ _Info_">
                                                Paid at {order.paidAt.substring(0, 10)}
                                            </p>
                                            ) : (
                                                <p className="_danger_ _Info_">Not Paid</p>
                                            )
                                        }
                                        {order.isDelivered ? (
                                                <p className="_success_ _Info_">
                                                    Delivered at {order.deliveredAt.substring(0, 10)}
                                                </p>
                                            ) : order.isPaid ? (
                                                <p className="_pending_ _Info_">Pending</p>
                                            ) : (
                                                <p className="_danger_ _Info_">Not Yet</p>
                                            )
                                        }
                                        <div className='userAction'>
                                            <Visibility onClick={() => navigate(`/order/${order._id}`)} className='icon' />
                                            <MdDelete onClick={() => deleteHandler(order)} className=' icon trash' />
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            <div className='pagination'>
                                {[...Array(pages).keys()].map((x) => (
                                    <Link
                                        className={x + 1 === Number(page) ? 'link active_link' : 'link'}
                                        key={x + 1} to={`/admin/orders?page=${x + 1}`}
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

export default OrderList