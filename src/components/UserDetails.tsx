import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAppSelector } from '../redux/hooks';

const UserDetails: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const user = useAppSelector((state) => state.user.value);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/dictionary/signin');
      console.log('Sign Out');
      setIsOpen((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUser = () => {
    navigate('/dictionary/user');
    setIsOpen((prev) => !prev);
  };

  const handleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='absolute top-2 right-[20px]'>
      <span onClick={handleDropDown} className='cursor-pointer'>{`${
        user?.displayName ? user?.displayName : user?.email
      }`}</span>
      {isOpen && (
        <div className='absolute top-full right-[-5px] border bg-white shadow-md py-2 min-w-[120px] rounded-lg'>
          <ul>
            <li></li>
            <li onClick={handleUser} className='cursor-pointer hover:bg-slate-100 px-2'>
              Settings
            </li>
            <li onClick={handleSignOut} className='cursor-pointer hover:bg-slate-100 px-2'>
              Log Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
