import React from 'react';
import FeaturedCard from './FeaturedCard';

const FeaturedProducts = ({ products }) => {

    const sortedProducts = [...products].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0,10);
    return (
        <div>
            <h2 className='text-center text-5xl mt-20'>Featured Products</h2>
            <div className='flex justify-center '>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10'>
                    {
                        sortedProducts.map(product => <FeaturedCard key={product._id} product={product}></FeaturedCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;