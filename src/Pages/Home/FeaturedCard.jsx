import React, { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import axiosPublic from '../../Axios/AxiosPublic';

const FeaturedCard = ({ product }) => {
    const [votes, setVotes] = useState(product.votes || 0);
    // Number of votes
    const [upvoted, setUpvoted] = useState(false); // whether the current user has already liked or not. Initially not
    const { user } = useAuth();
    const navigate = useNavigate();

    // This function runs when user clicks like button
    const handleUpvote = async () => {

        if (!user) {
            navigate('/login')
        }

        try {
            const increment = upvoted ? -1 : 1;

            const response = await axiosPublic.patch(`/products/${product._id}/vote`, { increment });
            setVotes(response.data.votes);
            setUpvoted(!upvoted);
        }
        catch (error) {
            console.log(error);
        }
    }
    console.log(product);
    return (
        <div className=''>
            <div className="max-w-sm bg-amber-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                {/* Product Image */}
                <div className="h-48 w-full overflow-hidden">
                    <img
                        src={product.productImage}
                        alt="Product"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col gap-3">
                    {/* Product Name */}
                    <h2 className="text-xl font-semibold text-white">{product.productName}</h2>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {
                            product.tags.map(tag => <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                                {tag}
                            </span>
                            )
                        }
                    </div>
                    <button
                        onClick={handleUpvote}
                        className={`flex items-center gap-2 mt-2 font-medium px-4 py-2 rounded-lg transition-colors duration-300 ${upvoted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-green-400 hover:text-white'
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