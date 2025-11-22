import React, { useEffect } from 'react';
import Banner from './Banner';
import FeaturedProducts from './FeaturedProducts';
import TrendingProducts from './TrendingProducts';
import ExtraSec1 from './ExtraSec1';
import ExtraSec2 from './ExtraSec2';
import { useLoaderData } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Home = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false
        })
    }, [])
    const products = useLoaderData();
    return (
        <div>
            <div data-aos="fade-up">
                <Banner />
            </div>

            <div data-aos="fade-up">
                <FeaturedProducts products={products} />
            </div>

            <div data-aos="zoom-in">
                <TrendingProducts products={products} />
            </div>

            <div data-aos="zoom-in">
                <ExtraSec1 />
            </div>

            <div data-aos="zoom-in">
                <ExtraSec2 />
            </div>
        </div>
    );
};

export default Home;