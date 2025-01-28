import { NavLink } from 'react-router-dom';
import React from 'react';
import UserDetails from './UserDetails';

const Header: React.FC = () => {
  return (
    <header className='fixed w-full bg-amber-200'>
      <div className='max-w-[920px] mx-auto pl-5 pr-5 pt-2 pb-2'>
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
    </header>
  );
};

export default Header;
