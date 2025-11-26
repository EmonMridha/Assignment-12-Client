import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaBars, FaTimes } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user, logOut } = useAuth();
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrolly, setLastScrolly] = useState(0);
    const [openSidebar, setOpenSidebar] = useState(false)
    const [open, setOpen] = useState(false)
    const [openAdminSidebar, setOpenAdminsSidebar] = useState(false)

    const toggleDrpodown = () => {
        setOpen(!open)
    }

    const handleLogout = () => {
        logOut()
            .then(() => {
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
                    text: "Could not logout!"
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
        <>
            {/* NAVBAR */}
            <div
                className={`navbar bg-base-100 shadow-md px-4 fixed w-full top-0 z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <div className="flex-1">
                    <Link to='/' className="text-xl font-bold">AppOrbit </Link>
                </div>

                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/allProducts'>Products</Link></li>

                        {/* DASHBOARD BUTTON */}

                        {
                            user?.email === 'emonmridha712@gmail.com' ? (
                                <div className="relative">
                                    <button
                                        onClick={toggleDrpodown}
                                        className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-md font-semibold"
                                    >
                                        <FaBars /> Moderator Dashboard
                                    </button>

                                    {/* Dropdown */}
                                    {open && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                                            <Link to='/reviewQueue'>
                                                <button
                                                    className="block text-black w-full text-left px-4 py-2 hover:bg-blue-100"
                                                >
                                                    Review Queue
                                                </button></Link>
                                            <Link to='/reportedContent'>
                                                <button
                                                    className="block w-full text-black text-left px-4 py-2 hover:bg-blue-100"
                                                >
                                                    Reported Contents
                                                </button></Link>
                                        </div>
                                    )}
                                </div>
                            ) : (<li>
                                <button
                                    className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-md font-semibold"
                                    onClick={() => setOpenSidebar(true)}
                                >
                                    <FaBars /> Dashboard
                                </button>
                            </li>)
                        }

                        {
                            user?.email === 'admin@gmail.com' && (
                                <li>
                                    <button
                                        className="flex items-center gap-2 bg-amber-800 text-white px-4 py-2 rounded-md font-semibold"
                                        onClick={() => setOpenAdminsSidebar(true)}
                                    >
                                        <FaBars /> Admin Dashboard
                                    </button>
                                </li>
                            )
                        }



                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL} alt="User" />
                                    </div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[20] p-2 shadow bg-base-100 rounded-box w-40"
                                >
                                    <div><p className='text-green-500 mb-5'>{user.displayName}</p></div>
                                    <li><Link to="/dashboard"> Dashboard</Link></li>
                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <div className='flex items-center'>
                                <li><Link to='/login'><button className='btn btn-primary'>Login</button></Link></li>
                                <li><Link to='/register'><button className='btn btn-primary'>Register</button></Link></li>
                            </div>
                        )}
                    </ul>
                </div>
            </div>

            {/* SIDEBAR OVERLAY */}
            {openSidebar && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={() => setOpenSidebar(false)}
                ></div>
            )}

            {/* SIDEBAR */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${openSidebar ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl text-black font-bold">User Dashboard</h3>
                    <button onClick={() => setOpenSidebar(false)}>
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                <div className="flex flex-col p-4 space-y-3">
                    <Link to="/myProfile" onClick={() => setOpenSidebar(false)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        My Profile
                    </Link>

                    <Link onClick={() => setOpenSidebar(false)} to={`/myProducts/${user?.email}`} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        My Products
                    </Link>

                    <Link onClick={() => setOpenSidebar(false)} to="/addProduct" className="px-4 py-2 bg-green-600 text-white rounded-md">
                        Add Product
                    </Link>
                </div>
            </div>
            {/* ADMIN SIDEBAR OVERLAY */}
            {openAdminSidebar && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={() => setOpenAdminsSidebar(false)}
                ></div>
            )}

            {/* ADMIN SIDEBAR */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${openAdminSidebar ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl text-black font-bold">Admin Dashboard</h3>
                    <button onClick={() => setOpenAdminsSidebar(false)}>
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                <div className="flex flex-col p-4 space-y-3">

                    <Link
                        to="/staticsPage"
                        onClick={() => setOpenAdminsSidebar(false)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Statistics Page
                    </Link>

                    <Link
                        to="/manageUsers"
                        onClick={() => setOpenAdminsSidebar(false)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                       Manage Users
                    </Link>

                    <Link
                        to="/manageCoupons"
                        onClick={() => setOpenAdminsSidebar(false)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Manage Coupons
                    </Link>

                </div>
            </div>

        </>
    );
};

export default Navbar;
