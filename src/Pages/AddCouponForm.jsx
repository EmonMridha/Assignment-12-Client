import React, { useState } from "react";
import axiosPublic from "../Axios/AxiosPublic";
import Swal from "sweetalert2";

const AddCouponForm = () => {
    const [formData, setFormData] = useState({
        code: "",
        expiry: "",
        description: "",
        discount: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosPublic.post("/coupons", formData)
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire("Coupon Added Successfully!");
                    setFormData({
                        code: "",
                        expiry: "",
                        description: "",
                        discount: ""
                    });
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-black shadow-lg rounded-lg mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Coupon</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Coupon Code */}
                <div>
                    <label className="block mb-1 font-medium">Coupon Code</label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                        placeholder="SUMMER2025"
                    />
                </div>

                {/* Expiry Date */}
                <div>
                    <label className="block mb-1 font-medium">Expiry Date</label>
                    <input
                        type="date"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                        placeholder="Short description of the coupon..."
                    ></textarea>
                </div>

                {/* Discount Amount */}
                <div>
                    <label className="block mb-1 font-medium">Discount Amount (%)</label>
                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                        placeholder="10"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
                >
                    Add Coupon
                </button>
            </form>
        </div>
    );
};

export default AddCouponForm;
