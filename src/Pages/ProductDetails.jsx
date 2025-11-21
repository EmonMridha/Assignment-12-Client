import React, { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import useAuth from '../hooks/useAuth';
import axiosPublic from '../Axios/AxiosPublic';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const data = useLoaderData();
    const { user } = useAuth();

    const [product, setProduct] = useState(data);

    const handleLike = async () => {
        try {
            const res = await axiosPublic.patch(`/products/${product._id}/vote`, { userEmail: user.email }
            );

            if (res.data.message === 'User already voted') {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You cannot vote more than once",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
            else {
                setProduct(res.data);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You cannot vote more than once",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }
    return (
        <div>
            <h2 className='text-5xl text-center mt-20' >Product Details</h2>

            <div className='flex justify-center mt-10'>
                <div className='bg-gray-700 rounded-4xl p-20'>
                    <img className='w-100 h-80' src={product.productImage} alt="" />
                    <p className='text-4xl font-semibold'>{product.productName}</p>
                    <p className='text-xl'>{product.description}</p>
                    {product.tags.map((tag, index) => <div key={index} className='text-xl text-gray-500'>{tag}</div>)}
                    <p>{product.externalLinks}</p>
                    <div className='flex justify-between'>
                        <button
                            className='cursor-pointer flex items-center gap-2'
                            onClick={handleLike}
                            disabled={user?.email === product.ownerEmail? "You cannot vote for your own product": ''}
                        >
                            <FaThumbsUp />
                            <span className='text-xl'>{product.votes || 0}</span>
                        </button>
                        <button className='bg-red-500 p-1 rounded-2xl font-semibold cursor-pointer'>Report</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;