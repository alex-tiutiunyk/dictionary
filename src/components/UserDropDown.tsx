import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../hooks/useClickOutside';

interface UserDropDown {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const UserDropDown = ({ isOpen, setIsOpen }: UserDropDown) => {
  const navigate = useNavigate();
  const dropRef = React.useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/dictionary/signin');
      console.log('Sign Out');
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUser = () => {
    navigate('/dictionary/user');
    setIsOpen(false);
  };

  // Hide drop on click outside
  useClickOutside(dropRef, () => setIsOpen(false));

  return (
    <div
      ref={dropRef}
      className={`
          absolute top-[35px] right-[-5px] border bg-white shadow-md py-2 min-w-[120px] rounded-lg transition-opacity
          before:content-[''] before:absolute before:top-[-5px] before:right-[20px] before:h-[20px] before:w-[20px] before:bg-white before:rotate-45
          ${isOpen ? 'translate-y-0 backdrop-opacity-100' : 'translate-y-[-99999px] opacity-0'}`}
    >
      <ul className='relative'>
        <li onClick={handleUser} className='cursor-pointer hover:bg-slate-100 px-2'>
          My Profile
        </li>
        <li onClick={handleSignOut} className='cursor-pointer hover:bg-slate-100 px-2'>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default UserDropDown;
