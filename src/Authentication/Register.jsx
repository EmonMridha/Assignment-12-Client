import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import axiosPublic from '../Axios/AxiosPublic';

const Register = () => {
    const { createUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation(); // storing the path where the user wanted to go
    const navigate = useNavigate(); // Emny
    const from = location.state?.from?.pathname || '/';

    const Fun = data => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;

                updateProfile(user, {
                    displayName: data.name,
                    photoURL: data.photo
                }).then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                        photoURL: data.photo,

                    };
                    axiosPublic.post('/users', userInfo)
                        .then(() => {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Registered in successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate(from, { replace: true });
                        })
                })

            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Could not register!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            });
    }
    return (
        <div className="max-w-md mx-auto p-6 bg-base-200 rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <form onSubmit={handleSubmit(Fun)} className="space-y-4">
                <div>
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register('name', { required: 'Name is required' })} placeholder="Your Name" className="input input-bordered w-full" />
                    {errors.name && <p className='text-red-600'>Name is required</p>}
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register('email', { required: 'Email is required' })} placeholder="Your Email" className="input input-bordered w-full" />
                    {errors.email && <p className='text-red-600'>Email is required</p>}
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register('password', { required: 'Password is required' })} placeholder="Password" className="input input-bordered w-full" />
                    {errors.password && <p className='text-red-600'>Password is required</p>}
                </div>


                <div>
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="url" {...register('photo', { required: 'Photo is required' })} placeholder="Photo URL" className="input input-bordered w-full" />
                    {errors.photo && <p className='text-red-600'>Photo URL is required</p>}
                </div>
                <p>Already have an account? <Link className='link text-blue-600' to='/login'>Login</Link></p>
                <button className="btn btn-primary w-full mt-4">Register</button>
            </form>
        </div>
    );
};

export default Register;