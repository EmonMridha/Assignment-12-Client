import React, { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import axiosPublic from '../../Axios/AxiosPublic';

const FeaturedCard = ({ product }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Initialize state based on props
    const initialUpvoted = user ? product.votedUsers?.includes(user.email) : false;
    const [upvoted, setUpvoted] = useState(initialUpvoted);
    const [votes, setVotes] = useState(product.votes || 0);

    // Handle user clicking the like button
    const handleUpvote = async () => {
        if (!user) return navigate('/login'); // redirect if not logged in
        if (upvoted) return; // safety check

        try {
            const response = await axiosPublic.patch(
                `/products/${product._id}/vote`,
                { userEmail: user.email }
            );

            setVotes(response.data.votes); // update votes from backend
            setUpvoted(true); // prevent multiple votes
        } catch (error) {
            console.error(error);
            if (error.response?.data?.message === "User already voted") {
                setUpvoted(true);
                alert("You have already voted for this product!");
            }
        }
    };

    return (
        <div className=''>
            <div className="max-w-sm bg-amber-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                {/* Product Image */}
                <div className="h-48 w-full overflow-hidden">
                    <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-70 h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col gap-3">
                    {/* Product Name */}
                    <Link to={`/productDetails/${product._id}`}><h2 className="text-xl font-semibold text-white">{product.productName}</h2></Link>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
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
                        onClick={handleUpvote}
                        disabled={upvoted || user?.email === product.ownerEmail}
                        className={`flex items-center gap-2 mt-2 font-medium px-4 py-2 rounded-lg transition-colors duration-300
                            ${upvoted
                                ? 'bg-green-500 text-white opacity-60 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-800 hover:bg-green-400 hover:text-white'
                            }`}
                    >
                        <FaThumbsUp />
                        {votes}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCard;
