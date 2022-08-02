import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header/Header';
// import Categories from './Categories/Categories';
import Footer from '../../components/Footer';
import Products from '../../components/Products';
import styled from 'styled-components';

const Product = styled.div`
  margin: 8rem 0 2rem 0;
`

const H1 = styled.h1`
    font-weight: 550;
    text-transform: uppercase;
    font-size: 1.4rem;
    margin-bottom: 1.5rem;

    /* Tablet Devices :: Media Queries */
    @media screen and (min-width : 768px) and (max-width : 1024px) {
        font-size: 2rem;
    }

    /* Mobile Devices :: Media Queries */
    @media screen and (min-width : 320px) and (max-width : 480px) {
        font-size: 1.6rem;
    }
`
const P = styled.p`
    width: 84vw;
    text-align: right;
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: 550;

    :hover {
        cursor: pointer;
        color: #aeaeae;
    }


    /* Tablet Devices :: Media Queries */
    @media screen and (min-width : 768px) and (max-width : 1024px) {
        font-size: 1.5rem;
    }

    /* Mobile Devices :: Media Queries */
    @media screen and (min-width : 320px) and (max-width : 480px) {
        font-size: 1.4rem;
    }
`


const Home = () => {
    return (
        <div className='home'>
            <Helmet>
              <title>E-commerce</title>
            </Helmet>
            <Header />
            <div className='main'>
                <div className='main_container'>
                <Product>
                    <Products />
                </Product>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home