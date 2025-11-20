import React from 'react';
import { useLoaderData } from 'react-router';

const Update = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div>
           <h2>{data.productName}</h2>
        </div>
    );
};

export default Update;