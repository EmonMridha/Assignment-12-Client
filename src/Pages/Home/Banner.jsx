import React from 'react';

const Banner = () => {
    return (
        <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh]">
            {/* Background Image */}
            <img
                src="https://i.ibb.co.com/nqS9WwGK/innovation-561388.jpg"
                alt="Banner Background"
                className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-green bg-opacity-10 flex items-center justify-center">
                <div className="text-center text-amber-700 px-4">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Welcome to AppOrbit
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl mb-6">
                        Explore our amazing products and services to boost your business.
                    </p>
                    <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;