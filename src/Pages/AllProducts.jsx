import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import FeaturedCard from './Home/FeaturedCard';

const AllProducts = () => {
    const products = useLoaderData();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6; // adjust how many per page

    // Filter products by search
    const filteredProducts = products.filter(p =>
        p.productName.toLowerCase().includes(search.toLowerCase())
    );

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePageClick = (page) => setCurrentPage(page);

    return (
        <div>
            <h2 className='text-center text-4xl mb-10 mt-20'>All Products</h2>

            <div className='text-center my-10'>
                <input
                    type="text"
                    value={search}
                    onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} // reset to page 1 when searching
                    placeholder='Search product by name...'
                    className='border p-3 w-96 rounded-lg shadow-sm'
                />
            </div>

            <div className='flex justify-center'>
                <div className='grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                    {currentProducts.length > 0 ? (
                        currentProducts.map(product => (
                            <FeaturedCard key={product._id} product={product} />
                        ))
                    ) : (
                        <p className='text-gray-500 text-xl col-span-3'>No products found</p>
                    )}
                </div>
            </div>

            {/* Pagination buttons */}
            <div className='flex justify-center mt-10 gap-2'>
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className='px-4 py-2 border rounded disabled:opacity-50'
                >
                    Prev
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageClick(i + 1)}
                        className={`px-4 py-2 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className='px-4 py-2 border rounded disabled:opacity-50'
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllProducts;
