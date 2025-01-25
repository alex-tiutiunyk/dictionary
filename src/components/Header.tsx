import { NavLink } from 'react-router-dom';
import { SquareMinus, SquarePlus } from 'lucide-react';
import React from 'react';
import { Modal } from '../ui-kit/Modal';
import NewWord from './NewWord';
import UserDetails from './UserDetails';

const Header: React.FC = () => {
  const [isModal, setIsModal] = React.useState<boolean>(false);

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
          <NavLink to='/dictionary' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
            Home
          </NavLink>
          <li>
            <NavLink
              to='/dictionary/words'
              style={({ isActive }) => (isActive ? { color: 'red' } : {})}
            >
              Words
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/dictionary/categories'
              style={({ isActive }) => (isActive ? { color: 'red' } : {})}
            >
              Categories
            </NavLink>
          </li>
        </ul>

        <UserDetails />
      </div>
      {isModal && (
        <Modal closeModal={handlePopup}>
          <NewWord closeModal={handlePopup} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
