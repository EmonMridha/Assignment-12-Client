import React, { useEffect, useState } from "react";
import axiosPublic from "../Axios/AxiosPublic";
import Swal from "sweetalert2";
import { Link } from "react-router";

const CouponTable = () => {
    const [coupons, setCoupons] = useState([]);

    // Fetch coupons from the server
    const fetchCoupons = () => {
        axiosPublic.get("/coupons")
            .then(res => setCoupons(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    // Delete coupon
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This coupon will be deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/coupons/delete/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'Coupon has been deleted.', 'success');
                        fetchCoupons(); // Refresh table
                    })
                    .catch(err => console.error(err));
            }
        })
    };

    return (
        <div className="overflow-x-auto mt-8">
            <table className="min-w-full bg-black border border-gray-300">
                <thead className="bg-gray-9">
                    <tr>
                        <th className="px-6 py-3 border text-left">Coupon Code</th>
                        <th className="px-6 py-3 border text-left">Expiry Date</th>
                        <th className="px-6 py-3 border text-left">Discount</th>
                        <th className="px-6 py-3 border text-left">Description</th>
                        <th className="px-6 py-3 border text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map((coupon) => (
                        <tr key={coupon._id} className="hover:bg-gray-50">
                            <td className="px-6 py-3 border">{coupon.code}</td>
                            <td className="px-6 py-3 border">{new Date(coupon.expiry).toLocaleDateString()}</td>
                            <td className="px-6 py-3 border">{coupon.discount}%</td>
                            <td className="px-6 py-3 border">{coupon.description}</td>
                            <td className="px-6 py-3 border space-x-2">
                                <Link to={`/couponEdit/${coupon._id}`}> <button
                                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                                >
                                    Edit
                                </button></Link>
                                <button
                                    onClick={() => handleDelete(coupon._id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {coupons.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">
                                No coupons found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CouponTable;
