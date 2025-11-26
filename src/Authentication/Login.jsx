import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {

    const { signIn, googleSignIn } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation(); // storing the path where the user wanted to go
    const navigate = useNavigate(); // Emny
    const from = location.state?.from?.pathname || '/';

    const Submit = data => {
        signIn(data.email, data.password)
            .then(res => {
                if (res.user) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Logged in successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(from, { replace: true });
                }
            })
            .catch(errors => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "User not found!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            });
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged in successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate(from, { replace: true });
            })
            .catch(err => Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User not found!",
                footer: '<a href="#">Why do I have this issue?</a>'
            }));
    }
    return (
        <div className="max-w-md mx-auto p-6 bg-base-200 rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit(Submit)} className="space-y-4">

                <div>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register('email', { required: 'Email Address is required' })} placeholder="Your Email" className="input input-bordered w-full" />
                    {errors.email && <p className='text-red-600'>Email is required</p>}
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register('password', { required: 'password is required' })} placeholder="Password" className="input input-bordered w-full" />
                    {errors.password && <p className='text-red-600'>Password is required</p>}
                </div>
                <p>Don't have an account? <Link className='link text-blue-600' to='/register'>Register</Link></p>
                <button className="btn btn-primary w-full mt-4">Login</button>
                {/* Google */}

            </form>
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        </div>
    );
};

export default Login;