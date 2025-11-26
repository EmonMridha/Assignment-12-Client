import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import axiosPublic from '../Axios/AxiosPublic';
import Swal from 'sweetalert2';

const ReviewQueue = () => {
    const products = useLoaderData()
    const acceptProduct = async (id) => {
        const res = await axiosPublic.patch(`/products/accept/${id}`);
        if (res.data.modifiedCount > 0) {
            Swal.fire('Accepted!', 'Product has been accepted', 'Success')
        }
    }

    const rejectProduct = async (id) => {
        const res = await axiosPublic.patch(`/products/reject/${id}`);
        if (res.data.modifiedCount > 0) {
            Swal.fire("Rejected!", 'Product has been rejected', "Error")
        }
    }

    const makeFeatured = async (id) => {
        const res = await axiosPublic.patch(`/products/feature/${id}`);
        if (res.data.modifiedCount > 0) {
            Swal.fire('Featured!', 'Product is now featured', 'Success')
        }
    }

    return (
        <div className='flex justify-center'>
            <div>
                <h2 className='mt-30 text-4xl mb-10 font-semibold'>Review Queue</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>View Details</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.map((product, index) => <tr key={index}>
                                <td>{product.productName}</td>
                                <td><Link to={`/productDetails/${product._id}`} className='btn'>View Details</Link></td>
                                <td>{product.status ? 'Accepted' : "Pending"}</td>
                                <td> <button type='button' onClick={() => acceptProduct(product._id)} disabled={product.status === 'accepted'} className='btn bg-green-700'>{product.status === 'accepted' ? 'Accepted' : 'Accept'}</button>
                                    <button onClick={() => makeFeatured(product._id)}
                                        disabled={product.isFeatured} className='btn btn-primary'>{product.isFeatured ? 'Featured' : 'Make Featured'}</button><button className='btn bg-red-600' onClick={() => rejectProduct(product._id)} disabled={product.status === 'rejected'}>Reject</button></td>
                                <td></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewQueue;