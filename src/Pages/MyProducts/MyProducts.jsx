import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import axiosPublic from '../../Axios/AxiosPublic';
import Swal from 'sweetalert2';

const MyProducts = () => {
    const [status, setStatus] = useState('Pending')
    const loadedProducts = useLoaderData();
    const [myProducts, setMyProducts] = useState(loadedProducts)

    const handleDelete = async (id) => {

        try {
            const res = await axiosPublic.delete(`/products/${id}`); // Requesting server to delete and saving the response here
            if (res.data.deletedCount) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Deleted Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });

                const remaining = myProducts.filter(item => item._id !== id);
                setMyProducts(remaining)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }
    return (
        <div className='p-20'>
            <h2 className='text-5xl mb-10'>My Products</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Number of Votes</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        myProducts.map((product, index) => <tr key={index}>
                            <td>{product.productName}</td>
                            <td>45</td>
                            <td>{status}</td>
                            <td><Link to={`/update/${product._id}`}> <button className='btn btn-primary'>Update</button></Link> <button onClick={() => handleDelete(product._id)} className='btn  bg-red-600'>Delete</button></td>
                            <td></td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;