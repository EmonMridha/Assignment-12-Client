import React, { useEffect, useState } from 'react';
import axiosPublic from '../Axios/AxiosPublic';

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axiosPublic.get('/users').then(res => {
            setUsers(res.data)
        })
    }, [])
    return (
        <div className='flex justify-center'>
            <div>
                <h2 className='mt-30 text-4xl font-semibold'>Manage Users</h2>
                {
                    users.map(user => <table key={user._id} border="1" cellpadding="8" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Emon</td>
                                <td>emon@gmail.com</td>
                                <td>Logged In</td>
                            </tr>
                            <tr>
                                <td>Sarah</td>
                                <td>sarah@example.com</td>
                                <td>Logged Out</td>
                            </tr>
                            <tr>
                                <td>Alex</td>
                                <td>alex@domain.com</td>
                                <td>Viewing Dashboard</td>
                            </tr>
                        </tbody>
                    </table>
                    )
                }
            </div>
        </div>
    );
};

export default ManageUsers;