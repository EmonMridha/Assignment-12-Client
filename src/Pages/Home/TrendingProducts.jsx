import React, { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import axiosPublic from '../../Axios/AxiosPublic';

const TrendingProducts = ({ products }) => {

    const { user } = useAuth();
    const navigate = useNavigate();
    const sortedByVotes = [...products].sort((a, b) => b.votes - a.votes)
    const [data, setData] = useState(sortedByVotes);

    const handleLike = async (productId) => {
        if (!user) return navigate('/login');

        try {
            const response = await axiosPublic.patch(`/products/${productId}/vote`, { userEmail: user.email }
            );
            setData(prev => {
                const updated = prev.map(p => p._id === productId ? { ...p, votes: response.data.votes } : p);
                return updated.sort((a, b) => b.votes - a.votes)
            }
            );
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h2 className='text-5xl text-center mt-20'>Trending Products</h2>

            <div>
                {
                    data.map((sorted, index) => <div key={index} className=''>
                        <div className="max-w-sm bg-amber-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            {/* Product Image */}
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                    src={sorted.productImage}
                                    alt={sorted.productName}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Card Body */}
                            <div className="p-4 flex flex-col gap-3">
                                {/* Product Name */}
                                <Link to={`/productDetails/${sorted._id}`}><h2 className="text-xl font-semibold text-white">{sorted.productName}</h2></Link>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {sorted.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Upvote Button */}
                                <button
                                    onClick={() => handleLike(sorted._id)}
                                    className="flex items-center gap-2 bg-blue-800 px-3 py-2 rounded-lg font-semibold hover:bg-green-400 hover:text-white transition-all"
                                >
                                    <FaThumbsUp />
                                    <span>{sorted.votes || 0}</span>
                                </button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default TrendingProducts;