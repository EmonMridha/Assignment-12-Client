import React from 'react';
import { useLoaderData } from 'react-router';
import FeaturedCard from './Home/FeaturedCard';

const AllProducts = () => {
    const products = useLoaderData();
    return (
        <div>
            <h2 className='text-center text-4xl mb-10 mt-20'>All Products</h2>
            <div className='flex justify-center'>
                <div className='grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'> 
                {
                products.map(product=> <FeaturedCard product={product}></FeaturedCard>)
            }
            </div>
            </div>
        </div>
    );
};

export default AllProducts;
