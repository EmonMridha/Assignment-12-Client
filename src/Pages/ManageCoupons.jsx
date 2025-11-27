import React, { useEffect, useState } from 'react';
import AddCouponForm from './AddCouponForm';
import axiosPublic from '../Axios/AxiosPublic';
import CouponTable from './CouponTable';

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([])

    useEffect(()=>{
        axiosPublic.get('/coupons').then(res=>{
            setCoupons(res.data)
        })
    },[])

    console.log(coupons);
    return (
        <div>
            <h2 className='mt-30 text-4xl font-semibold text-center'>Manage coupons</h2>
            <AddCouponForm></AddCouponForm>
            <CouponTable coupons={coupons}></CouponTable>
        </div>
    );
};

export default ManageCoupons;