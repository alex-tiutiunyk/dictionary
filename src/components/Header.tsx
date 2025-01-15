import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [authUser, setAuthUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const auth = getAuth();

  React.useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) setAuthUser(user);
      else setAuthUser(null);
      console.log(user);
    });
    return () => {
      listen();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Sign Out');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className='fixed w-full bg-amber-200'>
      <div className='max-w-[920px] mx-auto pl-5 pr-5 pt-2 pb-2'>
        <ul className='flex justify-center gap-x-3 text-lg'>
          <li>
            <NavLink to='/signin' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
              SignIn
            </NavLink>
          </li>
          <li>
            <NavLink to='/signup' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
              SignUp
            </NavLink>
          </li>
          <NavLink to='/' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
            Home
          </NavLink>
          <li>
            <NavLink to='/words' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
              Words
            </NavLink>
          </li>
        </ul>
        <button
          type='button'
          className='absolute top-2 right-2 hover:underline'
          onClick={handleSignOut}
        >
          {loading ? 'loading' : `${authUser?.email} | Sign Out`}
          {/* {authUser ? `${authUser?.email} | Sign Out` : <button>Sign In</button>} */}
        </button>
      </div>
    </header>
  );
};

export default Header;
