import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-md px-4">
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
                    <li> 
                        <Link to='/login'><button className='btn btn-primary'>Login</button></Link>
                    </li>
                    <li>
                        <Link to='/register'><button className='btn border-t-zinc-500 btn-primary'>Register</button></Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;