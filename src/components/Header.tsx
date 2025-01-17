import { signOut } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { auth } from '../firebase';
import { SquareMinus, SquarePlus } from 'lucide-react';
import React from 'react';
import { Modal } from '../ui-kit/Modal';
import AddWord from './AddWord';

const Header: React.FC = () => {
  const { user, loading } = useAuth();
  const [isModal, setIsModal] = React.useState<boolean>(false);

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

  const handlePopup = () => {
    setIsModal((prev) => !prev);
  };

  return (
    <header className='fixed w-full bg-amber-200'>
      <div className='max-w-[920px] mx-auto pl-5 pr-5 pt-2 pb-2'>
        <button
          title='Add new word'
          className='absolute top-[6px] left-[17px]'
          onClick={handlePopup}
        >
          {isModal ? <SquareMinus size={30} /> : <SquarePlus size={30} />}
        </button>

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
      {isModal && (
        <Modal setIsModal={setIsModal}>
          <AddWord />
        </Modal>
      )}
    </header>
  );
};

export default Header;
