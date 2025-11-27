import React, { useEffect, useState } from 'react';
import axiosPublic from '../Axios/AxiosPublic';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ProductStatusChart = () => {
    const [accepted, setAccepted] = useState(0);
    const [pending, setPending] = useState(0);


    useEffect(() => {
        axiosPublic.get('/products')
            .then(res => {
                const all = res.data;
                const acceptedCount = all.filter(p => p.status === 'accepted').length;
                const pendingCount = all.filter(p => p.status === 'pending').length;

                setAccepted(acceptedCount);
                setPending(pendingCount);
            })
    }, []);

    const data = [
        { name: 'Accepted', value: accepted },
        { name: 'Pending', value: pending },

    ];

    const COLORS = ['#4ade80', '#facc15']; // green + yellow

    return (
        <div className="flex justify-center mt-10">
            <PieChart width={350} height={350}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    nameKey="name"
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default ProductStatusChart;
