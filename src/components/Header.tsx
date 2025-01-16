import { signOut } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { auth } from '../firebase';

const Header = () => {
  const { user, loading } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
      console.log('Sign Out');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className='fixed w-full bg-amber-200'>
      <div className='max-w-[920px] mx-auto pl-5 pr-5 pt-2 pb-2'>
        <ul className='flex justify-center gap-x-3 text-lg'>
          <NavLink to='/' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
            Home
          </NavLink>
          <li>
            <NavLink to='/words' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
              Words
            </NavLink>
          </li>
          <li>
            <NavLink to='/user' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
              User
            </NavLink>
          </li>
        </ul>
        <button
          type='button'
          className='absolute top-2 right-2 hover:underline'
          onClick={handleSignOut}
        >
          {loading && 'loading'}
          {!loading && user && `${user?.displayName ? user?.displayName : user?.email} | Sign Out`}
        </button>
      </div>
    </header>
  );
};

export default Header;
