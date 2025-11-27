import React, { useState } from "react";
import axiosPublic from "../Axios/AxiosPublic";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";

const CouponEdit = () => {
    const prevData = useLoaderData()
  const [formData, setFormData] = useState({
    code: "",
    expiry: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to backend
    axiosPublic.patch(formData) // or PATCH if updating existing coupon
      .then(() => {
        Swal.fire("Coupon submitted successfully!");
        // reset form
        setFormData({ code: "", expiry: "", description: "" });
      })
      .catch(err => {
        console.error(err);
        Swal.fire("Error sending data!", "", "error");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Coupon</h2>

        {/* Coupon Code */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Coupon Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Enter coupon code"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Expiry Date */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Expiry Date</label>
          <input
            type="date"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter description"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CouponEdit;
