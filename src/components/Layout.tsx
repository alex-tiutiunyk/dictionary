import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div>
      <Header />
      <main className='pt-[44px]'>
        <div className='max-w-[920px] mx-auto pl-5 pr-5 pt-2 pb-2'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
