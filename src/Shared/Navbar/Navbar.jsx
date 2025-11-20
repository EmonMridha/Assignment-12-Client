import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user, logOut } = useAuth();
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrolly, setLastScrolly] = useState(0);
    const handleLogout = () => {
        logOut()
            .then((res) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged Out successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Could not logout!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            })
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrolly) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrolly(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrolly])
    return (
        <div
            className={`navbar bg-base-100 shadow-md px-4 fixed w-full top-0 z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className="flex-1">
                <a className="text-xl font-bold">AppOrbit </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 gap-4">
                    <li>
                        <a className="font-medium">Home</a>
                    </li>
                    <li>
                        <a className="font-medium">Products</a>
                    </li>
                    {
                        user ? (<div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL} alt="User" />
                                </div>
                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[20] p-2 shadow bg-base-100 rounded-box w-40"
                            >
                                <div>
                                    <p className='text-green-500 mb-5'>{user.displayName}</p>
                                </div>
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>) : (<div className='flex items-center'>
                            <li>
                                <Link to='/login'><button className='btn btn-primary'>Login</button></Link>
                            </li>
                            <li>
                                <Link to='/register'><button className='btn border-t-zinc-500 btn-primary'>Register</button></Link>
                            </li>
                        </div>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;