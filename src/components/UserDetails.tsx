import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAppSelector } from '../redux/hooks';

const UserDetails: React.FC = () => {
  const user = useAppSelector((state) => state.user.value);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/dictionary/signin');
      console.log('Sign Out');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='absolute top-2 right-[20px]'>
      <button type='button' onClick={handleSignOut}>
        {`${user?.displayName ? user?.displayName : user?.email}`}
      </button>
    </div>
  );
};

export default UserDetails;
