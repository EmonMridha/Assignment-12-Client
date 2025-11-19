import React from 'react';
import Banner from './Banner';
import FeaturedProducts from './FeaturedProducts';
import TrendingProducts from './TrendingProducts';
import ExtraSec1 from './ExtraSec1';
import ExtraSec2 from './ExtraSec2';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <ExtraSec1></ExtraSec1>
            <ExtraSec2></ExtraSec2>
        </div>
    );
};

export default Home;