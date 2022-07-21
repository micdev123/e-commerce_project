import React, { useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
import styled from 'styled-components';
import Product from './Product';
import { publicRequest } from '../requestController';
// import axios from 'axios';

// import data from '../data'; // front-end data.js :: initial before getting product from backend

const initialState = {
    products: [],
    loading: true,
    error: '',
};

// product reducer to manage product state
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, isLoading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, isLoading: false }; 
        case 'FETCH_FAIL':
            return { ...state, isLoading: false, error: action.payload }; 
        default:
            return state; //Current state
    }
}


const ProductWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    /* margin-top: 2rem; */

    
    /* Tablet Devices :: Media Queries */
    @media screen and (min-width : 768px) and (max-width : 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    /* Mobile Devices :: Media Queries */
    @media screen and (min-width : 320px) and (max-width : 480px) {
        grid-template-columns: 1fr;
    }
`
const Products = () => {
    // React Hook State
    // const [products, setProducts] = useState([]);
    const [{ isLoading, error, products }, dispatch] = useReducer(logger(reducer), initialState); // instead of useState()
    useEffect(() => {
        // fetch products from backend :: Ajax request
        const fetchProducts = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await publicRequest.get("products");
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
                // setProduct(data);
            }
            catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message });
                //console.log("Failed!");
            }
        }
        // called fetchProducts() fnx
        fetchProducts();
    }, [])
    

    return (
        <ProductWrapper>
            {products.map((product) => (<Product item={product} key={product._id} />))}
        </ProductWrapper>
    )
}

export default Products