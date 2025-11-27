import React, { useEffect, useState } from 'react';
import axiosPublic from '../Axios/AxiosPublic';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axiosPublic.get('/users').then(res => {
            setUsers(res.data)
        })
    }, [])

    const handleMakeModerator = (id) => {
        axiosPublic.patch(`/users/makeModerator/${id}`).then(res => {
            Swal.fire('Made Moderator')
        })
    }

    const handleMakeAdmin = (id) => {
        axiosPublic.patch(`/users/makeAdmin/${id}`).then(res => {
            Swal.fire('Made Admin')
        })
    }
    return (
        <div className='flex justify-center'>
            <div>
                <h2 className='mt-30 text-4xl font-semibold'>Manage Users</h2>
                {
                    users.map(user => <table
                        key={user._id}
                        className="border-collapse border border-gray-400 my-4"
                    >
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3  text-black border">Name</th>
                                <th className="px-6 py-3 text-black border">Email</th>
                                <th className="px-6 py-3 text-black border">Activity</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="px-6 py-3 border">Emon</td>
                                <td className="px-6 py-3 border">emon@gmail.com</td>
                                <td className="px-6 py-3 border"><button onClick={() => handleMakeModerator(user._id)} className='btn'>Make Moderator</button> <button onClick={() => handleMakeAdmin(user._id)} className='btn'>Make Admin</button></td>
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