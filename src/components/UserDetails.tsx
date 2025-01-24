import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { ChevronDown } from 'lucide-react';
import UserDropDown from './UserDropDown';

const UserDetails: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const user = useAppSelector((state) => state.user.value);

  const handleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='absolute top-2 right-[20px]'>
      <span onClick={handleDropDown} className='cursor-pointer flex align-middle gap-1'>
        {`${user?.displayName ? user?.displayName : user?.email}`}
        <ChevronDown
          size={16}
          className={`mt-[5px] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </span>
      {isOpen && <UserDropDown isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default UserDetails;
