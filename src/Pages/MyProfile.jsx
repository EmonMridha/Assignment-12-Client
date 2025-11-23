import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';

const MyProfile = () => {
    const { user } = useAuth();

    console.log(user);
    return (
        <div className='p-10'>
            <h2 className='mt-20 font-semibold text-4xl mb-10' >Your Profile</h2>
            <div className='flex gap-10'>
                <img className='h-100' src={user?.photoURL} alt="" />

                <div className='flex flex-col gap-5'>
                    <p className='text-2xl font-semibold'> {user?.displayName}</p>
                    <p className='font-semibold text-xl'>Email: <span className='text-xl font-light'>{user?.email}</span></p>
                    {/* Show subscribe button only if not subscribed */}
                    <Link to='/payment'>
                        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow-md hover:bg-purple-700 transition-all duration-300">
                            50$ / month
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;