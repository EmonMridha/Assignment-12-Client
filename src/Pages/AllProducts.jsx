import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import FeaturedCard from './Home/FeaturedCard';

const AllProducts = () => {
    const products = useLoaderData();
    const [search, setSearch] = useState('');

    const fileterProducts = products.filter(p =>
        p.productName.toLowerCase().includes(search.toLowerCase()) // Filter products by matching productName with the search input
    );
    return (
        <div>
            <h2 className='text-center text-4xl mb-10 mt-20'>All Products</h2>

            <div className='text-center my-10'>
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)} // When user types onchange triggers
                    placeholder='Search product by name...'
                    className='border p-3 w-96 rounded-lg shadow-sm'
                />
            </div>
            <div className='flex justify-center'>
                <div className='grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                    {
                        fileterProducts.length > 0 ? (
                            fileterProducts.map(product => (
                                <FeaturedCard key={product._id} product={product}></FeaturedCard>
                            ))
                        ) : (
                            <p className='text-gray-500 text-xl col-span-3'>No products found</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
