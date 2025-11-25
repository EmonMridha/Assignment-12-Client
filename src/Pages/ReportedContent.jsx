import React, { useEffect, useState } from 'react';
import axiosPublic from '../Axios/AxiosPublic';

const ReportedContent = () => {
    const [reportedData, setreportedData] = useState([]);

    useEffect(() => {
        axiosPublic.get('/products/reported').then(res => {
            setreportedData(res.data)
        })
    }, [])

    return (
        <div>
            <h2 className='text-center text-4xl mt-30 mb-10 font-semibold'>Reported Contents</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>View Details</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        reportedData.map((product, index) => <tr key={index}>
                            <td>{product.productName}</td>
                            <td><Link to={`/productDetails/${product._id}`} className='btn'>View Details</Link></td>
                            <td>{product.status ? 'Accepted' : "Pending"}</td>
                            <td> <button>Delete</button>
                            </td>
                            <td></td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ReportedContent;