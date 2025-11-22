import React from "react";
import { Link } from "react-router";

const ExtraSec1 = () => {
    // Dummy blog data — replace with your API later
    const blogs = [
        {
            id: 1,
            title: "5 Tips to Boost Your Product Engagement",
            image: "https://picsum.photos/400/250?random=1",
            description: "Learn how to optimize your product visibility and increase user votes with simple strategies.",
        },
        {
            id: 2,
            title: "Why User Reviews Matter for Your Product",
            image: "https://picsum.photos/400/250?random=2",
            description: "Discover how customer feedback can increase credibility and help your product rank better.",
        },
        {
            id: 3,
            title: "Trending Tech Products in 2025",
            image: "https://picsum.photos/400/250?random=3",
            description: "Stay updated with the hottest gadgets dominating the tech space this year.",
        },
    ];

    return (
        <div className="mt-20 px-5">
            <h2 className="text-4xl font-bold text-center mb-10">Latest Blogs</h2>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 max-w-7xl mx-auto">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                    >
                        {/* Image */}
                        <div className="h-48 w-full overflow-hidden">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Text */}
                        <div className="p-5 flex flex-col gap-3">
                            <h3 className="text-xl text-black font-semibold">{blog.title}</h3>
                            <p className="text-gray-600 text-sm">{blog.description}</p>

                           
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExtraSec1;
